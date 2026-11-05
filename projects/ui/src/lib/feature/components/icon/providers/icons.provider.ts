import { InjectionToken, Provider } from '@angular/core';

import { KwIconRegistry } from '../types/icon.types';

/**
 * Token `multi` com os registros de ícones. Cada chamada de `provideKwIcons` adiciona um item;
 * o `KwIcon` une os itens na ordem em que foram informados, e o último vence em nome repetido.
 */
export const KW_ICONS = new InjectionToken<KwIconRegistry[]>('KW_ICONS');

/**
 * Registra os desenhos dos ícones usados pelo app, por nome.
 *
 * Informe só o conteúdo interno do SVG (`'<path d="…"/>'`). O `KwIcon` monta o `<svg>` de 24×24.
 * Registros de injetores diferentes não se somam: vale o registro do injetor mais próximo do
 * componente.
 *
 * @example
 * providers: [provideKwIcons({ search: '<circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/>' })]
 */
export function provideKwIcons(icons: KwIconRegistry): Provider {
  return { provide: KW_ICONS, useValue: icons, multi: true };
}
