export const DRAWER_EXAMPLES = {
  start: `<button kw-button variant="outline" (click)="startOpen.set(true)">Abrir à esquerda</button>

<kw-drawer label="Navegação" [(open)]="startOpen">
  <nav class="drawer-demo">
    <a href="#" class="drawer-demo__link">Início</a>
    <a href="#" class="drawer-demo__link">Empresas</a>
    <a href="#" class="drawer-demo__link">Relatórios</a>
    <button kw-button variant="outline" (click)="startOpen.set(false)">Fechar</button>
  </nav>
</kw-drawer>`,

  end: `<button kw-button variant="outline" (click)="endOpen.set(true)">Abrir à direita</button>

<kw-drawer label="Filtros" position="end" [(open)]="endOpen">
  <nav class="drawer-demo">
    <a href="#" class="drawer-demo__link">Todos</a>
    <a href="#" class="drawer-demo__link">Ativos</a>
    <a href="#" class="drawer-demo__link">Arquivados</a>
    <button kw-button variant="outline" (click)="endOpen.set(false)">Fechar</button>
  </nav>
</kw-drawer>`,

  ts: `import { Component, signal } from '@angular/core';
import { KwButton, KwDrawer } from '@kawa-ng/ui';

export class DrawerPage {
  protected readonly startOpen = signal(false);
  protected readonly endOpen = signal(false);
}`,
} as const;
