import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  computed,
  contentChild,
  contentChildren,
  forwardRef,
  inject,
} from '@angular/core';

import { KwInput } from '../input/input';
import { KwError } from './directives/error';
import { KwHint } from './directives/hint';
import { KW_ERROR_MESSAGES } from './types/error-messages.token';
import { KwFormFieldContext, KW_FORM_FIELD } from './types/form-field.token';
import { resolveErrorMessage } from './utils/error-messages.utils';

let nextId = 0;

@Component({
  selector: 'kw-form-field',
  templateUrl: './form-field.html',
  styleUrl: './form-field.css',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [{ provide: KW_FORM_FIELD, useExisting: forwardRef(() => KwFormField) }],
  host: {
    class: 'kw-form-field',
    '[class.kw-form-field--invalid]': 'invalid()',
  },
})
export class KwFormField implements KwFormFieldContext {
  readonly generatedInputId = `kw-input-${nextId++}`;
  readonly autoErrorId = `kw-error-auto-${nextId++}`;

  private readonly messages = inject(KW_ERROR_MESSAGES, { optional: true });
  private readonly input = contentChild(KwInput, { descendants: true });
  private readonly hints = contentChildren(KwHint, { descendants: true });
  private readonly projectedErrors = contentChildren(KwError, { descendants: true });

  readonly invalid = computed(() => this.input()?.invalid() ?? false);
  readonly required = computed(() => this.input()?.required() ?? false);
  readonly inputId = computed(() => this.input()?.resolvedId() ?? null);

  protected readonly autoError = computed(() => {
    if (!this.invalid() || this.projectedErrors().length) return null;
    return resolveErrorMessage(this.input()?.errors() ?? [], this.messages);
  });

  readonly describedBy = computed(() => {
    if (this.invalid() && this.autoError()) return this.autoErrorId;

    const ids = (this.invalid() ? this.projectedErrors() : this.hints())
      .map((item) => item.id)
      .filter((id): id is string => !!id);
    return ids.length ? ids.join(' ') : null;
  });
}
