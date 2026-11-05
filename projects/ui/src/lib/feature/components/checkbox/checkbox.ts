import {
  AfterContentInit,
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  ElementRef,
  HostAttributeToken,
  ViewEncapsulation,
  booleanAttribute,
  computed,
  effect,
  inject,
  input,
  signal,
} from '@angular/core';
import { NgControl } from '@angular/forms';
import { FormField } from '@angular/forms/signals';

import { KwColor } from '../../../core/theme/types/kw-color';

/**
 * Checkbox nativo estilizado. O elemento continua sendo `input[type=checkbox]`: `checked`,
 * `disabled` e os forms do Angular funcionam sem adaptador. O rótulo fica por conta do app.
 */
@Component({
  selector: 'input[type="checkbox"][kw-checkbox]',
  template: '',
  styleUrl: './checkbox.css',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'kw-checkbox',
    '[class]': 'colorClass()',
    '[class.kw-checkbox--invalid]': 'invalid()',
    '[attr.aria-invalid]': 'invalid() ? "true" : null',
    '[attr.aria-describedby]': 'describedBy()',
  },
})
export class KwCheckbox implements AfterContentInit {
  /** Cor de intenção usada quando marcado. */
  readonly color = input<KwColor>('primary');

  /** Força o estado de validação. `false` mostra o erro, `true` força o estado válido. */
  readonly valid = input<boolean | undefined, unknown>(undefined, {
    transform: (value: unknown) => (value === undefined ? undefined : booleanAttribute(value)),
  });

  /** Mostra o traço de estado misto. O navegador limpa o estado ao clicar; ajuste pelo app. */
  readonly indeterminate = input(false, { transform: booleanAttribute });

  private readonly element = inject<ElementRef<HTMLInputElement>>(ElementRef);

  private readonly formField = inject(FormField, { self: true, optional: true });

  private readonly ngControl = this.formField
    ? null
    : inject(NgControl, { self: true, optional: true });

  private readonly initialDescribedBy = inject(new HostAttributeToken('aria-describedby'), {
    optional: true,
  });

  private readonly controlVersion = signal(0);
  private readonly destroyRef = inject(DestroyRef);

  protected readonly colorClass = computed(() => `kw-checkbox--${this.color()}`);

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

  protected readonly describedBy = computed(() => this.initialDescribedBy || null);

  constructor() {
    // A propriedade `indeterminate` não é atributo, então é aplicada direto no elemento.
    effect(() => {
      this.element.nativeElement.indeterminate = this.indeterminate();
    });
  }

  ngAfterContentInit(): void {
    const subscription = this.ngControl?.control?.events.subscribe(() =>
      this.controlVersion.update((version) => version + 1),
    );
    this.destroyRef.onDestroy(() => subscription?.unsubscribe());
  }
}
