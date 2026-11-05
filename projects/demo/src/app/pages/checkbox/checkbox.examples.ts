export const CHECKBOX_EXAMPLES = {
  defaultHtml: `<label>
  <input kw-checkbox type="checkbox" />
  <span>Aceito receber novidades</span>
</label>`,

  colorsHtml: `<input kw-checkbox type="checkbox" checked color="primary" />
<input kw-checkbox type="checkbox" checked color="secondary" />
<input kw-checkbox type="checkbox" checked color="success" />
<input kw-checkbox type="checkbox" checked color="warning" />
<input kw-checkbox type="checkbox" checked color="danger" />
<input kw-checkbox type="checkbox" checked color="info" />`,

  statesHtml: `<input kw-checkbox type="checkbox" checked />
<input kw-checkbox type="checkbox" [indeterminate]="true" />
<input kw-checkbox type="checkbox" disabled />
<input kw-checkbox type="checkbox" [valid]="false" />`,

  selectAllHtml: `<input
  kw-checkbox
  type="checkbox"
  [checked]="allSelected()"
  [indeterminate]="someSelected()"
  (change)="toggleAll($any($event.target).checked)"
/>
<input
  kw-checkbox
  type="checkbox"
  [checked]="selection().has(user)"
  (change)="toggleUser(user, $any($event.target).checked)"
/>`,

  selectAllTs: `import { computed, signal } from '@angular/core';

protected readonly users = ['Ana Souza', 'Bruno Lima', 'Carla Dias'] as const;
protected readonly selection = signal<ReadonlySet<string>>(new Set());
protected readonly allSelected = computed(() => this.selection().size === this.users.length);
protected readonly someSelected = computed(
  () => this.selection().size > 0 && !this.allSelected(),
);

protected toggleAll(checked: boolean): void {
  this.selection.set(checked ? new Set(this.users) : new Set());
}

protected toggleUser(name: string, checked: boolean): void {
  const next = new Set(this.selection());
  if (checked) next.add(name);
  else next.delete(name);
  this.selection.set(next);
}`,

  reactiveHtml: `<input kw-checkbox type="checkbox" [formControl]="reactiveControl" />`,

  reactiveTs: `import { FormControl, ReactiveFormsModule } from '@angular/forms';

protected readonly reactiveControl = new FormControl(false, { nonNullable: true });`,

  signalHtml: `<input kw-checkbox type="checkbox" [formField]="signalForm.notifications" />`,

  signalTs: `import { signal } from '@angular/core';
import { form } from '@angular/forms/signals';

protected readonly signalModel = signal({ notifications: false });
protected readonly signalForm = form(this.signalModel);`,

  ariaLabelHtml: `<input kw-checkbox type="checkbox" aria-label="Selecionar Ana Souza" />
<input kw-checkbox type="checkbox" aria-label="Selecionar Bruno Lima" />`,
} as const;
