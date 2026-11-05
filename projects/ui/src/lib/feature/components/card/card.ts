import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';

/**
 * Superfície para agrupar conteúdo. Use `<kw-card>` ou o atributo `kw-card` em `section`/`article`.
 */
@Component({
  selector: 'kw-card, [kw-card]',
  template: `<ng-content />`,
  styleUrl: './card.css',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'kw-card',
  },
})
export class KwCard {}
