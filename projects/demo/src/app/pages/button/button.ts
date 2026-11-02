import { Component, signal } from '@angular/core';
import { KwButton, KwSpinner } from '@kawa-ng/ui';

import { Example } from '../../shared/components/example/example';
import { BUTTON_EXAMPLES } from './button.examples';

@Component({
  selector: 'app-button-page',
  templateUrl: './button.html',
  imports: [KwButton, KwSpinner, Example],
  styleUrls: ['../../shared/styles/page.css', './button.css'],
})
export class ButtonPage {
  protected readonly examples = BUTTON_EXAMPLES;
  protected readonly colors = [
    'primary',
    'secondary',
    'success',
    'warning',
    'danger',
    'info',
  ] as const;
  protected readonly variants = ['solid', 'outline', 'ghost'] as const;
  protected readonly sending = signal(false);

  protected simulate(): void {
    this.sending.set(true);
    setTimeout(() => this.sending.set(false), 2000);
  }
}
