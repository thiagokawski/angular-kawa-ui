---
id: 01
titulo: KwTabs na @kawa-ng/ui e reinstalação no sysnow_web
status: pendente
depende_de: []
onda: 1
modelo: sonnet
---

# 01 — KwTabs na @kawa-ng/ui e reinstalação

## Contexto
A `@kawa-ng/ui` é uma lib Angular 22 genérica (sem marca) em
`/home/kawski/Workspace/Kawski/angular-kawa-ui` (projeto `ui` + app `demo`). Ela não tem componente
de abas, e o `sysnow_web` precisa de abas para: (a) alternar as seções de configuração do quadro
(links de rota) e (b) alternar as visões Kanban/Lista (botões). Pela regra 6 do
`sysnow_web/CLAUDE.md`, componente faltante é criado na lib, genérico, e reinstalado no app.

Convenções da lib (imite `projects/ui/src/lib/feature/components/pagination/pagination.ts` e
`.../status/status.ts`):
- Componentes standalone, `ChangeDetectionStrategy.OnPush`, `ViewEncapsulation.None`, classe BEM no
  `host` (`kw-pagination`, `kw-pagination__list`), signals `input()`.
- CSS com seletores `:where(.kw-...)` (especificidade 0) e somente tokens `--kw-*`, com fallback
  documentado no topo do arquivo (ex.: `/* Token opcional: --kw-pagination-active-background ... */`).
- Comentários/JSDoc em pt-BR.
- Exportado em `projects/ui/src/public-api.ts`; tokens novos documentados na tabela "Tokens" de
  `projects/ui/README.md` e uma seção do componente no README.
- Demo: cada componente tem página em `projects/demo/src/app/pages/<nome>/` (imite
  `pages/pagination/`: `pagination.ts`, `pagination.html`, `pagination.css`, `pagination.examples.ts`,
  usando o componente `Example` de `../../shared/components/example/example` e
  `styleUrls: ['../../shared/styles/page.css', ...]`), rota em `projects/demo/src/app/app.routes.ts`
  e item em `projects/demo/src/app/core/layout/components/sidenav/sidenav.ts`
  (`{ label: 'Pagination', path: '/pagination' }`).
- A lib não tem testes unitários; o aceite é o build.

No `sysnow_web`, `libs/design/src/kawa-ui.css` faz a ponte dos tokens SYSNOW para `--kw-*`
(somente `var()`, nada literal).

## Objetivo
Criar `KwTabs` (contêiner) e `KwTab` (item) genéricos e acessíveis, servindo tanto para navegação
por links (`<a>` com `routerLink`) quanto para alternância por botões, e reinstalar a lib no
`sysnow_web`.

## Arquivos afetados
| Arquivo | Ação | Motivo |
|---|---|---|
| `/home/kawski/Workspace/Kawski/angular-kawa-ui/.specs/01-kw-tabs.md` | criar | Registro da spec na lib (regra 6): copiar este arquivo |
| `/home/kawski/Workspace/Kawski/angular-kawa-ui/projects/ui/src/lib/feature/components/tabs/tabs.ts` | criar | Contêiner `KwTabs` |
| `/home/kawski/Workspace/Kawski/angular-kawa-ui/projects/ui/src/lib/feature/components/tabs/tab.ts` | criar | Item `KwTab` |
| `/home/kawski/Workspace/Kawski/angular-kawa-ui/projects/ui/src/lib/feature/components/tabs/tabs.css` | criar | Estilos |
| `/home/kawski/Workspace/Kawski/angular-kawa-ui/projects/ui/src/public-api.ts` | alterar | Exportar `KwTabs`, `KwTab` |
| `/home/kawski/Workspace/Kawski/angular-kawa-ui/projects/ui/README.md` | alterar | Seção do componente + tokens |
| `/home/kawski/Workspace/Kawski/angular-kawa-ui/projects/demo/src/app/pages/tabs/tabs.ts` | criar | Página demo |
| `/home/kawski/Workspace/Kawski/angular-kawa-ui/projects/demo/src/app/pages/tabs/tabs.html` | criar | Página demo |
| `/home/kawski/Workspace/Kawski/angular-kawa-ui/projects/demo/src/app/pages/tabs/tabs.css` | criar | Página demo |
| `/home/kawski/Workspace/Kawski/angular-kawa-ui/projects/demo/src/app/pages/tabs/tabs.examples.ts` | criar | Snippets da demo |
| `/home/kawski/Workspace/Kawski/angular-kawa-ui/projects/demo/src/app/app.routes.ts` | alterar | Rota `tabs` |
| `/home/kawski/Workspace/Kawski/angular-kawa-ui/projects/demo/src/app/core/layout/components/sidenav/sidenav.ts` | alterar | Item "Tabs" |
| `sysnow_web/.local-packages/kawa-ng-ui-*.tgz` | alterar | Gerado pelo `kawa-ui:install` |
| `sysnow_web/package.json` | alterar | Gerado pelo `kawa-ui:install` (se mudar) |
| `sysnow_web/package-lock.json` | alterar | Gerado pelo `kawa-ui:install` |
| `sysnow_web/libs/design/src/kawa-ui.css` | alterar | Ponte dos tokens de abas |

Somente estes arquivos podem ser modificados.

## Como será implementado
- `KwTabs`: componente, selector `kw-tabs, nav[kw-tabs], div[kw-tabs]`, template
  `<ng-content />`, `host: { class: 'kw-tabs' }`. Input `label = input<string>()` → `[attr.aria-label]`.
  Não usa `role="tablist"`: o padrão ARIA de tablist exige painéis controlados e setas; aqui o caso
  de uso é navegação/alternância, então a semântica vem do item (`aria-current` / `aria-pressed`).
- `KwTab`: diretiva (ou componente com `<ng-content />`), selector `a[kw-tab], button[kw-tab]`,
  `host: { class: 'kw-tab', '[class.kw-tab--active]': 'active()' }`. Input
  `active = input(false, { transform: booleanAttribute })`.
  - Em `<a>`: `[attr.aria-current]` = `'page'` quando ativo, senão `null`.
  - Em `<button>`: `[attr.aria-pressed]` = `'true'|'false'`; `type="button"` se não informado
    (via `[attr.type]` lendo o atributo do host com `HostAttributeToken('type')`, padrão `'button'`).
  - Detectar a tag com `inject(ElementRef).nativeElement.tagName`.
  - Ícone opcional projetado antes do texto (`<kw-icon>` do consumidor): o CSS só alinha com `gap`.
- CSS (`tabs.css`), tokens opcionais documentados no topo:
  - `.kw-tabs`: `display:flex; gap: calc(var(--kw-spacing)*1); border-bottom: 1px solid var(--kw-tabs-border, var(--kw-color-border)); overflow-x:auto;`.
  - `.kw-tab`: `display:inline-flex; align-items:center; gap: calc(var(--kw-spacing)*2);
    padding: calc(var(--kw-spacing)*3) calc(var(--kw-spacing)*4); font-family: var(--kw-tabs-font, var(--kw-font-sans));
    color: var(--kw-color-text-muted); background:none; border:0; border-bottom:2px solid transparent;
    margin-bottom:-1px; text-decoration:none; cursor:pointer; white-space:nowrap;`.
  - hover: `color: var(--kw-color-text)`.
  - `.kw-tab--active`: `color: var(--kw-color-text); border-bottom-color: var(--kw-tabs-indicator, var(--kw-color-primary));`.
  - `:focus-visible`: `outline: 2px solid var(--kw-color-focus, var(--kw-color-primary)); outline-offset: 2px;`
    (mesmo anel do `KwButton`; confira `button.css` e imite).
  - `[aria-disabled='true']`/`:disabled`: `opacity:.5; cursor:not-allowed`.
- O CSS é carregado pelo `styleUrl` do `KwTabs`. Como `KwTab` pode ser usado sem que o CSS esteja
  presente se o consumidor importar só o `KwTab`, coloque o `styleUrl` em **ambos** (ou siga o padrão
  `kw-badge-styles`/`kw-tooltip-styles` da lib se preferir; veja `badge/badge.ts`).
- Reinstalação no app (após `npx ng build ui` passar):
  `cd /home/kawski/Workspace/Sysnow/sysnow_web && source ~/.nvm/nvm.sh && KAWA_UI_DIR=/home/kawski/Workspace/Kawski/angular-kawa-ui npm run kawa-ui:install`.
- Em `libs/design/src/kawa-ui.css`, dentro de `:root`, adicionar bloco "Abas":
  `--kw-tabs-indicator: var(--destaque);` e `--kw-tabs-font: var(--font-subtitulo);` (Oxanium para
  rótulos, regra de tipografia do DS).

## O que será implementado
- [ ] `tabs.ts`: `export class KwTabs` (input `label`).
- [ ] `tab.ts`: `export class KwTab` (input `active`; `aria-current` em `<a>`, `aria-pressed` e
      `type="button"` padrão em `<button>`).
- [ ] `tabs.css` com os tokens opcionais `--kw-tabs-border`, `--kw-tabs-indicator`, `--kw-tabs-font`.
- [ ] `public-api.ts`: `export { KwTabs } from './lib/feature/components/tabs/tabs';` e
      `export { KwTab } from './lib/feature/components/tabs/tab';`.
- [ ] README: seção "Tabs" (uso com links e com botões, acessibilidade) e 3 linhas na tabela de tokens.
- [ ] Demo `/tabs` com dois exemplos: botões alternando um signal; links com `routerLink` +
      `routerLinkActive` (`#rla="routerLinkActive"` e `[active]="rla.isActive"`) — use rotas âncora
      fictícias como `['/tabs']` com `queryParams` diferentes, ou apenas botões se o roteamento
      complicar.
- [ ] Copiar este arquivo para `/home/kawski/Workspace/Kawski/angular-kawa-ui/.specs/01-kw-tabs.md`.
- [ ] Rodar o `kawa-ui:install` e adicionar o bloco de tokens em `kawa-ui.css`.

Exemplo de uso esperado no app:
```html
<nav kw-tabs label="Seções da configuração">
  <a kw-tab routerLink="status" routerLinkActive #a="routerLinkActive" [active]="a.isActive">Status</a>
</nav>
<div kw-tabs label="Visão">
  <button kw-tab [active]="view() === 'kanban'" (click)="setView('kanban')">Kanban</button>
</div>
```

## Resultados esperados
- [ ] `cd /home/kawski/Workspace/Kawski/angular-kawa-ui && source ~/.nvm/nvm.sh && npx ng build ui` → sucesso.
- [ ] `npx ng build demo` (mesmo diretório) → sucesso.
- [ ] `grep -c "KwTab" /home/kawski/Workspace/Sysnow/sysnow_web/node_modules/@kawa-ng/ui/index.d.ts` (ou o `.d.ts` principal do pacote, `ls node_modules/@kawa-ng/ui`) → ≥ 2.
- [ ] `cd /home/kawski/Workspace/Sysnow/sysnow_web && npm run build` → sucesso.
- [ ] `/home/kawski/Workspace/Kawski/angular-kawa-ui/.specs/01-kw-tabs.md` existe.
