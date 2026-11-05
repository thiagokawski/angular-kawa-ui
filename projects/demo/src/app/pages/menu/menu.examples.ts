export const MENU_EXAMPLES = {
  user: `<kw-menu #userMenu label="Menu da conta">
  <div kw-menu-header>
    <strong>Ana Lima</strong>
    <span>ana@exemplo.com.br</span>
  </div>
  <button kw-menu-item (click)="select('Perfil')">Perfil</button>
  <button kw-menu-item (click)="select('Configurações')">Configurações</button>
  <button kw-menu-item color="danger" (click)="select('Sair')">Sair</button>
</kw-menu>
<button kw-button variant="outline" [kwMenuTriggerFor]="userMenu">Conta</button>`,

  start: `<kw-menu #actionsMenu label="Ações">
  <button kw-menu-item (click)="select('Editar')">Editar</button>
  <button kw-menu-item (click)="select('Duplicar')">Duplicar</button>
  <button kw-menu-item color="danger" (click)="select('Arquivar')">Arquivar</button>
</kw-menu>
<button kw-button variant="outline" kwMenuPosition="bottom-start" [kwMenuTriggerFor]="actionsMenu">
  Ações
</button>`,

  ts: `import { Component, signal } from '@angular/core';
import { KwButton, KwMenu, KwMenuItem, KwMenuTrigger } from '@kawa-ng/ui';

export class MenuPage {
  protected readonly lastAction = signal<string | null>(null);

  protected select(item: string): void {
    this.lastAction.set(item);
  }
}`,
} as const;
