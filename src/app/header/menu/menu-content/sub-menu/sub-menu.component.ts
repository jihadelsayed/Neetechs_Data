import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { filter, finalize, takeUntil } from 'rxjs/operators';
import {
  MenuService,
  NavigationIntroduction,
  NavigationItem,
} from '../../menu.service';

@Component({
  selector: 'app-sub-menu',
  templateUrl: './sub-menu.component.html',
  styleUrls: ['./sub-menu.component.scss'],
})
export class SubMenuComponent implements OnInit, OnDestroy {
  currentRoute = '';
  menu: NavigationItem[] = [];
  introduction: NavigationIntroduction | null = null;
  loading = false;
  loadError = false;
  private readonly destroy$ = new Subject<void>();

  constructor(
    private readonly menuService: MenuService,
    private readonly router: Router,
  ) {}

  ngOnInit(): void {
    this.loadMenu();
    this.router.events.pipe(
      filter((event): event is NavigationEnd => event instanceof NavigationEnd),
      takeUntil(this.destroy$),
    ).subscribe(() => this.loadMenu());
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  loadMenu(): void {
    const segments = this.routeSegments();
    this.currentRoute = segments[1] || '';

    if (!segments[0]) {
      this.menu = [];
      this.introduction = null;
      return;
    }

    this.loading = true;
    this.loadError = false;
    this.menuService.getMenu(segments[0]).pipe(
      finalize(() => {
        this.loading = false;
      }),
    ).subscribe({
      next: response => {
        this.menu = response.data ?? [];
        this.introduction = response.introduction ?? null;
      },
      error: () => {
        this.menu = [];
        this.introduction = null;
        this.loadError = true;
      },
    });
  }

  private routeSegments(): string[] {
    return this.router.url.split('?')[0].split('/').filter(Boolean);
  }
}
