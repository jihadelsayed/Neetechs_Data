import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

bootstrapAppearance();

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));

function bootstrapAppearance(): void {
  const cookiePreference = document.cookie
    .split(';')
    .map(value => value.trim())
    .find(value => value.startsWith('nt_theme='))
    ?.split('=')[1];
  const preference = cookiePreference === 'light' || cookiePreference === 'dark'
    ? cookiePreference
    : 'system';
  const mediaQuery = window.matchMedia?.('(prefers-color-scheme: dark)');
  const applyResolvedTheme = (systemDark: boolean): void => {
    const resolved = preference === 'system' ? (systemDark ? 'dark' : 'light') : preference;
    document.documentElement.setAttribute('data-nt-theme', resolved);
  };

  applyResolvedTheme(mediaQuery?.matches ?? true);
  document.documentElement.setAttribute('data-nt-theme-preference', preference);

  if (preference === 'system' && mediaQuery) {
    mediaQuery.addEventListener?.('change', event => {
      applyResolvedTheme(event.matches);
    });
  }
}
