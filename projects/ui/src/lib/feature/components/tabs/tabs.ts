import { ChangeDetectionStrategy, Component, ViewEncapsulation, input } from '@angular/core';

/**
 * Contêiner de abas. Não usa `role="tablist"`: o caso de uso é navegação/alternância,
 * então a semântica vem de cada `KwTab` (`aria-current` em links, `aria-pressed` em botões).
 */
@Component({
  selector: 'kw-tabs, nav[kw-tabs], div[kw-tabs]',
  template: '<ng-content />',
  styleUrl: './tabs.css',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'kw-tabs',
    '[attr.aria-label]': 'label()',
  },
})
export class KwTabs {
  /** Rótulo de acessibilidade do grupo de abas. */
  readonly label = input<string>();
}
