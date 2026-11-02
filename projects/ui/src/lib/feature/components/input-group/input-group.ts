import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'kw-input-group',
  template: `<ng-content select="[kw-prefix]" /><ng-content /><ng-content select="[kw-suffix]" />`,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'kw-input-group',
  },
})
export class KwInputGroup {}
