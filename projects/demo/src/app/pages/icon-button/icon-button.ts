import { Component, signal } from '@angular/core';
import { KwIconButton, KwIconButtonSize } from '@kawa-ng/ui';

import { Example } from '../../shared/components/example/example';
import { ICON_BUTTON_EXAMPLES } from './icon-button.examples';

@Component({
  selector: 'app-icon-button-page',
  templateUrl: './icon-button.html',
  imports: [KwIconButton, Example],
  styleUrls: ['../../shared/styles/page.css'],
})
export class IconButtonPage {
  protected readonly examples = ICON_BUTTON_EXAMPLES;
  protected readonly variants = ['solid', 'outline', 'ghost'] as const;
  protected readonly sizes: KwIconButtonSize[] = ['sm', 'md', 'lg'];
  protected readonly colors = [
    'primary',
    'secondary',
    'success',
    'warning',
    'danger',
    'info',
  ] as const;
  protected readonly saving = signal(false);

  protected simulate(): void {
    this.saving.set(true);
    setTimeout(() => this.saving.set(false), 2000);
  }
}
