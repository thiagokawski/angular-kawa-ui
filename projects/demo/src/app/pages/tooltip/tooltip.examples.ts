export const TOOLTIP_EXAMPLES = {
  positions: `<button kw-button variant="outline" kwTooltip="Acima" kwTooltipPosition="top">Top</button>
<button kw-button variant="outline" kwTooltip="À direita" kwTooltipPosition="right">Right</button>
<button kw-button variant="outline" kwTooltip="Abaixo" kwTooltipPosition="bottom">Bottom</button>
<button kw-button variant="outline" kwTooltip="À esquerda" kwTooltipPosition="left">Left</button>`,

  positionsLoop: `@for (position of positions; track position) {
  <button kw-button variant="outline" [kwTooltip]="position" [kwTooltipPosition]="position">
    {{ position }}
  </button>
}`,

  disabled: `<button kw-button [kwTooltip]="'Não aparece'" kwTooltipDisabled>Desabilitado</button>`,

  delay: `<button kw-button [kwTooltip]="'Aparece na hora'" [kwTooltipDelay]="0">Sem atraso</button>`,

  edge: `<button kw-button kwTooltip="Perto da borda" kwTooltipPosition="left">Borda</button>`,
};
