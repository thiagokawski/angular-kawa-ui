import { Component } from '@angular/core';
import { KwAlert } from '@kawa-ng/ui';

import { Example } from '../../shared/components/example/example';
import { ALERT_EXAMPLES } from './alert.examples';

@Component({
  selector: 'app-alert-page',
  templateUrl: './alert.html',
  imports: [KwAlert, Example],
  styleUrls: ['../../shared/styles/page.css', './alert.css'],
})
export class AlertPage {
  protected readonly examples = ALERT_EXAMPLES;
}
