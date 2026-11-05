import { ApplicationRef, Type, createComponent, inject } from '@angular/core';

const loadedByApp = new WeakMap<ApplicationRef, Set<Type<unknown>>>();

/**
 * Garante que os estilos de um componente "portador de estilos" estejam no documento.
 *
 * Diretivas não têm `styleUrl`. Para elas, a lib declara um componente sem template, com
 * `ViewEncapsulation.None`, só para carregar o CSS. Criar esse componente uma vez por aplicação
 * registra os estilos no `<head>`; a instância nunca é anexada à tela nem destruída.
 *
 * Precisa rodar em contexto de injeção (construtor ou inicializador de campo).
 */
export function injectKwStyles(styleHost: Type<unknown>): void {
  const appRef = inject(ApplicationRef);
  let loaded = loadedByApp.get(appRef);

  if (!loaded) {
    loaded = new Set();
    loadedByApp.set(appRef, loaded);
  }

  if (loaded.has(styleHost)) {
    return;
  }

  loaded.add(styleHost);
  createComponent(styleHost, { environmentInjector: appRef.injector });
}
