import { Component, signal } from '@angular/core';
import { KwAvatar, KwBadge, KwButton, KwIcon, KwIconButton, provideKwIcons } from '@kawa-ng/ui';

import { Example } from '../../shared/components/example/example';
import { BADGE_EXAMPLES } from './badge.examples';

@Component({
  selector: 'app-badge-page',
  templateUrl: './badge.html',
  imports: [KwAvatar, KwBadge, KwButton, KwIcon, KwIconButton, Example],
  providers: [
    provideKwIcons({
      bell: '<path d="M18 16V11a6 6 0 0 0-12 0v5l-2 2h16z"/><path d="M10 21h4"/>',
    }),
  ],
  styleUrls: ['../../shared/styles/page.css', './badge.css'],
})
export class BadgePage {
  protected readonly examples = BADGE_EXAMPLES;
  protected readonly colors = [
    'primary',
    'secondary',
    'success',
    'warning',
    'danger',
    'info',
  ] as const;
  protected readonly count = signal(3);

  protected add(): void {
    this.count.update((value) => value + 1);
  }

  protected clear(): void {
    this.count.set(0);
  }
}
