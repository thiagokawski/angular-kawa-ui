export const BUTTON_EXAMPLES = {
  colors: `<button kw-button color="primary">Primary</button>
<button kw-button color="secondary">Secondary</button>
<button kw-button color="success">Success</button>
<button kw-button color="warning">Warning</button>
<button kw-button color="danger">Danger</button>
<button kw-button color="info">Info</button>`,

  variants: `<button kw-button variant="solid">Solid</button>
<button kw-button variant="outline">Outline</button>
<button kw-button variant="ghost">Ghost</button>`,

  matrix: `<div class="matrix">
  @for (variant of variants; track variant) {
    <div class="matrix__row">
      <span class="matrix__label">{{ variant }}</span>
      @for (color of colors; track color) {
        <button kw-button [color]="color" [variant]="variant">{{ color }}</button>
      }
    </div>
  }
</div>`,

  icons: `<button kw-button>
  <svg kw-icon-start viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
    <path d="M19 12H5M11 19l-7-7 7-7" />
  </svg>
  Voltar
</button>
<button kw-button>
  Avançar
  <svg kw-icon-end viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
    <path d="M5 12h14M13 5l7 7-7 7" />
  </svg>
</button>`,

  iconOnly: `<button kw-button iconOnly aria-label="Adicionar">
  <svg kw-icon-start viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
    <path d="M12 5v14M5 12h14" />
  </svg>
</button>
<button kw-button iconOnly rounded aria-label="Adicionar">
  <svg kw-icon-start viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
    <path d="M12 5v14M5 12h14" />
  </svg>
</button>`,

  rounded: `<button kw-button rounded>Arredondado</button>
<button kw-button rounded variant="outline">Arredondado outline</button>`,

  loading: `<button kw-button loading aria-label="Carregando"></button>
<button kw-button loading loadingText="Salvando…">Salvar</button>
<button kw-button [loading]="sending()" (click)="simulate()">Simular envio</button>`,

  loadingTs: `import { Component, signal } from '@angular/core';

export class ButtonPage {
  protected readonly sending = signal(false);

  protected simulate(): void {
    this.sending.set(true);
    setTimeout(() => this.sending.set(false), 2000);
  }
}`,

  customSpinner: `<button kw-button color="secondary" variant="outline" loading loadingText="Enviando…">
  <kw-spinner kw-loading color="secondary" decorative style="--kw-spinner-size: 1.5em" />
  Enviar
</button>`,

  disabled: `<button kw-button disabled>Button desabilitado</button>
<a kw-button aria-disabled="true">Link desabilitado</a>`,

  link: `<a kw-button href="https://angular.dev" target="_blank" rel="noopener">Abrir angular.dev</a>`,

  custom: `<button kw-button custom>
  <span style="padding: 0.5rem 1.25rem">Padding próprio</span>
</button>`,

  iconSize: `<button kw-button>
  <svg kw-icon-start viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
    <path d="M19 12H5M11 19l-7-7 7-7" />
  </svg>
  Tamanho padrão
</button>
<button kw-button style="--kw-icon-size: 1rem">
  <svg kw-icon-start viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
    <path d="M19 12H5M11 19l-7-7 7-7" />
  </svg>
  Ícone 1rem
</button>`,
} as const;
