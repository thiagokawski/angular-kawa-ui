import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  booleanAttribute,
  computed,
  input,
} from '@angular/core';
import { KwColor } from '../../../core/theme/types/kw-color';

@Component({
  selector: 'kw-spinner',
  templateUrl: './spinner.html',
  styleUrl: './spinner.css',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'kw-spinner',
    '[class]': 'colorClass()',
    '[attr.role]': 'decorative() ? null : "status"',
    '[attr.aria-hidden]': 'decorative() ? "true" : null',
  },
})
export class KwSpinner {
  readonly color = input<KwColor>();
  readonly label = input<string>('Carregando…');
  readonly decorative = input(false, { transform: booleanAttribute });

  protected readonly colorClass = computed(() => {
    const color = this.color();
    return color ? `kw-spinner--${color}` : '';
  });
}
