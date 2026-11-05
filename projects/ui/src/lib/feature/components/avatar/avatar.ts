import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  computed,
  input,
  signal,
} from '@angular/core';

import { KwAvatarSize } from './types/avatar.types';

/**
 * Avatar circular com foto ou iniciais. Com `src`, mostra a imagem; se ela falhar, volta às iniciais.
 * `name` é obrigatório, porque é o texto alternativo da foto e o rótulo das iniciais.
 */
@Component({
  selector: 'kw-avatar',
  templateUrl: './avatar.html',
  styleUrl: './avatar.css',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class]': '`kw-avatar kw-avatar--${size()}`',
  },
})
export class KwAvatar {
  readonly src = input<string | null>();
  readonly name = input.required<string>();
  readonly initials = input<string>();
  readonly size = input<KwAvatarSize>('md');

  /** Fonte que falhou ao carregar. Ao trocar `src`, a nova tentativa acontece sozinha. */
  private readonly failedSrc = signal<string | null>(null);

  protected readonly showImage = computed(() => {
    const src = this.src();
    return !!src && src !== this.failedSrc();
  });

  protected readonly resolvedInitials = computed(() => {
    const initials = this.initials()?.trim();
    if (initials) return initials;

    return this.name()
      .trim()
      .split(/\s+/)
      .filter(Boolean)
      .slice(0, 2)
      .map((word) => [...word][0])
      .join('')
      .toUpperCase();
  });

  protected onImageError(): void {
    this.failedSrc.set(this.src() ?? null);
  }
}
