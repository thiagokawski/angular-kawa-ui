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
| `--kw-spacing` | Sim | — | Unidade base de espaçamento |
| `--kw-radius-md` | Sim | — | Raio padrão |
| `--kw-radius-sm` | Não | `md × 0.5` | Raio menor |
| `--kw-radius-lg` | Não | `md × 1.5` | Raio maior |
| `--kw-font-sans` | Sim | — | Fonte dos componentes |
| `--kw-font-mono` | Não | `ui-monospace, monospace` | Fonte monoespaçada |

### Sobrescrevendo estilos

Todos os estilos da lib ficam dentro de `:where()`, com especificidade 0. Qualquer classe do app vence sem `!important`.

## Componentes

Ainda não há componentes publicados.

## Compatibilidade e versões

A versão segue `MAJOR.MINOR.PATCH`: MAJOR = major do Angular, MINOR = features e PATCH = correções. Renomear ou remover um token, input ou seletor é breaking change e só acontece num major.
