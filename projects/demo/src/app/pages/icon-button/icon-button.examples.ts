export const ICON_BUTTON_EXAMPLES = {
  variants: `<button kw-icon-button variant="solid" label="Editar">…</button>
<button kw-icon-button variant="outline" label="Editar">…</button>
<button kw-icon-button variant="ghost" label="Editar">…</button>`,

  sizes: `<button kw-icon-button size="sm" label="Adicionar">…</button>
<button kw-icon-button size="md" label="Adicionar">…</button>
<button kw-icon-button size="lg" label="Adicionar">…</button>`,

  colors: `<button kw-icon-button variant="solid" color="primary" label="Remover">…</button>
<button kw-icon-button variant="solid" color="secondary" label="Remover">…</button>
<button kw-icon-button variant="solid" color="danger" label="Remover">…</button>`,

  rounded: `<button kw-icon-button rounded variant="solid" label="Adicionar">…</button>`,

  loading: `<button kw-icon-button variant="outline" loading label="Salvando"></button>
<button kw-icon-button variant="outline" [loading]="saving()" (click)="simulate()" label="Salvar">…</button>`,

  loadingTs: `import { Component, signal } from '@angular/core';

export class IconButtonPage {
  protected readonly saving = signal(false);

  protected simulate(): void {
    this.saving.set(true);
    setTimeout(() => this.saving.set(false), 2000);
  }
}`,

  disabled: `<button kw-icon-button disabled label="Excluir">…</button>
<a kw-icon-button aria-disabled="true" label="Abrir">…</a>`,

  link: `<a kw-icon-button href="https://angular.dev" target="_blank" rel="noopener" label="Abrir angular.dev">…</a>`,
};
