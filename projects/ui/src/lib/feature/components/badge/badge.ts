import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  Directive,
  ViewEncapsulation,
  ElementRef,
  Renderer2,
  computed,
  effect,
  inject,
  input,
} from '@angular/core';

import { injectKwStyles } from '../../../core/styles/inject-styles';
import { KwColor } from '../../../core/theme/types/kw-color';
import { KwBadgeValue } from './types/badge.types';

type KwBadgeKind = 'hidden' | 'dot' | 'count';

interface KwBadgeView {
  readonly kind: KwBadgeKind;
  readonly text: string;
}

const HIDDEN_VIEW: KwBadgeView = { kind: 'hidden', text: '' };

/**
 * Portador do CSS do `KwBadge`: diretivas não carregam estilos, então este componente sem template
 * é criado uma vez por aplicação só para registrar o `badge.css`.
 */
@Component({
  selector: 'kw-badge-styles',
  template: '',
  styleUrl: './badge.css',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class KwBadgeStyles {}

/**
 * Sobrepõe um ponto ou um contador ao canto superior direito do elemento host.
 *
 * O visual é um `span` `aria-hidden`. Com `kwBadgeLabel`, o texto vai para um `span` oculto
 * visualmente, que os leitores de tela anunciam.
 */
@Directive({
  selector: '[kwBadge]',
  host: {
    class: 'kw-badge-host',
  },
})
export class KwBadge {
  /** `true` mostra um ponto; número ou texto mostra um contador; `false`, `null` ou `0` oculta. */
  readonly kwBadge = input<KwBadgeValue>(null);

  /** Cor de intenção do badge. */
  readonly kwBadgeColor = input<KwColor>('danger');

  /** Maior valor exibido sem sufixo; acima dele aparece `99+` (ou o valor informado + `+`). */
  readonly kwBadgeMax = input<number>(99);

  /** Texto para leitor de tela, por exemplo "3 notificações não lidas". */
  readonly kwBadgeLabel = input<string>();

  private readonly renderer = inject(Renderer2);
  private readonly host: HTMLElement = inject(ElementRef).nativeElement;
  private readonly badge: HTMLElement = this.renderer.createElement('span');
  private readonly srLabel: HTMLElement = this.renderer.createElement('span');

  private readonly view = computed(() => resolveBadgeView(this.kwBadge(), this.kwBadgeMax()));

  constructor() {
    injectKwStyles(KwBadgeStyles);
    this.renderer.setAttribute(this.badge, 'aria-hidden', 'true');
    this.renderer.addClass(this.srLabel, 'kw-badge__sr-only');
    this.renderer.appendChild(this.host, this.badge);
    this.renderer.appendChild(this.host, this.srLabel);

    inject(DestroyRef).onDestroy(() => {
      this.renderer.removeChild(this.host, this.badge);
      this.renderer.removeChild(this.host, this.srLabel);
    });

    effect(() => {
      const view = this.view();
      const color = this.kwBadgeColor();
      const label = this.kwBadgeLabel()?.trim() ?? '';
      const visible = view.kind !== 'hidden';

      this.renderer.setAttribute(
        this.badge,
        'class',
        `kw-badge kw-badge--${view.kind} kw-badge--${color}`,
      );
      this.renderer.setProperty(this.badge, 'textContent', view.kind === 'count' ? view.text : '');
      setHidden(this.renderer, this.badge, !visible);

      const showLabel = visible && label !== '';
      this.renderer.setProperty(this.srLabel, 'textContent', showLabel ? label : '');
      setHidden(this.renderer, this.srLabel, !showLabel);
    });
  }
}

/** Define o que o badge mostra a partir do valor informado. */
function resolveBadgeView(value: KwBadgeValue, max: number): KwBadgeView {
  if (value === true) return { kind: 'dot', text: '' };
  if (value === false || value === null) return HIDDEN_VIEW;

  const text = String(value).trim();
  if (text === '') return HIDDEN_VIEW;

  const numeric = Number(text);
  if (Number.isNaN(numeric)) return { kind: 'count', text };
  if (numeric <= 0) return HIDDEN_VIEW;

  return { kind: 'count', text: numeric > max ? `${max}+` : String(numeric) };
}

function setHidden(renderer: Renderer2, element: HTMLElement, hidden: boolean): void {
  if (hidden) {
    renderer.setAttribute(element, 'hidden', '');
  } else {
    renderer.removeAttribute(element, 'hidden');
  }
}
