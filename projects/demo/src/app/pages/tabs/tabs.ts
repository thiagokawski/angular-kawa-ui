import { Component, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { KwTab, KwTabs } from '@kawa-ng/ui';

import { Example } from '../../shared/components/example/example';
import { TABS_EXAMPLES } from './tabs.examples';

@Component({
  selector: 'app-tabs-page',
  templateUrl: './tabs.html',
  imports: [KwTabs, KwTab, Example, RouterLink, RouterLinkActive],
  styleUrls: ['../../shared/styles/page.css', './tabs.css'],
})
export class TabsPage {
  protected readonly examples = TABS_EXAMPLES;

  protected readonly view = signal<'kanban' | 'list'>('kanban');
}
