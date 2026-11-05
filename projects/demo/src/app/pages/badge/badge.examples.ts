export const BADGE_EXAMPLES = {
  dot: `<button kw-icon-button label="Notificações" [kwBadge]="true">
  <kw-icon name="bell" />
</button>`,

  counter: `<span class="target" [kwBadge]="3">Caixa</span>
<span class="target" [kwBadge]="120">Caixa</span>
<span class="target" [kwBadge]="0">Caixa</span>`,

  max: `<span class="target" [kwBadge]="9" [kwBadgeMax]="9">9+</span>`,

  colors: `<span class="target" [kwBadge]="3" kwBadgeColor="primary">Primary</span>
<span class="target" [kwBadge]="3" kwBadgeColor="success">Success</span>`,

  label: `<kw-avatar name="Ana Souza" [kwBadge]="3" kwBadgeLabel="3 notificações não lidas" />`,

  dynamic: `<button kw-button (click)="add()">Adicionar</button>
<button kw-button variant="outline" (click)="clear()">Limpar</button>
<span class="target" [kwBadge]="count()">Caixa</span>`,
};
