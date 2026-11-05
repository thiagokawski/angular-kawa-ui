import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  computed,
  effect,
  inject,
  input,
  isDevMode,
} from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

import { KW_ICONS } from './providers/icons.provider';
import { KwIconRegistry, KwIconSize } from './types/icon.types';

/**
 * Ícone de traço 24×24 desenhado a partir do registro informado por `provideKwIcons`.
 *
 * O conteúdo registrado vai para o DOM como HTML confiável (`bypassSecurityTrustHtml`), porque
 * vem do código do app (provider), nunca de dado do usuário.
 */
@Component({
  selector: 'kw-icon',
  template: '',
  styleUrl: './icon.css',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'kw-icon',
    '[class]': 'sizeClass()',
    '[attr.role]': 'label() ? "img" : null',
    '[attr.aria-label]': 'label() || null',
    '[attr.aria-hidden]': 'label() ? null : "true"',
    '[innerHTML]': 'markup()',
  },
})
export class KwIcon {
  /** Nome do ícone registrado com `provideKwIcons`. */
  readonly name = input.required<string>();

  /** Tamanho: `sm` (16px), `md` (20px) ou `lg` (24px, padrão). */
  readonly size = input<KwIconSize>('lg');

  /** Texto alternativo. Sem ele, o ícone é decorativo (`aria-hidden`). */
  readonly label = input<string>();

  private readonly sanitizer = inject(DomSanitizer);
  private readonly registry = mergeRegistries(inject(KW_ICONS, { optional: true }));

  protected readonly sizeClass = computed(() => `kw-icon--${this.size()}`);

  protected readonly markup = computed<SafeHtml | null>(() => {
    const name = this.name();
    if (!Object.hasOwn(this.registry, name)) return null;

    const content = this.registry[name];
    return this.sanitizer.bypassSecurityTrustHtml(
      `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${content}</svg>`,
    );
  });

  constructor() {
    effect(() => {
      const name = this.name();
      if (isDevMode() && !Object.hasOwn(this.registry, name)) {
        console.warn(`kw-icon: o ícone "${name}" não está registrado. Use provideKwIcons().`);
      }
    });
  }
}

/** Une os registros na ordem recebida: o último vence em nome repetido. */
function mergeRegistries(registries: KwIconRegistry[] | null): KwIconRegistry {
  const merged: KwIconRegistry = {};
  for (const registry of registries ?? []) {
    Object.assign(merged, registry);
  }
  return merged;
}
