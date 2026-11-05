/** Item da paginação: número de página ou `'…'` para um vão que não é clicável. */
export type KwPaginationItem = number | '…';

/**
 * Calcula as páginas a mostrar. Sempre inclui a primeira e a última página, uma janela de
 * `2 × siblings + 1` páginas em torno da atual (deslocada para não encurtar nas bordas) e
 * preenche com `'…'` os vãos de duas ou mais páginas. Um vão de uma página mostra a página.
 *
 * @param page número da página atual, a partir de 1
 * @param pageCount total de páginas
 * @param siblings páginas de cada lado da atual
 */
export function kwPaginationRange(
  page: number,
  pageCount: number,
  siblings: number,
): KwPaginationItem[] {
  if (pageCount < 1) return [];

  const current = Math.min(Math.max(page, 1), pageCount);
  const windowSize = Math.min(2 * Math.max(siblings, 0) + 1, pageCount);
  const windowStart = Math.min(
    Math.max(current - Math.max(siblings, 0), 1),
    pageCount - windowSize + 1,
  );
  const windowEnd = windowStart + windowSize - 1;

  const visible = new Set<number>([1, pageCount]);
  for (let value = windowStart; value <= windowEnd; value++) visible.add(value);

  const sorted = [...visible].sort((a, b) => a - b);
  const items: KwPaginationItem[] = [];

  sorted.forEach((value, index) => {
    if (index > 0) {
      const gap = value - sorted[index - 1] - 1;
      if (gap === 1) items.push(sorted[index - 1] + 1);
      else if (gap >= 2) items.push('…');
    }
    items.push(value);
  });

  return items;
}
