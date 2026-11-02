import { ChangeDetectionStrategy, Component, input, signal } from '@angular/core';

type CopyTarget = 'html' | 'ts';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[attr.title]': 'null',
  },
  selector: 'app-example',
  templateUrl: './example.html',
  styleUrl: './example.css',
})
export class Example {
  readonly title = input.required<string>();
  readonly description = input<string>();
  readonly html = input.required<string>();
  readonly ts = input<string>();

  readonly copied = signal<CopyTarget | null>(null);

  private resetTimer: ReturnType<typeof setTimeout> | undefined;

  async copy(target: CopyTarget, text: string): Promise<void> {
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      return;
    }

    this.copied.set(target);
    clearTimeout(this.resetTimer);
    this.resetTimer = setTimeout(() => this.copied.set(null), 1500);
  }
}
