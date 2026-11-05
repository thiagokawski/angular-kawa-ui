export const ICON_REGISTRY_TS = `provideKwIcons({
  search: '<circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/>',
  home: '<path d="M3 10.5 12 3l9 7.5"/><path d="M5 9.5V21h14V9.5"/>',
  check: '<path d="m5 12.5 4.5 4.5L19 7"/>',
  plus: '<path d="M12 5v14M5 12h14"/>',
  bell: '<path d="M18 16V11a6 6 0 0 0-12 0v5l-2 2h16z"/><path d="M10 21h4"/>',
})`;

export const ICON_EXAMPLES = {
  sizes: `<kw-icon name="search" size="sm" />
<kw-icon name="search" size="md" />
<kw-icon name="search" />`,

  color: `<span style="color: var(--kw-color-success)">
  <kw-icon name="check" />
</span>`,

  label: `<kw-icon name="home" label="Início" />
<kw-icon name="home" />`,

  gallery: `<div class="icon-gallery">
  @for (name of names; track name) {
    <div class="icon-gallery__item">
      <kw-icon [name]="name" [label]="name" />
      <span>{{ name }}</span>
    </div>
  }
</div>`,

  strokeWidth: `<div style="display: contents; --kw-icon-stroke-width: 1">
  <kw-icon name="bell" />
</div>
<kw-icon name="bell" />`,
};
