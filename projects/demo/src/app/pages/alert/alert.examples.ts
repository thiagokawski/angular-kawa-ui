const INFO_ICON = `<svg kw-alert-icon viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
  <circle cx="12" cy="12" r="10" />
  <path d="M12 16v-4M12 8h.01" />
</svg>`;

const ALERT_ICON = `<svg kw-alert-icon viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
  <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3" />
  <path d="M12 9v4M12 17h.01" />
</svg>`;

export const ALERT_EXAMPLES = {
  colors: `<kw-alert color="primary">Primary: novidade disponível.</kw-alert>
<kw-alert color="secondary">Secondary: resumo do pedido.</kw-alert>
<kw-alert color="success">Success: dados salvos com sucesso.</kw-alert>
<kw-alert color="warning">Warning: sua sessão expira em 5 minutos.</kw-alert>
<kw-alert color="danger">Danger: E-mail ou senha incorretos.</kw-alert>
<kw-alert color="info">Info: enviamos um código para o seu e-mail.</kw-alert>`,

  withIconAndTitle: `<kw-alert color="danger">
  ${ALERT_ICON}
  <span kw-alert-title>Não foi possível entrar</span>
  E-mail ou senha incorretos. Confira os dados e tente de novo.
</kw-alert>`,

  optional: `<kw-alert color="info">Só o conteúdo, sem ícone nem título.</kw-alert>
<kw-alert color="info">
  ${INFO_ICON}
  Só o ícone, sem título.
</kw-alert>
<kw-alert color="info">
  <span kw-alert-title>Só o título</span>
  Sem ícone.
</kw-alert>`,

  live: `<kw-alert color="info" live="assertive">Anunciado de forma assertiva, mesmo sendo info.</kw-alert>
<kw-alert color="danger" live="polite">Anunciado de forma educada, mesmo sendo danger.</kw-alert>`,
} as const;
