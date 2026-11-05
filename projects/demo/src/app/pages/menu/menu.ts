import { Component, signal } from '@angular/core';
import { KwButton, KwMenu, KwMenuItem, KwMenuTrigger } from '@kawa-ng/ui';

import { Example } from '../../shared/components/example/example';
import { MENU_EXAMPLES } from './menu.examples';

@Component({
  selector: 'app-menu-page',
  templateUrl: './menu.html',
  imports: [KwButton, KwMenu, KwMenuItem, KwMenuTrigger, Example],
  styleUrls: ['../../shared/styles/page.css', './menu.css'],
})
export class MenuPage {
  protected readonly examples = MENU_EXAMPLES;
  protected readonly lastAction = signal<string | null>(null);

  protected select(item: string): void {
    this.lastAction.set(item);
  }
}
