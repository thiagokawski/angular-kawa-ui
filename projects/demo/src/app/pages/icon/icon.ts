import { Component } from '@angular/core';
import { KwIcon, provideKwIcons } from '@kawa-ng/ui';

import { Example } from '../../shared/components/example/example';
import { ICON_EXAMPLES, ICON_REGISTRY_TS } from './icon.examples';

@Component({
  selector: 'app-icon-page',
  templateUrl: './icon.html',
  imports: [KwIcon, Example],
  providers: [
    provideKwIcons({
      search: '<circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/>',
      home: '<path d="M3 10.5 12 3l9 7.5"/><path d="M5 9.5V21h14V9.5"/>',
      check: '<path d="m5 12.5 4.5 4.5L19 7"/>',
      plus: '<path d="M12 5v14M5 12h14"/>',
      bell: '<path d="M18 16V11a6 6 0 0 0-12 0v5l-2 2h16z"/><path d="M10 21h4"/>',
    }),
  ],
  styleUrls: ['../../shared/styles/page.css', './icon.css'],
})
export class IconPage {
  protected readonly examples = ICON_EXAMPLES;
  protected readonly registryTs = ICON_REGISTRY_TS;
  protected readonly names = ['search', 'home', 'check', 'plus', 'bell'] as const;
}
