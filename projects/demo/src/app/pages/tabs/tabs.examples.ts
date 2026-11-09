export const TABS_EXAMPLES = {
  buttons: `<div kw-tabs label="Visão">
  <button kw-tab [active]="view() === 'kanban'" (click)="view.set('kanban')">Kanban</button>
  <button kw-tab [active]="view() === 'list'" (click)="view.set('list')">Lista</button>
</div>`,

  buttonsTs: `import { Component, signal } from '@angular/core';
import { KwTab, KwTabs } from '@kawa-ng/ui';

export class TabsPage {
  protected readonly view = signal<'kanban' | 'list'>('kanban');
}`,

  links: `<nav kw-tabs label="Seções">
  <a kw-tab routerLink="status" routerLinkActive #a="routerLinkActive" [active]="a.isActive">Status</a>
  <a kw-tab routerLink="membros" routerLinkActive #b="routerLinkActive" [active]="b.isActive">Membros</a>
</nav>`,
};
