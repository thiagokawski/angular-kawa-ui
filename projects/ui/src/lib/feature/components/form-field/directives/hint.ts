import { Directive, HostAttributeToken, inject, input } from '@angular/core';

import { KW_FORM_FIELD } from '../types/form-field.token';

let nextId = 0;

@Directive({
  selector: '[kw-hint]',
  host: {
    class: 'kw-hint',
    '[class.kw-hint--end]': 'align() === "end"',
    '[attr.id]': 'id',
  },
})
export class KwHint {
  /**
   * Lado da linha de dicas. Dois hints no mesmo campo ficam na mesma linha: `start` à esquerda
   * e `end` à direita.
   */
  readonly align = input<'start' | 'end'>('start');

  private readonly field = inject(KW_FORM_FIELD, { optional: true });

  readonly id =
    inject(new HostAttributeToken('id'), { optional: true }) ??
    (this.field ? `kw-hint-${nextId++}` : null);
}
