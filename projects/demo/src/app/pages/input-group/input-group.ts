import { Component, signal } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormField, form, required } from '@angular/forms/signals';
import { KwButton, KwInput, KwInputGroup } from '@kawa-ng/ui';

import { Example } from '../../shared/components/example/example';
import { INPUT_GROUP_EXAMPLES } from './input-group.examples';

@Component({
  selector: 'app-input-group-page',
  imports: [Example, FormField, KwButton, KwInput, KwInputGroup, ReactiveFormsModule],
  templateUrl: './input-group.html',
  styleUrls: ['../../shared/styles/page.css', './input-group.css'],
})
export class InputGroupPage {
  protected readonly examples = INPUT_GROUP_EXAMPLES;

  protected readonly showPassword = signal(false);
  protected readonly search = signal('');

  protected onSearch(event: Event): void {
    this.search.set((event.target as HTMLInputElement).value);
  }

  protected readonly reactiveControl = new FormControl('', Validators.required);

  protected readonly signalModel = signal({ name: '' });
  protected readonly signalForm = form(this.signalModel, (p) => {
    required(p.name);
  });
}
