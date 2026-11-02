import { Component, inject } from '@angular/core';
import { Theme } from '../../../theme/theme';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.html',
  styleUrl: './topbar.css',
})
export class Topbar {
  protected readonly theme = inject(Theme);
}
