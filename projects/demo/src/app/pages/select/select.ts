import { Component, signal } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormField, form, required } from '@angular/forms/signals';
import {
  KwError,
  KwFormField,
  KwHint,
  KwInput,
  KwLabel,
  KwSelect,
  provideKwErrorMessages,
  type KwErrorMessages,
} from '@kawa-ng/ui';

import { Example } from '../../shared/components/example/example';
import { SELECT_EXAMPLES } from './select.examples';

const ERROR_MESSAGES: KwErrorMessages = {
  required: 'Selecione um perfil.',
  default: 'Valor inválido.',
};

@Component({
  selector: 'app-select-page',
  imports: [
    Example,
    FormField,
    KwError,
    KwFormField,
    KwHint,
    KwInput,
    KwLabel,
    KwSelect,
    ReactiveFormsModule,
  ],
  templateUrl: './select.html',
  styleUrls: ['../../shared/styles/page.css', './select.css'],
  providers: [provideKwErrorMessages(ERROR_MESSAGES)],
})
export class SelectPage {
  protected readonly examples = SELECT_EXAMPLES;

  protected readonly profiles = ['Administrador', 'Editor', 'Leitor'] as const;

  protected readonly reactiveControl = new FormControl('', [Validators.required]);

  protected readonly signalModel = signal({ profile: '' });
  protected readonly signalForm = form(this.signalModel, (p) => {
    required(p.profile);
  });
}
