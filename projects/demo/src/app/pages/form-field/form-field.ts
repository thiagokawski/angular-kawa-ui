import { Component, signal } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import {
  FormField,
  email,
  form,
  minLength,
  pattern,
  required,
  submit,
} from '@angular/forms/signals';
import {
  KwButton,
  KwError,
  KwFormField,
  KwHint,
  KwInput,
  KwInputGroup,
  KwLabel,
  provideKwErrorMessages,
  type KwErrorMessages,
} from '@kawa-ng/ui';
import { Example } from '../../shared/components/example/example';
import { FORM_FIELD_EXAMPLES } from './form-field.examples';

const ERROR_MESSAGES: KwErrorMessages = {
  required: 'Campo obrigatório.',
  email: 'Informe um e-mail válido.',
  minlength: ({ requiredLength }) => `Use pelo menos ${requiredLength} caracteres.`,
  default: 'Valor inválido.',
};

@Component({
  selector: 'app-form-field-page',
  imports: [
    Example,
    FormField,
    KwButton,
    KwError,
    KwFormField,
    KwHint,
    KwInput,
    KwInputGroup,
    KwLabel,
    ReactiveFormsModule,
  ],
  templateUrl: './form-field.html',
  styleUrls: ['../../shared/styles/page.css', './form-field.css'],
  providers: [provideKwErrorMessages(ERROR_MESSAGES)],
})
export class FormFieldPage {
  protected readonly examples = FORM_FIELD_EXAMPLES;

  // Reactive Forms
  protected readonly reactiveRequired = new FormControl('', [Validators.required]);
  protected readonly reactiveEmail = new FormControl('', [Validators.required, Validators.email]);
  protected readonly reactiveAuto = new FormControl('', [
    Validators.required,
    Validators.minLength(3),
  ]);

  // Signal Forms
  protected readonly requiredModel = signal({ name: '' });
  protected readonly requiredForm = form(this.requiredModel, (p) => {
    required(p.name);
  });

  protected readonly emailModel = signal({ email: '' });
  protected readonly emailForm = form(this.emailModel, (p) => {
    required(p.email);
    email(p.email);
  });

  protected readonly autoModel = signal({ name: '' });
  protected readonly autoForm = form(this.autoModel, (p) => {
    required(p.name);
    minLength(p.name, 3);
  });

  protected readonly codeModel = signal({ code: '' });
  protected readonly codeForm = form(this.codeModel, (p) => {
    pattern(p.code, /^[A-Z]{3}$/);
  });

  protected readonly inputGroupModel = signal({ email: '' });
  protected readonly inputGroupForm = form(this.inputGroupModel, (p) => {
    required(p.email);
    email(p.email);
  });

  protected readonly fullModel = signal({ name: '', email: '', password: '' });
  protected readonly fullForm = form(this.fullModel, (p) => {
    required(p.name);
    required(p.email);
    email(p.email);
    required(p.password);
    minLength(p.password, 8);
  });

  protected readonly sending = signal(false);
  protected readonly showPassword = signal(false);

  protected hasKind(errors: readonly { kind: string }[], kind: string): boolean {
    return errors.some((error) => error.kind === kind);
  }

  protected togglePassword(): void {
    this.showPassword.update((value) => !value);
  }

  protected async onSubmit(event: Event): Promise<void> {
    event.preventDefault();
    await submit(this.fullForm, async () => {
      this.sending.set(true);
      await new Promise((resolve) => setTimeout(resolve, 1500));
      this.sending.set(false);
    });
  }
}
