import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  ElementRef,
  HostAttributeToken,
  ViewEncapsulation,
  booleanAttribute,
  computed,
  inject,
  input,
} from '@angular/core';

import { KwButtonVariant } from './types/button.types';
import { KwColor } from '../../../core/theme/types/kw-color';
import { KwSpinner } from '../spinner/spinner';

@Component({
  selector: 'button[kw-button], a[kw-button]',
  templateUrl: './button.html',
  styleUrl: './button.css',
  imports: [KwSpinner],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'kw-button',
    '[class]': '`kw-button--${color()} kw-button--${variant()}`',
    '[class.kw-button--custom]': 'custom()',
    '[class.kw-button--icon-only]': 'iconOnly()',
    '[class.kw-button--rounded]': 'rounded()',
    '[class.kw-button--loading]': 'loading()',
    '[attr.aria-busy]': 'loading() ? "true" : null',
    '[attr.aria-disabled]': 'loading() ? "true" : initialAriaDisabled',
  },
})
export class KwButton {
  readonly color = input<KwColor>('primary');
  readonly variant = input<KwButtonVariant>('solid');
  readonly custom = input(false, { transform: booleanAttribute });
  readonly iconOnly = input(false, { transform: booleanAttribute });
  readonly rounded = input(false, { transform: booleanAttribute });
  readonly loading = input(false, { transform: booleanAttribute });
  readonly loadingText = input<string>();

  protected readonly hasLoadingText = computed(() => !!this.loadingText()?.trim());

  protected readonly initialAriaDisabled = inject(new HostAttributeToken('aria-disabled'), {
    optional: true,
  });

  constructor() {
    const host: HTMLElement = inject(ElementRef).nativeElement;

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
