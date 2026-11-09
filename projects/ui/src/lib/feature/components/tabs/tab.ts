import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  HostAttributeToken,
  ViewEncapsulation,
  booleanAttribute,
  computed,
  inject,
  input,
} from '@angular/core';

/**
 * Item de aba, usado em `<a kw-tab>` (navegação) ou `<button kw-tab>` (alternância).
 * Em `<a>` expõe `aria-current="page"` quando ativo; em `<button>` expõe `aria-pressed`
 * e assume `type="button"` se o consumidor não informar outro.
 */
@Component({
  selector: 'a[kw-tab], button[kw-tab]',
  template: '<ng-content />',
  styleUrl: './tabs.css',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'kw-tab',
    '[class.kw-tab--active]': 'active()',
    '[attr.aria-current]': 'ariaCurrent()',
    '[attr.aria-pressed]': 'ariaPressed()',
    '[attr.type]': 'type',
  },
})
export class KwTab {
  /** Indica a aba ativa. */
  readonly active = input(false, { transform: booleanAttribute });

  private readonly isLink = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement.tagName === 'A';
  private readonly hostType = inject(new HostAttributeToken('type'), { optional: true });

  protected readonly type = this.isLink ? null : (this.hostType ?? 'button');

  protected readonly ariaCurrent = computed(() => (this.isLink && this.active() ? 'page' : null));
  protected readonly ariaPressed = computed(() =>
    this.isLink ? null : this.active() ? 'true' : 'false',
  );
}
