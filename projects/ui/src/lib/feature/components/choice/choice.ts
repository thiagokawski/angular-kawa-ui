import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  computed,
  input,
} from '@angular/core';

import { KwColor } from '../../../core/theme/types/kw-color';

/**
 * Opção em cartão: um `label` que envolve um `kw-radio` (ou `kw-checkbox`) e o texto. Quando o
 * controle interno está marcado, o cartão ganha a cor de intenção. O foco do controle aparece em
 * volta do cartão.
 */
@Component({
  selector: 'label[kw-choice]',
  template: '<ng-content />',
  styleUrl: './choice.css',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'kw-choice',
    '[class]': 'colorClass()',
  },
})
export class KwChoice {
  /** Cor de intenção usada no destaque quando o controle interno está marcado. */
  readonly color = input<KwColor>('primary');

  protected readonly colorClass = computed(() => `kw-choice--${this.color()}`);
}
