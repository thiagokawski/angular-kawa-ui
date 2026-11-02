import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class Theme {
  readonly mode = signal<'light' | 'dark'>(
    document.documentElement.dataset['theme'] === 'dark' ? 'dark' : 'light',
  );

  readonly source = signal<'demo' | 'lib'>(
    document.documentElement.dataset['themeSource'] === 'demo' ? 'demo' : 'lib',
  );

  toggleMode(): void {
    const next = this.mode() === 'dark' ? 'light' : 'dark';
    this.mode.set(next);
    document.documentElement.dataset['theme'] = next;
  }

  toggleSource(): void {
    const next = this.source() === 'demo' ? 'lib' : 'demo';
    this.source.set(next);
    if (next === 'demo') {
      document.documentElement.dataset['themeSource'] = 'demo';
    } else {
      delete document.documentElement.dataset['themeSource'];
    }
  }
}
