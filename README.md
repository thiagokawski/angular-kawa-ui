# angular-kawa-ui

Monorepo Angular 22 com a biblioteca de componentes `@kawa-ng/ui` e uma aplicação de demonstração.

## Estrutura

```
projects/
├── ui/     # lib @kawa-ng/ui (ng-packagr + Tailwind v4 via PostCSS)
│   └── src/lib/core/theme/
│       ├── default.css, dark.css # tokens --kw-* (publicados em dist/ui/themes)
│       ├── tailwind.css          # @theme mapeando os tokens --kw-* para utilitários
│       └── types/kw-color.ts     # tipo KwColor
└── demo/   # app de demonstração
    └── src/
        ├── themes/               # light.css e dark.css próprios da demo
        └── app/core/theme/       # serviço Theme (modo claro/escuro e origem do tema)
```

## Scripts

| Comando | O que faz |
|---|---|
| `npm run build:ui` | Builda a lib em `dist/ui` |
| `npm run watch` | Builda a lib em modo watch (development) |
| `npm start` | Sobe a demo em `http://localhost:4200/` |
| `npm run build` | Builda a lib e depois a demo |

A demo consome a lib por `dist/ui` (path `@kawa-ng/ui` no `tsconfig.json`) e importa os temas de `dist/ui/themes`. Por isso, rode `npm run build:ui` (ou `npm run watch`) antes do `npm start`.

## Temas

- **Lib:** `default.css` (`:root`) e `dark.css` (`:root[data-theme="dark"]`).
- **Demo:** `light.css` e `dark.css`, aplicados quando o `<html>` tem `data-theme-source="demo"`.
- O serviço `Theme` da demo alterna `data-theme` (claro/escuro) e `data-theme-source` (demo/lib).

Detalhes dos tokens em [`projects/ui/README.md`](projects/ui/README.md).
