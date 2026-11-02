import { Directive, HostAttributeToken, inject } from '@angular/core';

import { KW_FORM_FIELD } from '../types/form-field.token';

@Directive({
  selector: 'label[kw-label]',
  host: {
    class: 'kw-label',
    '[attr.for]': 'field?.inputId() ?? initialFor',
    '[class.kw-label--required]': 'field?.required() ?? false',
  },
})
export class KwLabel {
  protected readonly field = inject(KW_FORM_FIELD, { optional: true });

  private readonly initialFor = inject(new HostAttributeToken('for'), { optional: true });
}
