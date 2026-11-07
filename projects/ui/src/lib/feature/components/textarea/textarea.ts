import {
  AfterContentInit,
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  HostAttributeToken,
  ViewEncapsulation,
  booleanAttribute,
  computed,
  forwardRef,
  inject,
  input,
  signal,
} from '@angular/core';
import { NgControl, RequiredValidator, Validators } from '@angular/forms';
import { FormField } from '@angular/forms/signals';

import { KwInput } from '../input/input';
import { KwNormalizedError } from '../form-field/types/error-messages.types';
import { KW_FORM_FIELD } from '../form-field/types/form-field.token';
import {
  normalizeReactiveErrors,
  normalizeSignalErrors,
} from '../form-field/utils/error-messages.utils';

/**
 * Campo de várias linhas com o visual do `KwInput`. Altura mínima de três linhas, redimensionável
 * na vertical. Com `kw-form-field`, usa o rótulo, a dica e o erro do campo.
 */
@Component({
  selector: 'textarea[kw-textarea]',
  template: '',
  styleUrl: './textarea.css',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  // Registra o textarea como KwInput para o KwFormField o encontrar (contentChild).
  providers: [{ provide: KwInput, useExisting: forwardRef(() => KwTextarea) }],
  host: {
    class: 'kw-textarea',
    '[class.kw-textarea--invalid]': 'invalid()',
    '[attr.aria-invalid]': 'invalid() ? "true" : null',
    '[attr.id]': 'resolvedId()',
    '[attr.aria-describedby]': 'describedBy()',
  },
})
export class KwTextarea implements AfterContentInit {
  /** Força o estado de validação. `false` mostra o erro, `true` força o estado válido. */
  readonly valid = input<boolean | undefined, unknown>(undefined, {
    transform: (value: unknown) => (value === undefined ? undefined : booleanAttribute(value)),
  });

  readonly id = input<string>();

  private readonly formField = inject(FormField, { self: true, optional: true });

  private readonly ngControl = this.formField
    ? null
    : inject(NgControl, { self: true, optional: true });

  private readonly requiredValidator = inject(RequiredValidator, { self: true, optional: true });
  private readonly requiredAttribute = inject(new HostAttributeToken('required'), {
    optional: true,
  });

  private readonly fieldContext = inject(KW_FORM_FIELD, { optional: true });
  private readonly initialDescribedBy = inject(new HostAttributeToken('aria-describedby'), {
    optional: true,
  });

  private readonly controlVersion = signal(0);
  private readonly destroyRef = inject(DestroyRef);

  readonly invalid = computed(() => {
    const valid = this.valid();
    if (valid !== undefined) return !valid;

    if (this.formField) {
      const state = this.formField.state();
      return state.invalid() && (state.touched() || state.dirty());
    }

    if (this.ngControl) {
      this.controlVersion();
      return !!this.ngControl.invalid && !!(this.ngControl.touched || this.ngControl.dirty);
    }

    return false;
  });

  readonly required = computed(() => {
    this.controlVersion();

    if (this.formField) return this.formField.state().required();

    if (this.ngControl?.control?.hasValidator(Validators.required)) return true;

    if (this.requiredValidator) return booleanAttribute(this.requiredValidator.required);

    return this.requiredAttribute !== null;
  });

  readonly resolvedId = computed(() => this.id() ?? this.fieldContext?.generatedInputId ?? null);

  readonly errors = computed<KwNormalizedError[]>(() => {
    if (this.formField) return normalizeSignalErrors(this.formField.state().errors());

    if (this.ngControl) {
      this.controlVersion();
      return normalizeReactiveErrors(this.ngControl.errors);
    }

    return [];
  });

  protected readonly describedBy = computed(
    () =>
      [this.initialDescribedBy, this.fieldContext?.describedBy()].filter(Boolean).join(' ') || null,
  );

  ngAfterContentInit(): void {
    const subscription = this.ngControl?.control?.events.subscribe(() =>
      this.controlVersion.update((version) => version + 1),
    );
    this.destroyRef.onDestroy(() => subscription?.unsubscribe());
  }
}
