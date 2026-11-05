export const TABLE_EXAMPLES = {
  simpleHtml: `<kw-table-container>
  <table kw-table>
    <thead>
      <tr>
        <th scope="col">Empresa</th>
        <th scope="col">Cidade</th>
        <th scope="col">Usuários</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Alfa Comércio</td>
        <td>Curitiba</td>
        <td>12</td>
      </tr>
    </tbody>
  </table>
</kw-table-container>`,

  actionsHtml: `<kw-table-container>
  <table kw-table>
    <thead>
      <tr>
        <th scope="col">Empresa</th>
        <th scope="col">Documento</th>
        <th scope="col" kw-cell-align="end">Ações</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Alfa Comércio</td>
        <td kw-cell-muted>12.345.678/0001-90</td>
        <td kw-cell-align="end">
          <button kw-button type="button" variant="ghost">Editar</button>
        </td>
      </tr>
    </tbody>
  </table>
</kw-table-container>`,

  footerHtml: `<kw-table-container>
  <table kw-table>
    <!-- cabeçalho e linhas -->
  </table>
  <div kw-table-footer>3 empresas</div>
</kw-table-container>`,

  denseHtml: `<kw-table-container>
  <table kw-table dense>
    <!-- cabeçalho e linhas -->
  </table>
</kw-table-container>`,

  scrollHtml: `<kw-table-container>
  <table kw-table>
    <!-- muitas colunas: a rolagem fica dentro do container -->
  </table>
</kw-table-container>`,
} as const;
