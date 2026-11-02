import { Component } from '@angular/core';
import { KwSpinner } from '@kawa-ng/ui';
import { Example } from '../../shared/components/example/example';
import { SPINNER_EXAMPLES } from './spinner.examples';

@Component({
  selector: 'app-spinner-page',
  imports: [KwSpinner, Example],
  templateUrl: './spinner.html',
  styleUrls: ['../../shared/styles/page.css'],
})
export class SpinnerPage {
  protected readonly examples = SPINNER_EXAMPLES;
}
