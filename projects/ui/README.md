# @kawa-ng/ui

Componentes de UI para Angular 22, configurados só por variáveis CSS, sem exigir Tailwind no app.

## Instalação

```bash
npm i @kawa-ng/ui
```

## Tema

**Opção 1: tema padrão.** No `styles.css` do app:

```css
@import "@kawa-ng/ui/themes/default.css";
```

Para o dark padrão, acrescente o `dark.css` e ative-o com `data-theme="dark"` no `<html>`:

```css
@import "@kawa-ng/ui/themes/default.css";
@import "@kawa-ng/ui/themes/dark.css";
```

```html
<html data-theme="dark">
```

**Opção 2: tema próprio.** Defina os tokens obrigatórios (veja a tabela abaixo) no seu CSS:

```css
:root {
  --kw-color-background: #ffffff;
  --kw-color-surface:    #f4f4f5;
  --kw-color-text:       #18181b;
  --kw-color-text-muted: #71717a;
  --kw-color-border:     #e4e4e7;

  --kw-color-primary: #2563eb;  --kw-color-on-primary: #ffffff;
  /* … secondary, success, warning, danger, info e os on-* de cada uma */

  --kw-spacing:   0.25rem;
  --kw-radius-md: 0.375rem;
  --kw-font-sans: "Inter", sans-serif;
}
```

Um dark próprio pode usar outro mecanismo, por exemplo a preferência do sistema:

```css
@media (prefers-color-scheme: dark) {
  :root {
    --kw-color-background: #09090b;
    --kw-color-text:       #fafafa;
    /* … */
  }
}
```

> O seletor do `dark.css` é `:root[data-theme="dark"]`. Se o app preferir outro mecanismo (classe, `prefers-color-scheme`), não importe o `dark.css` e defina os tokens dark no próprio seletor.

### Tokens

| Token | Obrigatório | Padrão / derivado de | Uso |
|---|---|---|---|
| `--kw-color-background` | Sim | — | Fundo da página |
| `--kw-color-surface` | Sim | — | Fundo de superfícies (cards, campos) |
| `--kw-color-text` | Sim | — | Texto principal |
| `--kw-color-text-muted` | Sim | — | Texto secundário |
| `--kw-color-border` | Sim | — | Bordas neutras |
| `--kw-color-X` (`primary`, `secondary`, `success`, `warning`, `danger`, `info`) | Sim | — | Cor de intenção |
| `--kw-color-on-X` | Sim | — | Texto sobre a cor de intenção |
| `--kw-color-X-hover` | Não | `color-mix(in oklab, X, black 12%)` | Hover das variantes sólidas |
| `--kw-color-X-soft` | Não | `color-mix(in oklab, X 15%, surface)` | Fundos suaves |
| `--kw-color-X-fill` | Não | `var(--kw-color-X)` | `background` do botão sólido. Aceita cor ou degradê (`linear-gradient(...)`); o texto segue `on-X` |
| `--kw-color-X-fill-hover` | Não | `--kw-color-X-hover` (ou `color-mix(in oklab, X, black 12%)`) | `background` do botão sólido no hover. Com degradê, a troca no hover é instantânea |
| `--kw-color-focus` | Não | Cor de intenção do componente (`--kw-color-primary` no input) | Anel de foco de `KwButton` (todas as intenções), `KwInput` e `KwInputGroup`. O input inválido continua com `danger` |
| `--kw-card-radius` | Não | `--kw-radius-lg` | Raio do `KwCard` |
| `--kw-card-padding` | Não | `calc(--kw-spacing × 6)` | Padding interno do `KwCard` |
| `--kw-card-shadow` | Não | `none` | Sombra do `KwCard` (o tema escuro pode deixar sem sombra) |
| `--kw-avatar-background` | Não | `--kw-color-secondary` | Fundo do `KwAvatar` |
| `--kw-avatar-color` | Não | `--kw-color-on-secondary` | Texto (iniciais) do `KwAvatar` |
| `--kw-avatar-border` | Não | `none` | Borda do `KwAvatar` |
| `--kw-avatar-font` | Não | `--kw-font-sans` | Fonte das iniciais do `KwAvatar` |
| `--kw-pagination-active-background` | Não | `--kw-color-primary-soft` | Fundo da página atual do `KwPagination` |
| `--kw-checkbox-border` | Não | `--kw-color-text-muted` | Borda do `KwCheckbox` sem marcação |
| `--kw-checkbox-radius` | Não | `--kw-radius-sm` | Raio do `KwCheckbox` |
| `--kw-radio-border` | Não | `--kw-color-text-muted` | Borda do `KwRadio` sem marcação |
| `--kw-choice-border` | Não | `--kw-color-border` | Borda do `KwChoice` sem seleção |
| `--kw-choice-radius` | Não | `--kw-radius-sm` | Raio do `KwChoice` |
| `--kw-choice-padding` | Não | `calc(--kw-spacing × 4)` | Padding interno do `KwChoice` |
| `--kw-status-dot-size` | Não | `calc(--kw-spacing × 2)` | Diâmetro do ponto do `KwStatus` |
| `--kw-status-gap` | Não | `calc(--kw-spacing × 2)` | Espaço entre o ponto e o rótulo do `KwStatus` |
| `--kw-table-header-background` | Não | `color-mix(in oklab, text 4%, surface)` | Fundo do cabeçalho do `KwTable` |
| `--kw-icon-stroke-width` | Não | `2` | Espessura do traço do `KwIcon` |
| `--kw-badge-ring` | Não | `--kw-color-background` | Anel de 2px ao redor do `KwBadge` |
| `--kw-tooltip-background` | Não | `--kw-color-text` | Fundo do `KwTooltip` |
| `--kw-tooltip-color` | Não | `--kw-color-background` | Texto do `KwTooltip` |
| `--kw-drawer-width` | Não | `280px` (máx. `85vw`) | Largura do `KwDrawer` |
| `--kw-drawer-background` | Não | `--kw-color-surface` | Fundo do `KwDrawer` |
| `--kw-drawer-backdrop` | Não | `color-mix(in oklab, black 55%, transparent)` | Backdrop do `KwDrawer` |
| `--kw-menu-background` | Não | `--kw-color-surface` | Fundo do `KwMenu` |
| `--kw-menu-shadow` | Não | `none` | Sombra do `KwMenu` |
| `--kw-menu-item-hover` | Não | `color-mix(in oklab, surface, text 10%)` | Fundo de hover e foco do `KwMenuItem` |
| `--kw-table-row-hover` | Não | `color-mix(in oklab, text 4%, transparent)` | Fundo da linha do `KwTable` no hover |
| `--kw-spacing` | Sim | — | Unidade base de espaçamento |
| `--kw-radius-md` | Sim | — | Raio padrão |
| `--kw-radius-sm` | Não | `md × 0.5` | Raio menor |
| `--kw-radius-lg` | Não | `md × 1.5` | Raio maior |
| `--kw-font-sans` | Sim | — | Fonte dos componentes |
| `--kw-font-mono` | Não | `ui-monospace, monospace` | Fonte monoespaçada |

### Sobrescrevendo estilos

Todos os estilos da lib ficam dentro de `:where()`, com especificidade 0. Qualquer classe do app vence sem `!important`.

## Componentes

### KwCard

Superfície para agrupar conteúdo. Só projeta o conteúdo; use `<kw-card>` ou o atributo `kw-card` em `section`/`article`.

```html
<kw-card>
  <h2>Entrar</h2>
  <p>Use seu e-mail e senha.</p>
</kw-card>

<section kw-card>…</section>
```

Visual vem de `--kw-color-surface`, `--kw-color-text`, `--kw-color-border` e dos tokens `--kw-card-*` da tabela acima.

### KwAlert

Mensagem de feedback por intenção, no nível do formulário ou da página. Use `kw-alert` com `color` (padrão `info`).

```html
<kw-alert color="danger">
  <svg kw-alert-icon viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">…</svg>
  <span kw-alert-title>Não foi possível entrar</span>
  E-mail ou senha incorretos.
</kw-alert>
```

- `color`: `primary`, `secondary`, `success`, `warning`, `danger` ou `info`. Fundo `--kw-color-X-soft`, borda e ícone na cor da intenção.
- `live`: `assertive` ou `polite`. Padrão: `assertive` para `danger` e `warning`; `polite` para as demais.
- Host com `role="alert"` quando `assertive` e `role="status"` quando `polite`.
- Slots opcionais: `[kw-alert-icon]`, `[kw-alert-title]` e o conteúdo. Sem ícone ou título, o slot não ocupa espaço.

### KwAvatar

Avatar circular com foto ou iniciais. `name` é obrigatório: é o texto alternativo da foto e o nome acessível das iniciais.

```html
<kw-avatar name="Marina Souza" />
<kw-avatar name="Marina Souza" initials="AR" size="lg" />
<kw-avatar name="Marina Souza" [src]="foto" />
```

- `src`: URL da foto. Se o carregamento falhar, o componente mostra as iniciais; ao trocar `src`, tenta de novo.
- `initials`: iniciais fixas. Padrão: primeira letra das duas primeiras palavras de `name`, em maiúsculas.
- `size`: `sm` (32px), `md` (40px, padrão) ou `lg` (48px).
- Não é interativo. Dentro de um botão, o foco é do botão.
- Tokens: `--kw-avatar-background`, `--kw-avatar-color`, `--kw-avatar-border` e `--kw-avatar-font`, na tabela acima.

### KwIconButton

Botão quadrado só de ícone, com tamanho fixo. Use `button[kw-icon-button]` ou `a[kw-icon-button]`. O ícone é um `svg` projetado, e o componente define o tamanho dele.

```html
<button kw-icon-button label="Editar" variant="outline" size="md">
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
    <path d="M12 20h9M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4z" />
  </svg>
</button>
```

- `label`: obrigatório. Vira `aria-label`. Com `label` vazio, o console mostra um aviso em desenvolvimento.
- `color` (padrão `secondary`), `variant` (`solid`, `outline` ou `ghost`, padrão `ghost`), `rounded`, `loading` e desabilitado: mesmo comportamento do `KwButton`, com as mesmas classes de cor e variante.
- `size`: `sm` (32px, ícone 16px), `md` (40px, ícone 20px, padrão) ou `lg` (48px, ícone 24px).
- Usa o `--kw-icon-size` do componente para o spinner do `loading`. Sem token próprio.

### KwPagination

Paginação controlada, com páginas numeradas, reticências e setas anterior/próxima.

```html
<kw-pagination [(page)]="pagina" [total]="total" [pageSize]="6" />
```

- `page`: `model` 1-based. `[(page)]` ou `(pageChange)` sincronizam o estado. Clicar numa página ou seta atualiza o valor e emite `pageChange`.
- `total`: total de itens (obrigatório). `pageSize` (padrão 10) define o número de páginas. Com uma página ou menos, não renderiza nada.
- `siblings` (padrão 1): páginas de cada lado da atual.
- `label` (padrão `Paginação`), `previousLabel` (padrão `Página anterior`) e `nextLabel` (padrão `Próxima página`) são os textos de acessibilidade.
- A página atual tem `aria-current="page"` e o fundo `--kw-pagination-active-background`.
- `kwPaginationRange(page, pageCount, siblings)` é a função pura que calcula os itens (`number` ou `'…'`). Exemplo: `kwPaginationRange(1, 8, 1)` retorna `[1, 2, 3, '…', 8]`.
- Depende de `KwIconButton`, que as setas e as páginas usam.

### KwSelect

Lista de seleção nativa com o visual do `KwInput`. Use `<select kw-select>` com `<option>` normais. A seta é desenhada em CSS e o teclado segue o comportamento do elemento nativo.

Integra com `kw-form-field` (rótulo, dica e erro), com `[formControl]` e com `[formField]` (Signal Forms). Sem `kw-form-field`, use `aria-label`.

```html
<kw-form-field>
  <label kw-label>Perfil</label>
  <select kw-select [formControl]="control">
    <option value="" disabled>Selecione um perfil</option>
    <option value="admin">Administrador</option>
  </select>
</kw-form-field>
```

Entradas: `valid` (`false` força o erro, `true` força o estado válido), `id`.

### KwCheckbox

Checkbox nativo estilizado. O elemento continua sendo `input[type="checkbox"]`: `checked`, `disabled`, `[formControl]` e `[formField]` funcionam sem adaptador. O rótulo fica por conta do app, com `<label>` envolvendo o checkbox ou `for`. Em listas sem rótulo visível, use `aria-label`.

```html
<label>
  <input kw-checkbox type="checkbox" />
  <span>Aceito receber novidades</span>
</label>
```

Entradas: `color` (`primary` por padrão), `valid` (`false` mostra o estado inválido), `indeterminate` (traço de estado misto; o navegador limpa ao clicar, então o app atualiza a entrada depois do `change`).

### KwTextarea

Campo de várias linhas com o visual do `KwInput`. Use `textarea[kw-textarea]`. Altura mínima de três linhas e redimensionamento só na vertical; o atributo `rows` do app continua valendo.

```html
<kw-form-field>
  <label kw-label>Descrição</label>
  <textarea kw-textarea formControlName="descricao" rows="5"></textarea>
  <span kw-hint align="start">Resumo do projeto</span>
  <span kw-hint align="end">58/280</span>
</kw-form-field>
```

- Integra com `kw-form-field` (rótulo, dica e erro), com `[formControl]`, `formControlName` e `[formField]` (Signal Forms), como o `KwInput`.
- `[kw-hint]` aceita `align`: `start` (padrão) ou `end`. Dois hints no mesmo campo ficam na mesma linha, o de `start` à esquerda e o de `end` à direita; os dois ids entram em `aria-describedby`.
- Entradas: `valid` (`false` força o erro, `true` força o estado válido), `id`.

### KwRadio

Radio nativo estilizado. O elemento continua sendo `input[type="radio"]`: `checked`, `disabled`, `formControlName` e `[formField]` funcionam sem adaptador. Os radios de um grupo compartilham o `name` (ou o mesmo controle do form), e a navegação por setas é nativa. O rótulo fica por conta do app.

```html
<div role="radiogroup" aria-labelledby="tipo-titulo">
  <label>
    <input kw-radio type="radio" name="tipo" value="publico" />
    <span>Público</span>
  </label>
  <label>
    <input kw-radio type="radio" name="tipo" value="privado" />
    <span>Privado</span>
  </label>
</div>
```

Entradas: `color` (`primary` por padrão), `valid` (`false` mostra o estado inválido).

### KwChoice

Opção em cartão: `label[kw-choice]` envolve um `kw-radio` (ou `kw-checkbox`) e o texto. Quando o controle interno está marcado, o cartão ganha a borda e o fundo suave da cor de intenção. O foco do teclado aparece em volta do cartão, e o controle interno não mostra o próprio anel.

```html
<div role="radiogroup" aria-labelledby="plano-titulo">
  <label kw-choice>
    <input kw-radio type="radio" name="plano" value="mensal" formControlName="plano" />
    <span>Mensal</span>
  </label>
  <label kw-choice color="success">
    <input kw-radio type="radio" name="plano" value="anual" formControlName="plano" />
    <span>Anual</span>
  </label>
</div>
```

- `color`: `primary` (padrão), `secondary`, `success`, `warning`, `danger` ou `info`. Vale para o destaque do cartão marcado.
- Desabilitado (controle com `disabled`) fica com opacidade reduzida e cursor de bloqueio.
- Tokens: `--kw-choice-border`, `--kw-choice-radius` e `--kw-choice-padding`, na tabela acima. Em cada intenção, o fundo marcado usa `--kw-color-X-soft`.
- O grupo é responsabilidade do app: `role="radiogroup"` com `aria-labelledby`.

### KwTable

Estilo de tabela sobre o `<table>` nativo, sem lógica de dados: o app escreve `thead`, `tbody`, `tr`, `th scope="col"` e `td`.

```html
<kw-table-container>
  <table kw-table>
    <thead>
      <tr>
        <th scope="col">Empresa</th>
        <th scope="col" kw-cell-align="end">Ações</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Alfa Comércio</td>
        <td kw-cell-align="end"><button kw-button variant="ghost">Editar</button></td>
      </tr>
    </tbody>
  </table>
  <div kw-table-footer>1 empresa</div>
</kw-table-container>
```

- `kw-table-container` dá borda, raio e fundo do tema, e rola na horizontal dentro da moldura. O rodapé `[kw-table-footer]` só aparece se houver conteúdo.
- `dense` no `kw-table` reduz o espaçamento das células.
- `kw-cell-align="end"` alinha à direita; `kw-cell-align="center"` centraliza; `kw-cell-muted` deixa o texto secundário.
- A tabela tem `min-width` de 36rem: abaixo disso ela rola dentro do container.

### KwDrawer

Painel lateral modal sobre `<dialog>`. Esc e clique no backdrop fecham; enquanto aberto, o foco fica no painel, o fundo fica inerte e a rolagem da página fica travada. Ao fechar, o foco volta ao elemento que abriu a gaveta.

```html
<button kw-button variant="outline" (click)="aberta.set(true)">Abrir menu</button>

<kw-drawer label="Navegação" [(open)]="aberta">
  <nav>…</nav>
</kw-drawer>
```

- `open`: `[(open)]` sincroniza nos dois sentidos. Padrão `false`.
- `position`: `start` (padrão) ou `end`.
- `label`: obrigatório. Vira o nome acessível do painel.
- `closeOnBackdrop`: fecha ao clicar no backdrop. Padrão `true`.
- `closed`: emitido ao fechar, por qualquer motivo.
- Sem padding interno: o conteúdo decide o espaçamento.

### KwMenu

Menu suspenso ancorado a um botão, com navegação por teclado. Usa `kw-menu` com `button[kwMenuTriggerFor]` e itens `kw-menu-item`.

```html
<kw-menu #menu label="Menu da conta">
  <div kw-menu-header>
    <strong>Ana Lima</strong>
    <span>ana@exemplo.com.br</span>
  </div>
  <button kw-menu-item>Perfil</button>
  <button kw-menu-item color="danger">Sair</button>
</kw-menu>
<button kw-button variant="outline" [kwMenuTriggerFor]="menu">Conta</button>
```

- `kwMenuPosition` (no gatilho): `bottom-end` (padrão) ou `bottom-start`. Se não couber embaixo, abre para cima.
- Teclado: Enter, Espaço ou seta para baixo abrem e focam o primeiro item; setas circulam; Home e End vão ao primeiro e ao último; Esc e Tab fecham; escolher um item fecha.
- `aria-expanded` do gatilho acompanha o estado do menu.
- `kw-menu-item`: `color` (`KwColor`, ex. `danger`) e ícone no slot `kw-icon`.
- Cabeçalho não interativo no slot `[kw-menu-header]`.

### KwIcon

Ícone de traço 24×24. O app registra os desenhos pelo nome com `provideKwIcons` e usa `<kw-icon name="…">`.

```ts
providers: [provideKwIcons({ search: '<circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/>' })]
```

```html
<kw-icon name="search" />
<kw-icon name="search" size="md" label="Pesquisar" />
```

- `provideKwIcons(icons)`: registra o conteúdo interno do SVG (sem a tag `<svg>`) por nome. Chamadas no mesmo injetor somam os registros; em nome repetido, vale a última. Registros de injetores diferentes não se somam: vale o do injetor mais próximo.
- `name`: obrigatório. Nome não registrado não renderiza nada e avisa no console em desenvolvimento.
- `size`: `sm` (16px), `md` (20px) ou `lg` (24px, padrão).
- `label`: texto alternativo (`role="img"`). Sem ele, o ícone é `aria-hidden`.
- Herda `color` do texto pai.
- O conteúdo registrado entra no DOM como HTML confiável. Registre só desenhos do próprio app, nunca dado do usuário.

### KwBadge

Ponto ou contador sobreposto ao canto superior direito de qualquer elemento.

```html
<button kw-icon-button label="Notificações" [kwBadge]="true">
  <kw-icon name="bell" />
</button>
<kw-avatar name="Ana Souza" [kwBadge]="3" kwBadgeLabel="3 notificações não lidas" />
```

- `[kwBadge]`: `true` mostra um ponto; número ou texto mostra um contador; `false`, `null`, `0` e texto vazio ocultam.
- `kwBadgeColor`: cor de intenção (padrão `danger`). `kwBadgeMax`: maior valor exibido (padrão `99`, depois `99+`).
- `kwBadgeLabel`: texto só para leitor de tela.
- A diretiva põe `position: relative` no host. Elementos com `overflow: hidden` cortam o badge.

### KwStatus

Indicador de status: um ponto seguido do rótulo, na mesma cor. Use `kw-status` com o texto projetado. O ponto é decorativo, então o leitor de tela anuncia só o rótulo.

```html
<kw-status color="success">Em andamento</kw-status>
<kw-status color="muted">Pausado</kw-status>
```

- `color`: `neutral` (padrão, texto do tema), `muted` (texto secundário), ou uma cor de intenção (`primary`, `secondary`, `success`, `warning`, `danger`, `info`). O ponto e o rótulo usam a mesma cor.
- Tokens: `--kw-status-dot-size` e `--kw-status-gap`, na tabela acima.

### KwTooltip

Rótulo curto ao lado do elemento, em hover e foco.

```html
<button kw-button kwTooltip="Salvar alterações" kwTooltipPosition="bottom">Salvar</button>
```

- `kwTooltip`: texto (vazio não mostra nada). `kwTooltipPosition`: `top` (padrão), `right`, `bottom` ou `left`.
- `kwTooltipDelay`: atraso do hover em ms (padrão `300`); o foco mostra na hora. `kwTooltipDisabled`: impede a exibição.
- Esconde ao sair do hover, ao perder o foco, ao rolar a página ou com Esc.
- Liga o host por `aria-describedby`, exceto quando o host já tem `aria-label` igual ao texto.

## Compatibilidade e versões

A versão segue `MAJOR.MINOR.PATCH`: MAJOR = major do Angular, MINOR = features e PATCH = correções. Renomear ou remover um token, input ou seletor é breaking change e só acontece num major.
