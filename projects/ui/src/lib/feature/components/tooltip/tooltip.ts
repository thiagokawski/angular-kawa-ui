import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  Directive,
  ViewEncapsulation,
  ElementRef,
  booleanAttribute,
  effect,
  inject,
  input,
} from '@angular/core';
import { DOCUMENT } from '@angular/common';

import { injectKwStyles } from '../../../core/styles/inject-styles';
import { KwTooltipPosition } from './types/tooltip.types';

/** Distância, em pixels, entre o host e o tooltip. */
const GAP = 8;

/** Margem mínima, em pixels, entre o tooltip e as bordas da viewport. */
const EDGE = 8;

let nextTooltipId = 0;

/**
 * Portador do CSS do `KwTooltip`: diretivas não carregam estilos, então este componente sem
 * template é criado uma vez por aplicação só para registrar o `tooltip.css`.
 */
@Component({
  selector: 'kw-tooltip-styles',
  template: '',
  styleUrl: './tooltip.css',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class KwTooltipStyles {}

/**
 * Mostra um rótulo curto ao lado do host em hover e foco.
 *
 * O balão é um elemento `popover="manual"` anexado ao `body` e posicionado com
 * `getBoundingClientRect`. Ele é removido quando a diretiva é destruída.
 */
@Directive({
  selector: '[kwTooltip]',
})
export class KwTooltip {
  /** Texto do tooltip. Vazio desabilita a exibição. */
  readonly kwTooltip = input<string>('');

  /** Lado do host em que o tooltip aparece. */
  readonly kwTooltipPosition = input<KwTooltipPosition>('top');

  /** Impede a exibição enquanto `true`. */
  readonly kwTooltipDisabled = input(false, { transform: booleanAttribute });

  /** Atraso, em milissegundos, antes de mostrar em hover. O foco mostra na hora. */
  readonly kwTooltipDelay = input<number>(300);

  private readonly document = inject(DOCUMENT);
  private readonly host: HTMLElement = inject(ElementRef).nativeElement;
  private readonly tooltip: HTMLElement = this.document.createElement('div');
  private readonly id = `kw-tooltip-${++nextTooltipId}`;
  private timer: ReturnType<typeof setTimeout> | undefined;

  constructor() {
    injectKwStyles(KwTooltipStyles);
    this.tooltip.id = this.id;
    this.tooltip.setAttribute('popover', 'manual');
    this.tooltip.setAttribute('role', 'tooltip');
    this.document.body.append(this.tooltip);

    const view = this.document.defaultView;
    const cleanups: Array<() => void> = [];

    const listen = (
      target: EventTarget | null | undefined,
      type: string,
      handler: (event: Event) => void,
      options?: AddEventListenerOptions,
    ) => {
      if (!target) return;
      target.addEventListener(type, handler, options);
      cleanups.push(() => target.removeEventListener(type, handler, options));
    };

    listen(this.host, 'mouseenter', () => this.scheduleShow());
    listen(this.host, 'mouseleave', () => this.hide());
    listen(this.host, 'focusin', () => this.show());
    listen(this.host, 'focusout', () => this.hide());
    listen(this.document, 'keydown', (event) => {
      if ((event as KeyboardEvent).key === 'Escape') this.hide();
    });
    listen(view, 'scroll', () => this.hide(), { capture: true, passive: true });
    listen(view, 'resize', () => this.hide(), { passive: true });

    effect(() => this.sync());

    inject(DestroyRef).onDestroy(() => {
      clearTimeout(this.timer);
      cleanups.forEach((cleanup) => cleanup());
      this.linkDescription(null);
      this.tooltip.remove();
    });
  }

  private scheduleShow(): void {
    clearTimeout(this.timer);
    this.timer = setTimeout(() => this.show(), this.kwTooltipDelay());
  }

  private show(): void {
    clearTimeout(this.timer);
    this.timer = undefined;

    const text = this.kwTooltip().trim();
    if (this.kwTooltipDisabled() || text === '' || this.isOpen()) return;

    this.sync();
    this.tooltip.showPopover();
    this.place();
  }

  private hide(): void {
    clearTimeout(this.timer);
    this.timer = undefined;

    if (this.isOpen()) this.tooltip.hidePopover();
  }

  /** Mantém texto, classe de posição e `aria-describedby` alinhados aos inputs. */
  private sync(): void {
    const text = this.kwTooltip().trim();
    const enabled = !this.kwTooltipDisabled() && text !== '';

    this.tooltip.textContent = text;
    this.tooltip.className = `kw-tooltip kw-tooltip--${this.kwTooltipPosition()}`;
    this.linkDescription(enabled ? text : null);

    if (!enabled) {
      this.hide();
    } else if (this.isOpen()) {
      this.place();
    }
  }

  /**
   * Liga o host ao tooltip por `aria-describedby`, sem duplicar a leitura quando o host já tem
   * `aria-label` igual ao texto.
   */
  private linkDescription(text: string | null): void {
    const current = (this.host.getAttribute('aria-describedby') ?? '')
      .split(/\s+/)
      .filter((id) => id !== '' && id !== this.id);
    const shouldLink = text !== null && this.host.getAttribute('aria-label') !== text;
    const ids = shouldLink ? [...current, this.id] : current;

    if (ids.length > 0) {
      this.host.setAttribute('aria-describedby', ids.join(' '));
    } else {
      this.host.removeAttribute('aria-describedby');
    }
  }

  /** Posiciona o balão ao lado do host, centralizado no eixo cruzado e dentro da viewport. */
  private place(): void {
    const anchor = this.host.getBoundingClientRect();
    const width = this.tooltip.offsetWidth;
    const height = this.tooltip.offsetHeight;
    const centerX = anchor.left + anchor.width / 2;
    const centerY = anchor.top + anchor.height / 2;

    let top: number;
    let left: number;

    switch (this.kwTooltipPosition()) {
      case 'top':
        top = anchor.top - height - GAP;
        left = centerX - width / 2;
        break;
      case 'bottom':
        top = anchor.bottom + GAP;
        left = centerX - width / 2;
        break;
      case 'left':
        top = centerY - height / 2;
        left = anchor.left - width - GAP;
        break;
      case 'right':
        top = centerY - height / 2;
        left = anchor.right + GAP;
        break;
    }

    const viewportWidth = this.document.documentElement.clientWidth;
    const viewportHeight = this.document.documentElement.clientHeight;

    this.tooltip.style.top = `${clamp(top, EDGE, viewportHeight - height - EDGE)}px`;
    this.tooltip.style.left = `${clamp(left, EDGE, viewportWidth - width - EDGE)}px`;
  }

  private isOpen(): boolean {
    return this.tooltip.matches(':popover-open');
  }
}

function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}
