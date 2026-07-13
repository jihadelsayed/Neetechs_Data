import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-selection-loader',
  template: `
    <span
      class="nt-skeleton nt-skeleton--shimmer"
      [class.nt-skeleton--circle]="circle"
      [ngStyle]="styles"
      aria-hidden="true"
    ></span>
  `,
  styleUrls: ['./selection-loader.component.css'],
})
export class SelectionLoaderComponent {
  @Input() Cwidth = '100%';
  @Input() Cheight = '1rem';
  @Input() circle = false;

  get styles(): Record<string, string> {
    return {
      width: this.Cwidth,
      height: this.Cheight,
    };
  }
}
