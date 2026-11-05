import {
  Directive,
  DOCUMENT,
  ElementRef,
  OnDestroy,
  OnInit,
  inject,
  input,
  signal,
} from '@angular/core';

import { KwMenu } from './menu';
import { KwMenuPosition } from './types/menu.types';

/** Distância, em px, entre o gatilho e o menu. */
const GAP = 4;

/**
 * Gatilho de `kw-menu`: `button[kwMenuTriggerFor]`. Abre e fecha o painel, sincroniza
 * `aria-expanded`, devolve o foco ao gatilho ao fechar e posiciona o painel sob (ou sobre) o botão.
 * Os listeners ficam no painel e na janela e são removidos ao destruir.
 */
@Directive({
  selector: 'button[kwMenuTriggerFor]',
  host: {
    class: 'kw-menu-trigger',
    'aria-haspopup': 'menu',
    '[attr.aria-expanded]': 'expanded() ? "true" : "false"',
    '[attr.aria-controls]': 'kwMenuTriggerFor().panelId',
    '(click)': 'onClick()',
    '(pointerdown)': 'onPointerDown()',
    '(keydown)': 'onKeydown($event)',
  },
})
export class KwMenuTrigger implements OnInit, OnDestroy {
  /** Menu controlado por este gatilho. Precisa estar renderizado antes do gatilho inicializar. */
  readonly kwMenuTriggerFor = input.required<KwMenu>();
  readonly kwMenuPosition = input<KwMenuPosition>('bottom-end');

  protected readonly expanded = signal(false);

  private readonly host: HTMLElement = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;
  private readonly document = inject(DOCUMENT);
  private readonly view = this.document.defaultView;

  /** Marca que o painel estava aberto quando o ponteiro foi pressionado no gatilho. */
  private wasOpenOnPress = false;

  private readonly onToggle = (): void => {
    const isOpen = this.isOpen();
    this.expanded.set(isOpen);
    if (!isOpen) this.restoreFocus();
  };

  private readonly onPanelKeydown = (event: KeyboardEvent): void => {
    switch (event.key) {
      case 'ArrowDown':
        this.moveFocus(1);
        break;
      case 'ArrowUp':
        this.moveFocus(-1);
        break;
      case 'Home':
        this.focusItem(0);
        break;
      case 'End':
        this.focusItem(-1);
        break;
      case 'Tab':
        // Tab fecha o menu e segue a navegação a partir do gatilho.
        this.host.focus();
        this.close();
        return;
      default:
        return;
    }
    event.preventDefault();
  };

  private readonly reposition = (): void => {
    if (this.isOpen()) this.position();
  };

  private get panel(): HTMLElement {
    return this.kwMenuTriggerFor().panel().nativeElement;
  }

  ngOnInit(): void {
    this.panel.addEventListener('toggle', this.onToggle);
    this.panel.addEventListener('keydown', this.onPanelKeydown);
    this.view?.addEventListener('scroll', this.reposition, { capture: true, passive: true });
    this.view?.addEventListener('resize', this.reposition, { passive: true });
  }

  ngOnDestroy(): void {
    this.panel.removeEventListener('toggle', this.onToggle);
    this.panel.removeEventListener('keydown', this.onPanelKeydown);
    this.view?.removeEventListener('scroll', this.reposition, { capture: true });
    this.view?.removeEventListener('resize', this.reposition);
  }

  /**
   * Clique alterna. Se o ponteiro já tinha fechado o menu (clique fora do popover, que é o
   * gatilho do light dismiss), o clique não reabre.
   */
  protected onClick(): void {
    const wasOpen = this.wasOpenOnPress;
    this.wasOpenOnPress = false;

    if (wasOpen) {
      this.close();
      return;
    }

    if (this.isOpen()) this.close();
    else this.open(true);
  }

  protected onPointerDown(): void {
    this.wasOpenOnPress = this.isOpen();
  }

  protected onKeydown(event: KeyboardEvent): void {
    this.wasOpenOnPress = false;
    if (event.key !== 'ArrowDown') return;

    event.preventDefault();
    this.open(true);
  }

  private open(focusFirst: boolean): void {
    if (!this.isOpen()) {
      this.panel.showPopover();
      this.position();
    }

    if (focusFirst) this.focusItem(0);
  }

  private close(): void {
    if (this.isOpen()) this.panel.hidePopover();
  }

  private isOpen(): boolean {
    return this.panel.matches(':popover-open');
  }

  /** Foco volta ao gatilho quando estava no painel ou se perdeu (clique em área neutra). */
  private restoreFocus(): void {
    const active = this.document.activeElement;
    if (!active || active === this.document.body || this.panel.contains(active)) {
      this.host.focus();
    }
  }

  /** Posiciona abaixo do gatilho; abre para cima se não couber embaixo e couber em cima. */
  private position(): void {
    const anchor = this.host.getBoundingClientRect();
    const panel = this.panel;
    const { width, height } = panel.getBoundingClientRect();
    const viewportWidth = this.document.documentElement.clientWidth;
    const viewportHeight = this.document.documentElement.clientHeight;

    const below = anchor.bottom + GAP;
    const above = anchor.top - GAP - height;
    const top = below + height > viewportHeight && above >= 0 ? above : below;

    const aligned = this.kwMenuPosition() === 'bottom-start' ? anchor.left : anchor.right - width;
    const left = Math.max(GAP, Math.min(aligned, viewportWidth - width - GAP));

    panel.style.top = `${top}px`;
    panel.style.left = `${left}px`;
  }

  private moveFocus(step: 1 | -1): void {
    const items = this.items();
    if (!items.length) return;

    const current = items.indexOf(this.document.activeElement as HTMLElement);
    const next =
      current === -1
        ? step > 0
          ? 0
          : items.length - 1
        : (current + step + items.length) % items.length;
    items[next].focus();
  }

  /** Foca o item pelo índice; índice negativo conta a partir do fim. */
  private focusItem(index: number): void {
    const items = this.items();
    const target = index < 0 ? items.at(index) : items[index];
    target?.focus();
  }

  private items(): HTMLElement[] {
    return Array.from(this.panel.querySelectorAll<HTMLElement>('[kw-menu-item]'));
  }
}
