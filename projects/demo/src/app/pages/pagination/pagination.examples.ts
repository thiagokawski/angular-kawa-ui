export const PAGINATION_EXAMPLES = {
  few: `<kw-pagination [(page)]="page" [total]="25" [pageSize]="10" />`,

  fewTs: `import { Component, signal } from '@angular/core';

export class PaginationPage {
  protected readonly fewPage = signal(2);
}`,

  start: `<kw-pagination [(page)]="page" [total]="48" [pageSize]="6" />`,

  startTs: `import { Component, signal } from '@angular/core';

export class PaginationPage {
  protected readonly page = signal(1);
}`,

  many: `<kw-pagination [(page)]="manyPage" [total]="1000" [pageSize]="10" />`,

  manyTs: `import { Component, signal } from '@angular/core';

export class PaginationPage {
  protected readonly manyPage = signal(50);
}`,

  range: `import { kwPaginationRange } from '@kawa-ng/ui';

kwPaginationRange(1, 100, 1); // [1, 2, 3, '…', 100]
kwPaginationRange(50, 100, 1); // [1, '…', 49, 50, 51, '…', 100]
kwPaginationRange(100, 100, 1); // [1, '…', 98, 99, 100]
kwPaginationRange(2, 3, 1); // [1, 2, 3]`,

  rangeTs: `import { kwPaginationRange } from '@kawa-ng/ui';

protected readonly rangeResults = computed(() =>
  this.rangeCases.map((item) => ({
    ...item,
    items: kwPaginationRange(item.page, item.pageCount, 1).join(' '),
  })),
);`,
};
