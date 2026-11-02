import { Directive, HostAttributeToken, inject } from '@angular/core';

import { KW_FORM_FIELD } from '../types/form-field.token';

let nextId = 0;

@Directive({
  selector: '[kw-hint]',
  host: {
    class: 'kw-hint',
    '[attr.id]': 'id',
  },
})
export class KwHint {
  private readonly field = inject(KW_FORM_FIELD, { optional: true });

  readonly id =
    inject(new HostAttributeToken('id'), { optional: true }) ??
    (this.field ? `kw-hint-${nextId++}` : null);
}
