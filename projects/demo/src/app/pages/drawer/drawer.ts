import { Component, signal } from '@angular/core';
import { KwButton, KwDrawer } from '@kawa-ng/ui';

import { Example } from '../../shared/components/example/example';
import { DRAWER_EXAMPLES } from './drawer.examples';

@Component({
  selector: 'app-drawer-page',
  templateUrl: './drawer.html',
  imports: [KwButton, KwDrawer, Example],
  styleUrls: ['../../shared/styles/page.css', './drawer.css'],
})
export class DrawerPage {
  protected readonly examples = DRAWER_EXAMPLES;
  protected readonly startOpen = signal(false);
  protected readonly endOpen = signal(false);
}
