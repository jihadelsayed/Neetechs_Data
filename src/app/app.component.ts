import { DOCUMENT } from '@angular/common';
import { Component, Inject, LOCALE_ID, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  readonly title = 'Neetechs Data';
  readonly direction: 'ltr' | 'rtl';

  constructor(
    @Inject(DOCUMENT) private readonly document: Document,
    @Inject(LOCALE_ID) public readonly localeId: string,
    private readonly titleService: Title,
  ) {
    this.direction = this.localeId.toLowerCase().startsWith('ar') ? 'rtl' : 'ltr';
  }

  ngOnInit(): void {
    this.document.documentElement.lang = this.localeId;
    this.document.documentElement.dir = this.direction;
    this.titleService.setTitle($localize`Neetechs Data`);
  }
}

