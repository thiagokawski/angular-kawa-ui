export const INPUT_EXAMPLES = {
  defaultHtml: `<div class="field">
  <input kw-input type="text" placeholder="Digite algo" />
</div>`,

  typesHtml: `<div class="field">
  <input kw-input type="text" placeholder="text" />
</div>
<div class="field">
  <input kw-input type="email" placeholder="email" />
</div>
<div class="field">
  <input kw-input type="password" placeholder="password" />
</div>
<div class="field">
  <input kw-input type="number" placeholder="number" />
</div>
<div class="field">
  <input kw-input type="date" />
</div>`,

  disabledHtml: `<div class="field">
  <input kw-input type="text" placeholder="Desabilitado" disabled />
</div>`,

  manualHtml: `<div class="field">
  <input kw-input type="text" [valid]="false" placeholder="Forçado inválido" />
</div>
<div class="field">
  <input kw-input type="text" [valid]="true" placeholder="Forçado válido" />
</div>`,

  reactiveHtml: `<div class="field">
  <input kw-input type="email" placeholder="nome@exemplo.com" [formControl]="emailControl" />
  <small>valid: {{ emailControl.valid }} · touched: {{ emailControl.touched }} · dirty: {{ emailControl.dirty }}</small>
</div>`,

  reactiveTs: `import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';

protected readonly emailControl = new FormControl('', [Validators.required, Validators.email]);`,

  signalHtml: `<div class="field">
  <input kw-input type="email" placeholder="nome@exemplo.com" [formField]="signalForm.email" />
  <small>valid: {{ signalForm.email().valid() }} · touched: {{ signalForm.email().touched() }} · dirty: {{ signalForm.email().dirty() }}</small>
</div>`,

  signalTs: `import { signal } from '@angular/core';
import { FormField, email, form, required } from '@angular/forms/signals';

protected readonly model = signal({ email: '' });
protected readonly signalForm = form(this.model, (p) => {
  required(p.email);
  email(p.email);
});`,
} as const;
