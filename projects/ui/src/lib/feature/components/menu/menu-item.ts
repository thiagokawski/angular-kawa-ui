import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  ViewEncapsulation,
  computed,
  inject,
  input,
} from '@angular/core';

import { KwColor } from '../../../core/theme/types/kw-color';

/**
 * Item de `kw-menu`: `button[kw-menu-item]` ou `a[kw-menu-item]`. Ao ser acionado, fecha o menu
 * que o contém. `color` aplica a cor de intenção (ex.: `danger` para uma ação destrutiva); o ícone
 * vai no slot `kw-icon`, à esquerda.
 */
@Component({
  selector: 'button[kw-menu-item], a[kw-menu-item]',
  template: `
    <span class="kw-menu-item__icon"><ng-content select="kw-icon" /></span>
    <span class="kw-menu-item__label"><ng-content /></span>
  `,
  styleUrl: './menu.css',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    role: 'menuitem',
    tabindex: '-1',
    '[class]': 'hostClass()',
    '(click)': 'onClick()',
  },
})
export class KwMenuItem {
  readonly color = input<KwColor | null>(null);

  protected readonly hostClass = computed(() => {
    const color = this.color();
    return color ? `kw-menu-item kw-menu-item--${color}` : 'kw-menu-item';
  });

  private readonly element: HTMLElement = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;

  protected onClick(): void {
    this.element.closest<HTMLElement>('[popover]')?.hidePopover();
  }
}
