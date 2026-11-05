import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  computed,
  input,
} from '@angular/core';

import { KwColor } from '../../../core/theme/types/kw-color';
import { KwAlertLive } from './types/alert.types';

/**
 * Mensagem de feedback por intenção. `danger` e `warning` são anunciados de forma assertiva
 * (`role="alert"`); as demais, de forma educada (`role="status"`). `live` sobrescreve esse padrão.
 */
@Component({
  selector: 'kw-alert',
  templateUrl: './alert.html',
  styleUrl: './alert.css',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class]': '`kw-alert kw-alert--${color()}`',
    '[attr.role]': 'resolvedLive() === "assertive" ? "alert" : "status"',
  },
})
export class KwAlert {
  readonly color = input<KwColor>('info');
  readonly live = input<KwAlertLive>();

  protected readonly resolvedLive = computed<KwAlertLive>(() => {
    const live = this.live();
    if (live) return live;

    const color = this.color();
    return color === 'danger' || color === 'warning' ? 'assertive' : 'polite';
  });
}
