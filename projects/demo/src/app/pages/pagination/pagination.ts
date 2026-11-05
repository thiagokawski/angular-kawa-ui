import { Component, computed, signal } from '@angular/core';
import { KwPagination, kwPaginationRange } from '@kawa-ng/ui';

import { Example } from '../../shared/components/example/example';
import { PAGINATION_EXAMPLES } from './pagination.examples';

interface RangeCase {
  label: string;
  page: number;
  pageCount: number;
}

@Component({
  selector: 'app-pagination-page',
  templateUrl: './pagination.html',
  imports: [KwPagination, Example],
  styleUrls: ['../../shared/styles/page.css', './pagination.css'],
})
export class PaginationPage {
  protected readonly examples = PAGINATION_EXAMPLES;

  /** Exemplo do critério de aceite: 48 itens, 6 por página. */
  protected readonly page = signal(1);
  protected readonly total = 48;
  protected readonly pageSize = 6;

  /** Muitas páginas, começando no meio. */
  protected readonly manyPage = signal(50);
  protected readonly manyTotal = 1000;

  /** Poucas páginas. */
  protected readonly fewPage = signal(2);
  protected readonly fewTotal = 25;

  /** Casos de kwPaginationRange: início, meio, fim e pageCount pequeno. */
  protected readonly rangeCases: RangeCase[] = [
    { label: 'Início (1 de 100)', page: 1, pageCount: 100 },
    { label: 'Meio (50 de 100)', page: 50, pageCount: 100 },
    { label: 'Fim (100 de 100)', page: 100, pageCount: 100 },
    { label: 'pageCount pequeno (2 de 3)', page: 2, pageCount: 3 },
  ];

  protected readonly rangeResults = computed(() =>
    this.rangeCases.map((item) => ({
      ...item,
      items: kwPaginationRange(item.page, item.pageCount, 1).join(' '),
    })),
  );
}
