export const INPUT_GROUP_EXAMPLES = {
  prefixIcon: {
    html: `<div class="field">
  <kw-input-group>
    <svg kw-prefix viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
    <input kw-input placeholder="Buscar" />
  </kw-input-group>
</div>`,
  },

  prefixSuffixText: {
    html: `<div class="field">
  <kw-input-group>
    <span kw-prefix>R$</span>
    <input kw-input placeholder="0" />
    <span kw-suffix>,00</span>
  </kw-input-group>
</div>`,
  },

  passwordToggle: {
    html: `<div class="field">
  <kw-input-group>
    <input kw-input [type]="showPassword() ? 'text' : 'password'" placeholder="Senha" />
    <button
      kw-button
      kw-suffix
      variant="ghost"
      iconOnly
      type="button"
      [attr.aria-label]="showPassword() ? 'Ocultar senha' : 'Mostrar senha'"
      (click)="showPassword.update((v) => !v)"
    >
      @if (showPassword()) {
        <svg kw-icon-start viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
          <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24" />
          <path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68" />
          <path d="M6.61 6.61A13.53 13.53 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61" />
          <line x1="2" x2="22" y1="2" y2="22" />
        </svg>
      } @else {
        <svg kw-icon-start viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
          <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12Z" />
          <circle cx="12" cy="12" r="3" />
        </svg>
      }
    </button>
  </kw-input-group>
</div>`,
    ts: `protected readonly showPassword = signal(false);`,
  },

  clearButton: {
    html: `<div class="field">
  <kw-input-group>
    <svg kw-prefix viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
    <input kw-input placeholder="Buscar" [value]="search()" (input)="onSearch($event)" />
    @if (search()) {
      <button kw-button kw-suffix variant="ghost" iconOnly type="button" aria-label="Limpar" (click)="search.set('')">
        <svg kw-icon-start viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
          <path d="M18 6 6 18" />
          <path d="m6 6 12 12" />
        </svg>
      </button>
    }
  </kw-input-group>
</div>`,
    ts: `protected readonly search = signal('');

protected onSearch(event: Event): void {
  this.search.set((event.target as HTMLInputElement).value);
}`,
  },

  sideBySide: {
    html: `<div class="row">
  <div class="field">
    <input kw-input placeholder="Input isolado" />
  </div>
  <div class="field">
    <kw-input-group>
      <span kw-prefix>R$</span>
      <input kw-input placeholder="Dentro de um grupo" />
      <span kw-suffix>,00</span>
    </kw-input-group>
  </div>
</div>`,
  },

  invalid: {
    html: `<div class="field">
  <kw-input-group>
    <span kw-prefix>R$</span>
    <input kw-input [valid]="false" placeholder="Valor" />
  </kw-input-group>
</div>`,
  },

  disabled: {
    html: `<div class="field">
  <kw-input-group>
    <span kw-prefix>R$</span>
    <input kw-input disabled placeholder="Valor" />
    <span kw-suffix>,00</span>
  </kw-input-group>
</div>`,
  },

  forms: {
    html: `<div class="row">
  <div class="field">
    <kw-input-group>
      <svg kw-prefix viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
        <circle cx="11" cy="11" r="8" />
        <path d="m21 21-4.3-4.3" />
      </svg>
      <input kw-input [formControl]="reactiveControl" placeholder="Reactive Forms (obrigatório)" />
    </kw-input-group>
  </div>
  <div class="field">
    <kw-input-group>
      <svg kw-prefix viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
        <circle cx="11" cy="11" r="8" />
        <path d="m21 21-4.3-4.3" />
      </svg>
      <input kw-input [formField]="signalForm.name" placeholder="Signal Forms (obrigatório)" />
    </kw-input-group>
  </div>
</div>`,
    ts: `protected readonly reactiveControl = new FormControl('', Validators.required);

protected readonly signalModel = signal({ name: '' });
protected readonly signalForm = form(this.signalModel, (p) => {
  required(p.name);
});`,
  },
} as const;
