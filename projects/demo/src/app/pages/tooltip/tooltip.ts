import { Component } from '@angular/core';
import { KwButton, KwTooltip } from '@kawa-ng/ui';

import { Example } from '../../shared/components/example/example';
import { TOOLTIP_EXAMPLES } from './tooltip.examples';

@Component({
  selector: 'app-tooltip-page',
  templateUrl: './tooltip.html',
  imports: [KwButton, KwTooltip, Example],
  styleUrls: ['../../shared/styles/page.css', './tooltip.css'],
})
export class TooltipPage {
  protected readonly examples = TOOLTIP_EXAMPLES;
  protected readonly positions = ['top', 'right', 'bottom', 'left'] as const;
}
