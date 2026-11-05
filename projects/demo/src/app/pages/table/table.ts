import { Component } from '@angular/core';
import { KwButton, KwTable, KwTableContainer } from '@kawa-ng/ui';

import { Example } from '../../shared/components/example/example';
import { TABLE_EXAMPLES } from './table.examples';

interface Company {
  readonly name: string;
  readonly city: string;
  readonly users: number;
  readonly document: string;
}

@Component({
  selector: 'app-table-page',
  imports: [Example, KwButton, KwTable, KwTableContainer],
  templateUrl: './table.html',
  styleUrls: ['../../shared/styles/page.css', './table.css'],
})
export class TablePage {
  protected readonly examples = TABLE_EXAMPLES;

  protected readonly companies: readonly Company[] = [
    { name: 'Alfa Comércio', city: 'Curitiba', users: 12, document: '12.345.678/0001-90' },
    { name: 'Beta Serviços', city: 'Londrina', users: 4, document: '23.456.789/0001-01' },
    { name: 'Gama Indústria', city: 'São Paulo', users: 37, document: '34.567.890/0001-12' },
  ];
}
