import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  booleanAttribute,
  input,
} from '@angular/core';

/**
 * Estilo de tabela sobre o `<table>` nativo. Não tem lógica de dados: o app escreve
 * `thead`, `tbody`, `tr`, `th scope="col"` e `td` normalmente.
 */
@Component({
  selector: 'table[kw-table]',
  template: '<ng-content />',
  styleUrl: './table.css',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'kw-table',
    '[class.kw-table--dense]': 'dense()',
  },
})
export class KwTable {
  /** Reduz o espaçamento das células. */
  readonly dense = input(false, { transform: booleanAttribute });
}

/**
 * Moldura da tabela: borda, raio e fundo do tema, rolagem horizontal e rodapé opcional.
 * Projete o rodapé com o atributo `kw-table-footer`; sem conteúdo nele, o rodapé some.
 */
@Component({
  selector: 'kw-table-container, [kw-table-container]',
  template: `
    <div class="kw-table-container__scroll">
      <ng-content />
    </div>
    <div class="kw-table-container__footer">
      <ng-content select="[kw-table-footer]" />
    </div>
  `,
  styleUrl: './table.css',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'kw-table-container',
  },
})
export class KwTableContainer {}
