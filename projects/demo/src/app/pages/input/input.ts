import { Component, signal } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormField, email, form, required } from '@angular/forms/signals';
import { KwInput } from '@kawa-ng/ui';

import { Example } from '../../shared/components/example/example';
import { INPUT_EXAMPLES } from './input.examples';

@Component({
  selector: 'app-input-page',
  imports: [KwInput, ReactiveFormsModule, FormField, Example],
  templateUrl: './input.html',
  styleUrls: ['../../shared/styles/page.css', './input.css'],
})
export class InputPage {
  protected readonly examples = INPUT_EXAMPLES;

  protected readonly emailControl = new FormControl('', [Validators.required, Validators.email]);

  protected readonly model = signal({ email: '' });
  protected readonly signalForm = form(this.model, (p) => {
    required(p.email);
    email(p.email);
  });
}
