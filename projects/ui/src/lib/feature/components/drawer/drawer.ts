import {
  ChangeDetectionStrategy,
  Component,
  DOCUMENT,
  DestroyRef,
  ElementRef,
  ViewEncapsulation,
  booleanAttribute,
  effect,
  inject,
  input,
  model,
  output,
  untracked,
  viewChild,
} from '@angular/core';

import { KwDrawerPosition } from './types/drawer.types';

const FOCUSABLE =
  'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), ' +
  'textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

/**
 * Painel lateral modal sobre `<dialog>` com `showModal()`. Esc e clique no backdrop fecham a gaveta,
 * o foco entra no conteúdo ao abrir e volta ao elemento que tinha o foco antes. Enquanto aberta,
 * a rolagem do `body` fica travada.
 */
@Component({
  selector: 'kw-drawer',
  templateUrl: './drawer.html',
  styleUrl: './drawer.css',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class]': '`kw-drawer kw-drawer--${position()}`',
  },
})
export class KwDrawer {
  /** Estado aberto da gaveta; `[(open)]` sincroniza nos dois sentidos. */
  readonly open = model(false);
  readonly position = input<KwDrawerPosition>('start');
  /** Nome acessível do painel (`aria-label` do dialog). */
  readonly label = input.required<string>();
  /** Fecha ao clicar fora do painel, no backdrop. */
  readonly closeOnBackdrop = input(true, { transform: booleanAttribute });
  /** Emitido ao fechar, por qualquer motivo (Esc, backdrop, `open` falso ou ação do conteúdo). */
  readonly closed = output<void>();

  private readonly panel = viewChild<ElementRef<HTMLDialogElement>>('panel');
  private readonly document = inject(DOCUMENT);
  private previousFocus: HTMLElement | null = null;
  private previousOverflow = '';
  private scrollLocked = false;

  constructor() {
    effect(() => {
      const open = this.open();
      const dialog = this.panel()?.nativeElement;
      if (!dialog) return;

      untracked(() => (open ? this.show(dialog) : this.hide(dialog)));
    });

    inject(DestroyRef).onDestroy(() => {
      this.unlockScroll();
      this.previousFocus?.focus();
      this.previousFocus = null;
    });
  }

  /** Esc: o evento `cancel` é tratado pelo model, sem deixar o dialog fechar por conta própria. */
  protected onCancel(event: Event): void {
    event.preventDefault();
    this.open.set(false);
    this.hide(event.target as HTMLDialogElement);
  }

  /** Clique cujo alvo é o próprio dialog cai no backdrop (o painel ocupa toda a altura). */
  protected onBackdropClick(event: MouseEvent): void {
    if (!this.closeOnBackdrop() || event.target !== event.currentTarget) return;

    this.open.set(false);
    this.hide(event.currentTarget as HTMLDialogElement);
  }

  /** Único ponto de saída: roda para qualquer fechamento nativo do dialog. */
  protected onClose(): void {
    this.unlockScroll();
    this.previousFocus?.focus();
    this.previousFocus = null;

    if (this.open()) this.open.set(false);
    this.closed.emit();
  }

  private show(dialog: HTMLDialogElement): void {
    if (dialog.open) return;

    const active = this.document.activeElement;
    this.previousFocus = active instanceof HTMLElement ? active : null;
    this.lockScroll();
    dialog.showModal();
    (dialog.querySelector<HTMLElement>(FOCUSABLE) ?? dialog).focus();
  }

  private hide(dialog: HTMLDialogElement): void {
    if (dialog.open) dialog.close();
  }

  private lockScroll(): void {
    if (this.scrollLocked) return;

    this.previousOverflow = this.document.body.style.overflow;
    this.document.body.style.overflow = 'hidden';
    this.scrollLocked = true;
  }

  private unlockScroll(): void {
    if (!this.scrollLocked) return;

    this.document.body.style.overflow = this.previousOverflow;
    this.scrollLocked = false;
  }
}
