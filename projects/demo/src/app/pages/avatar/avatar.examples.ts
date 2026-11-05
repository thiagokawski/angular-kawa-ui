export const AVATAR_EXAMPLES = {
  sizes: `<kw-avatar name="Marina Souza" size="sm" />
<kw-avatar name="Marina Souza" size="md" />
<kw-avatar name="Marina Souza" size="lg" />`,

  initials: `<kw-avatar name="Marina Souza" />
<kw-avatar name="Ana" />
<kw-avatar name="Carlos Eduardo Lima" />
<kw-avatar name="Marina Souza" initials="AR" />`,

  photo: `<kw-avatar name="Marina Souza" [src]="foto" />
<kw-avatar name="Marina Souza" [src]="foto" size="lg" />`,

  broken: `<kw-avatar name="Marina Souza" [src]="fotoInexistente" />`,
};
