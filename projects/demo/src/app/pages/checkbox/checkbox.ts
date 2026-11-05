import { Component, computed, signal } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { FormField, form } from '@angular/forms/signals';
import { KwCheckbox } from '@kawa-ng/ui';

import { Example } from '../../shared/components/example/example';
import { CHECKBOX_EXAMPLES } from './checkbox.examples';

@Component({
  selector: 'app-checkbox-page',
  imports: [Example, FormField, KwCheckbox, ReactiveFormsModule],
  templateUrl: './checkbox.html',
  styleUrls: ['../../shared/styles/page.css', './checkbox.css'],
})
export class CheckboxPage {
  protected readonly examples = CHECKBOX_EXAMPLES;

  protected readonly colors = [
    'primary',
    'secondary',
    'success',
    'warning',
    'danger',
    'info',
  ] as const;

  protected readonly users = ['Ana Souza', 'Bruno Lima', 'Carla Dias'] as const;
  protected readonly selection = signal<ReadonlySet<string>>(new Set());
  protected readonly allSelected = computed(() => this.selection().size === this.users.length);
  protected readonly someSelected = computed(
    () => this.selection().size > 0 && !this.allSelected(),
  );

  protected readonly reactiveControl = new FormControl(false, { nonNullable: true });

  protected readonly signalModel = signal({ notifications: false });
  protected readonly signalForm = form(this.signalModel);

  protected toggleAll(checked: boolean): void {
    this.selection.set(checked ? new Set(this.users) : new Set());
  }

  protected toggleUser(name: string, checked: boolean): void {
    const next = new Set(this.selection());
    if (checked) next.add(name);
    else next.delete(name);
    this.selection.set(next);
  }
}
