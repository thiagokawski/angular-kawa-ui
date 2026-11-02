import { InjectionToken, Signal } from '@angular/core';

export interface KwFormFieldContext {
  readonly generatedInputId: string;
  readonly inputId: Signal<string | null>;
  readonly required: Signal<boolean>;
  readonly describedBy: Signal<string | null>;
}

export const KW_FORM_FIELD = new InjectionToken<KwFormFieldContext>('KW_FORM_FIELD');
