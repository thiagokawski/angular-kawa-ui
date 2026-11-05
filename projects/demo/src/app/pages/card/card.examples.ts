export const CARD_EXAMPLES = {
  basic: `<kw-card>
  <h2>Entrar</h2>
  <p>Use seu e-mail e senha para continuar.</p>
</kw-card>`,

  asSection: `<section kw-card>
  <h2>Recuperar senha</h2>
  <p>Enviaremos um código para o seu e-mail.</p>
</section>`,

  tokens: `<kw-card style="--kw-card-radius: 1.5rem; --kw-card-padding: 2rem; --kw-card-shadow: 0 8px 24px rgb(0 0 0 / 0.12)">
  <h2>Tokens sobrescritos</h2>
  <p>Raio, padding e sombra vêm dos tokens --kw-card-*.</p>
</kw-card>`,

  appClass: `<kw-card class="card-app">
  <h2>Classe do app</h2>
  <p>Sem !important, a classe do app vence o padrão da lib.</p>
</kw-card>`,
} as const;
