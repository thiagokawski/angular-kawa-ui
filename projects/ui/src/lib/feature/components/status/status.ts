import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  computed,
  input,
} from '@angular/core';

import { KwColor } from '../../../core/theme/types/kw-color';

/**
 * Indicador de status: um ponto seguido do rótulo projetado, na mesma cor. O ponto é decorativo
 * (`aria-hidden`), então o leitor de tela anuncia só o rótulo.
 */
@Component({
  selector: 'kw-status',
  template: '<span class="kw-status__dot" aria-hidden="true"></span><ng-content />',
  styleUrl: './status.css',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'kw-status',
    '[class]': 'colorClass()',
  },
})
export class KwStatus {
  /** Cor do ponto e do rótulo. `neutral` usa o texto do tema; `muted`, o texto secundário. */
  readonly color = input<KwColor | 'neutral' | 'muted'>('neutral');

  protected readonly colorClass = computed(() => `kw-status--${this.color()}`);
}
