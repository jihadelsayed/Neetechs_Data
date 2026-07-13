import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { filter, finalize, takeUntil } from 'rxjs/operators';
import {
  MenuService,
  NavigationIntroduction,
  NavigationItem,
} from '../../../../menu.service';

@Component({
  selector: 'app-aside',
  templateUrl: './aside.component.html',
  styleUrls: ['./aside.component.css'],
})
export class AsideComponent implements OnInit, OnDestroy {
  currentRoute = '';
  subMenu: NavigationItem[] = [];
  introduction: NavigationIntroduction | null = null;
  loading = false;
  loadError = false;
  private readonly destroy$ = new Subject<void>();

  constructor(
    private readonly menuService: MenuService,
    private readonly router: Router,
  ) {}

  ngOnInit(): void {
    this.loadSubMenu();
    this.router.events.pipe(
      filter((event): event is NavigationEnd => event instanceof NavigationEnd),
      takeUntil(this.destroy$),
    ).subscribe(() => this.loadSubMenu());
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  loadSubMenu(): void {
    const segments = this.routeSegments();
    this.currentRoute = segments[2] || '';

    if (!segments[0] || !segments[1]) {
      this.subMenu = [];
      this.introduction = null;
      return;
    }

    this.loading = true;
    this.loadError = false;
    this.menuService.getSubMenu(segments[0], segments[1]).pipe(
      finalize(() => {
        this.loading = false;
      }),
    ).subscribe({
      next: response => {
        this.subMenu = response.data ?? [];
        this.introduction = response.introduction ?? null;
      },
      error: () => {
        this.subMenu = [];
        this.introduction = null;
        this.loadError = true;
      },
    });
  }

  private routeSegments(): string[] {
    return this.router.url.split('?')[0].split('/').filter(Boolean);
  }
}
