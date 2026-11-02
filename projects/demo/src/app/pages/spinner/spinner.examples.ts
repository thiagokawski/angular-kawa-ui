export const SPINNER_EXAMPLES = {
  default: `<kw-spinner />`,

  colors: `<kw-spinner color="primary" />
<kw-spinner color="secondary" />
<kw-spinner color="success" />
<kw-spinner color="warning" />
<kw-spinner color="danger" />
<kw-spinner color="info" />`,

  inheritColor: `<span style="color: var(--kw-color-success); display: inline-flex; align-items: center; gap: 0.5rem"><kw-spinner /> Sincronizando</span>`,

  customLabel: `<kw-spinner label="Buscando dados…" />`,

  decorative: `<kw-spinner decorative />`,

  sizes: `<kw-spinner style="--kw-spinner-size: 1rem" />
<kw-spinner style="--kw-spinner-size: 2rem" />
<kw-spinner style="--kw-spinner-size: 3rem" />`,
} as const;
