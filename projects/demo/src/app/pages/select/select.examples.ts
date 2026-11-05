export const SELECT_EXAMPLES = {
  defaultHtml: `<select kw-select aria-label="Perfil">
  <option value="" disabled selected>Selecione um perfil</option>
  <option value="admin">Administrador</option>
  <option value="editor">Editor</option>
  <option value="reader">Leitor</option>
</select>`,

  sideBySideHtml: `<input kw-input type="text" placeholder="Nome" />
<select kw-select aria-label="Perfil">
  <option value="" disabled selected>Perfil</option>
  <option value="admin">Administrador</option>
  <option value="editor">Editor</option>
  <option value="reader">Leitor</option>
</select>`,

  reactiveHtml: `<kw-form-field>
  <label kw-label>Perfil</label>
  <select kw-select [formControl]="reactiveControl">
    <option value="" disabled>Selecione um perfil</option>
    <option value="admin">Administrador</option>
    <option value="editor">Editor</option>
    <option value="reader">Leitor</option>
  </select>
  <span kw-hint>Define o que o usuário pode fazer na empresa.</span>
  @if (reactiveControl.hasError('required')) {
    <span kw-error>Selecione um perfil.</span>
  }
</kw-form-field>`,

  reactiveTs: `import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';

protected readonly reactiveControl = new FormControl('', [Validators.required]);`,

  signalHtml: `<kw-form-field>
  <label kw-label>Perfil</label>
  <select kw-select [formField]="signalForm.profile">
    <option value="" disabled>Selecione um perfil</option>
    <option value="admin">Administrador</option>
    <option value="editor">Editor</option>
    <option value="reader">Leitor</option>
  </select>
  @if (signalForm.profile().touched() && signalForm.profile().invalid()) {
    <span kw-error>Selecione um perfil.</span>
  }
</kw-form-field>`,

  signalTs: `import { signal } from '@angular/core';
import { form, required } from '@angular/forms/signals';

protected readonly signalModel = signal({ profile: '' });
protected readonly signalForm = form(this.signalModel, (p) => {
  required(p.profile);
});`,

  disabledHtml: `<select kw-select disabled aria-label="Perfil desabilitado">
  <option>Administrador</option>
</select>`,

  isolatedHtml: `<span>Ana Souza</span>
<select kw-select aria-label="Perfil de Ana Souza">
  <option value="admin">Administrador</option>
  <option value="editor">Editor</option>
  <option value="reader">Leitor</option>
</select>`,
} as const;
