import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  ViewEncapsulation,
  input,
  viewChild,
} from '@angular/core';

let nextMenuId = 0;

/**
 * Menu suspenso sobre a Popover API (`popover="auto"`): camada superior, Esc e clique fora fecham.
 * O gatilho é um `button[kwMenuTriggerFor]`; os itens são `[kw-menu-item]`. O cabeçalho não
 * interativo vai no slot `[kw-menu-header]`.
 */
@Component({
  selector: 'kw-menu',
  templateUrl: './menu.html',
  styleUrl: './menu.css',
  exportAs: 'kwMenu',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'kw-menu',
  },
})
export class KwMenu {
  /** Nome acessível do menu (`aria-label`). */
  readonly label = input<string>();

  /** Elemento com `popover`, usado pelo `KwMenuTrigger` para abrir, fechar e posicionar. */
  readonly panel = viewChild.required<ElementRef<HTMLElement>>('panel');

  /** Id do painel, referenciado pelo `aria-controls` do gatilho. */
  readonly panelId = `kw-menu-${++nextMenuId}`;
}
