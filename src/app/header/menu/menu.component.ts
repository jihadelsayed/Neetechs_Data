import { Component, Inject, LOCALE_ID, OnDestroy } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';
import { menu } from 'src/environments/menu';
import menuTranslations from 'src/locale/menu.json';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
})
export class MenuComponent implements OnDestroy {
  readonly currentLang = this.localeId.split('-')[0] || 'en';
  readonly menu = menu;
  readonly menuTranslations: Record<string, Record<string, string>> = menuTranslations;
  currentRoute = '';
  private readonly destroy$ = new Subject<void>();

  constructor(
    @Inject(LOCALE_ID) public readonly localeId: string,
    private readonly router: Router,
  ) {
    this.currentRoute = this.router.url.split('/')[1] || '';
    this.router.events.pipe(
      filter((event): event is NavigationEnd => event instanceof NavigationEnd),
      takeUntil(this.destroy$),
    ).subscribe(event => {
      this.currentRoute = event.urlAfterRedirects.split('/')[1] || '';
    });
  }

  labelFor(title: string): string {
    return this.menuTranslations[this.currentLang]?.[title]
      ?? this.menuTranslations['en']?.[title]
      ?? title;
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
