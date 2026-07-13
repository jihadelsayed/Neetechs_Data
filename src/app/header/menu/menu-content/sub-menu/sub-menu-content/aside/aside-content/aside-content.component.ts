import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { filter, finalize, takeUntil } from 'rxjs/operators';
import {
  MenuService,
  NavigationIntroduction,
} from '../../../../../menu.service';

@Component({
  selector: 'app-aside-content',
  templateUrl: './aside-content.component.html',
  styleUrls: ['./aside-content.component.scss'],
})
export class AsideContentComponent implements OnInit, OnDestroy {
  introduction: NavigationIntroduction | null = null;
  loading = false;
  loadError = false;
  private readonly destroy$ = new Subject<void>();

  constructor(
    private readonly menuService: MenuService,
    private readonly router: Router,
  ) {}

  ngOnInit(): void {
    this.loadContent();
    this.router.events.pipe(
      filter((event): event is NavigationEnd => event instanceof NavigationEnd),
      takeUntil(this.destroy$),
    ).subscribe(() => this.loadContent());
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  loadContent(): void {
    const segments = this.router.url.split('?')[0].split('/').filter(Boolean);

    if (!segments[0] || !segments[1] || !segments[2]) {
      this.introduction = null;
      return;
    }

    this.loading = true;
    this.loadError = false;
    this.menuService.getAside(segments[0], segments[1], segments[2]).pipe(
      finalize(() => {
        this.loading = false;
      }),
    ).subscribe({
      next: response => {
        this.introduction = response.introduction ?? null;
      },
      error: () => {
        this.introduction = null;
        this.loadError = true;
      },
    });
  }
}
