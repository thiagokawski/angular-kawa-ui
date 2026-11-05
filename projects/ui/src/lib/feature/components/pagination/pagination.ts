import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  computed,
  input,
  model,
} from '@angular/core';

import { KwIconButton } from '../icon-button/icon-button';
import { KwPaginationItem, kwPaginationRange } from './utils/pagination-range';

/**
 * Paginação controlada. `page` é `model`, então `[(page)]` ou `(pageChange)` sincronizam o estado.
 * Sem dados para mais de uma página, não renderiza nada.
 */
@Component({
  selector: 'kw-pagination',
  templateUrl: './pagination.html',
  styleUrl: './pagination.css',
  imports: [KwIconButton],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'kw-pagination',
  },
})
export class KwPagination {
  /** Página atual, a partir de 1. */
  readonly page = model<number>(1);
  readonly total = input.required<number>();
  readonly pageSize = input<number>(10);
  readonly siblings = input<number>(1);
  readonly label = input<string>('Paginação');
  readonly previousLabel = input<string>('Página anterior');
  readonly nextLabel = input<string>('Próxima página');

  protected readonly pageCount = computed(() => {
    const size = this.pageSize();
    if (size <= 0) return 0;
    return Math.max(0, Math.ceil(this.total() / size));
  });

  protected readonly currentPage = computed(() =>
    Math.min(Math.max(this.page(), 1), Math.max(this.pageCount(), 1)),
  );

  protected readonly items = computed<KwPaginationItem[]>(() =>
    kwPaginationRange(this.currentPage(), this.pageCount(), this.siblings()),
  );

  protected goTo(target: number): void {
    const next = Math.min(Math.max(target, 1), this.pageCount());
    if (next === this.currentPage()) return;
    this.page.set(next);
  }
}
