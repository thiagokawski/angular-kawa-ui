export const FORM_FIELD_EXAMPLES = {
  labelHint: {
    html: `<kw-form-field class="field">
  <label kw-label>Nome de exibição</label>
  <input kw-input placeholder="Como você quer aparecer" />
  <span kw-hint>Aparece no seu perfil.</span>
</kw-form-field>`,
  },

  required: {
    html: `<kw-form-field class="field">
  <label kw-label>Required nativo</label>
  <input kw-input required />
  <span kw-hint>Atributo required no input.</span>
</kw-form-field>

<kw-form-field class="field">
  <label kw-label>Validators.required</label>
  <input kw-input [formControl]="reactiveRequired" />
  <span kw-hint>Reactive Forms.</span>
</kw-form-field>

<kw-form-field class="field">
  <label kw-label>required()</label>
  <input kw-input [formField]="requiredForm.name" />
  <span kw-hint>Signal Forms.</span>
</kw-form-field>

<kw-form-field class="field">
  <label kw-label>Opcional</label>
  <input kw-input />
  <span kw-hint>Sem obrigatoriedade.</span>
</kw-form-field>`,
    ts: `protected readonly reactiveRequired = new FormControl('', [Validators.required]);

protected readonly requiredModel = signal({ name: '' });
protected readonly requiredForm = form(this.requiredModel, (p) => {
  required(p.name);
});`,
  },

  reactiveErrors: {
    html: `<kw-form-field class="field">
  <label kw-label>E-mail</label>
  <input kw-input [formControl]="reactiveEmail" placeholder="seu e-mail" />
  <span kw-hint>Usaremos para contato.</span>
  @if (reactiveEmail.hasError('required')) {
    <span kw-error>Informe o e-mail.</span>
  }
  @if (reactiveEmail.hasError('email')) {
    <span kw-error>E-mail inválido.</span>
  }
</kw-form-field>`,
    ts: `protected readonly reactiveEmail = new FormControl('', [
  Validators.required,
  Validators.email,
]);`,
  },

  signalErrors: {
    html: `<kw-form-field class="field">
  <label kw-label>E-mail</label>
  <input kw-input [formField]="emailForm.email" placeholder="seu e-mail" />
  <span kw-hint>Usaremos para contato.</span>
  @if (hasKind(emailForm.email().errors(), 'required')) {
    <span kw-error>Informe o e-mail.</span>
  }
  @if (hasKind(emailForm.email().errors(), 'email')) {
    <span kw-error>E-mail inválido.</span>
  }
</kw-form-field>`,
    ts: `protected readonly emailModel = signal({ email: '' });
protected readonly emailForm = form(this.emailModel, (p) => {
  required(p.email);
  email(p.email);
});

protected hasKind(errors: readonly { kind: string }[], kind: string): boolean {
  return errors.some((error) => error.kind === kind);
}`,
  },

  autoMessages: {
    html: `<kw-form-field class="field">
  <label kw-label>Nome (Reactive)</label>
  <input kw-input [formControl]="reactiveAuto" />
  <span kw-hint>Mínimo de 3 caracteres.</span>
</kw-form-field>

<kw-form-field class="field">
  <label kw-label>Nome (Signal Forms)</label>
  <input kw-input [formField]="autoForm.name" />
  <span kw-hint>Mínimo de 3 caracteres.</span>
</kw-form-field>`,
    ts: `protected readonly reactiveAuto = new FormControl('', [
  Validators.required,
  Validators.minLength(3),
]);

protected readonly autoModel = signal({ name: '' });
protected readonly autoForm = form(this.autoModel, (p) => {
  required(p.name);
  minLength(p.name, 3);
});`,
  },

  customMessages: {
    html: `<kw-form-field class="field">
  <label kw-label>Código</label>
  <input kw-input [formField]="codeForm.code" placeholder="ABC" />
  <span kw-hint>Três letras maiúsculas.</span>
</kw-form-field>`,
    ts: `const ERROR_MESSAGES: KwErrorMessages = {
  required: 'Campo obrigatório.',
  email: 'Informe um e-mail válido.',
  minlength: ({ requiredLength }) => \`Use pelo menos \${requiredLength} caracteres.\`,
  default: 'Valor inválido.',
};

@Component({
  // ...
  providers: [provideKwErrorMessages(ERROR_MESSAGES)],
})
export class FormFieldPage {}

// Campo com pattern: não há entrada "pattern" no mapa, então cai em "default".
protected readonly codeModel = signal({ code: '' });
protected readonly codeForm = form(this.codeModel, (p) => {
  pattern(p.code, /^[A-Z]{3}$/);
});`,
  },

  inputGroup: {
    html: `<kw-form-field class="field">
  <label kw-label>E-mail de contato</label>
  <kw-input-group>
    <svg kw-prefix viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="m22 6-10 7L2 6" />
    </svg>
    <input kw-input [formField]="inputGroupForm.email" placeholder="seu e-mail" />
  </kw-input-group>
  <span kw-hint>Enviaremos a confirmação para este endereço.</span>
  @if (hasKind(inputGroupForm.email().errors(), 'required')) {
    <span kw-error>Informe o e-mail.</span>
  }
  @if (hasKind(inputGroupForm.email().errors(), 'email')) {
    <span kw-error>E-mail inválido.</span>
  }
</kw-form-field>`,
    ts: `protected readonly inputGroupModel = signal({ email: '' });
protected readonly inputGroupForm = form(this.inputGroupModel, (p) => {
  required(p.email);
  email(p.email);
});`,
  },

  fullForm: {
    html: `<form class="form" (submit)="onSubmit($event)" novalidate>
  <kw-form-field class="field">
    <label kw-label>Nome</label>
    <input kw-input [formField]="fullForm.name" placeholder="seu nome" />
    @if (hasKind(fullForm.name().errors(), 'required')) {
      <span kw-error>Informe seu nome.</span>
    }
  </kw-form-field>

  <kw-form-field class="field">
    <label kw-label>E-mail</label>
    <input kw-input [formField]="fullForm.email" placeholder="seu e-mail" />
    @if (hasKind(fullForm.email().errors(), 'required')) {
      <span kw-error>Informe o e-mail.</span>
    }
    @if (hasKind(fullForm.email().errors(), 'email')) {
      <span kw-error>E-mail inválido.</span>
    }
  </kw-form-field>

  <kw-form-field class="field">
    <label kw-label>Senha</label>
    <kw-input-group>
      <input kw-input [type]="showPassword() ? 'text' : 'password'" [formField]="fullForm.password" />
      <button
        kw-button
        type="button"
        kw-suffix
        variant="ghost"
        iconOnly
        [attr.aria-label]="showPassword() ? 'Ocultar senha' : 'Mostrar senha'"
        (click)="togglePassword()"
      >
        <svg kw-icon-start viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
          <path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7S1 12 1 12z" />
          <circle cx="12" cy="12" r="3" />
        </svg>
      </button>
    </kw-input-group>
    <span kw-hint>Mínimo de 8 caracteres.</span>
    @if (hasKind(fullForm.password().errors(), 'required')) {
      <span kw-error>Informe a senha.</span>
    }
    @if (hasKind(fullForm.password().errors(), 'minLength')) {
      <span kw-error>Use pelo menos 8 caracteres.</span>
    }
  </kw-form-field>

  <button kw-button type="submit" [loading]="sending()" loadingText="Enviando…">Enviar</button>
</form>`,
    ts: `protected readonly fullModel = signal({ name: '', email: '', password: '' });
protected readonly fullForm = form(this.fullModel, (p) => {
  required(p.name);
  required(p.email);
  email(p.email);
  required(p.password);
  minLength(p.password, 8);
});

protected readonly sending = signal(false);
protected readonly showPassword = signal(false);

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
}`,
  },
} as const;
