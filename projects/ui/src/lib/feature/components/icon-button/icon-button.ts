import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  ElementRef,
  HostAttributeToken,
  ViewEncapsulation,
  booleanAttribute,
  effect,
  inject,
  input,
  isDevMode,
} from '@angular/core';

import { KwButtonVariant } from '../button/types/button.types';
import { KwColor } from '../../../core/theme/types/kw-color';
import { KwSpinner } from '../spinner/spinner';
import { KwIconButtonSize } from './types/icon-button.types';

/**
 * Botão quadrado só de ícone, com tamanho fixo. `label` é obrigatório e vira `aria-label`.
 * Reusa as classes de cor e variante do `KwButton`, sem repetir a tabela de cores.
 */
@Component({
  selector: 'button[kw-icon-button], a[kw-icon-button]',
  templateUrl: './icon-button.html',
  styleUrls: ['../button/button.css', './icon-button.css'],
  imports: [KwSpinner],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'kw-button kw-icon-button',
    '[class]': '`kw-button--${color()} kw-button--${variant()} kw-icon-button--${size()}`',
    '[class.kw-button--rounded]': 'rounded()',
    '[class.kw-button--loading]': 'loading()',
    '[attr.aria-label]': 'label()',
    '[attr.aria-busy]': 'loading() ? "true" : null',
    '[attr.aria-disabled]': 'loading() ? "true" : initialAriaDisabled',
  },
})
export class KwIconButton {
  readonly color = input<KwColor>('secondary');
  readonly variant = input<KwButtonVariant>('ghost');
  readonly size = input<KwIconButtonSize>('md');
  readonly label = input.required<string>();
  readonly rounded = input(false, { transform: booleanAttribute });
  readonly loading = input(false, { transform: booleanAttribute });

  protected readonly initialAriaDisabled = inject(new HostAttributeToken('aria-disabled'), {
    optional: true,
  });

  constructor() {
    const host: HTMLElement = inject(ElementRef).nativeElement;

    effect(() => {
      if (isDevMode() && !this.label()?.trim()) {
        console.warn(
          '[KwIconButton] `label` vazio: o botão de ícone não tem nome acessível. Informe um texto em `label`.',
        );
      }
    });

    const blockWhileLoading = (event: Event) => {
      if (!this.loading()) return;
      event.preventDefault();
      event.stopImmediatePropagation();
    };

    host.addEventListener('click', blockWhileLoading, { capture: true });

    inject(DestroyRef).onDestroy(() =>
      host.removeEventListener('click', blockWhileLoading, { capture: true }),
    );
  }
}
