import { Component } from '@angular/core';
import { KwCard } from '@kawa-ng/ui';

import { Example } from '../../shared/components/example/example';
import { CARD_EXAMPLES } from './card.examples';

@Component({
  selector: 'app-card-page',
  templateUrl: './card.html',
  imports: [KwCard, Example],
  styleUrls: ['../../shared/styles/page.css', './card.css'],
})
export class CardPage {
  protected readonly examples = CARD_EXAMPLES;
}
