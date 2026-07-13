import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuContentComponent } from './menu-content.component';

describe('MenuContentComponent', () => {
  let component: MenuContentComponent;
  let fixture: ComponentFixture<MenuContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MenuContentComponent],
      schemas: [NO_ERRORS_SCHEMA],
    })
    .compileComponents();

    fixture = TestBed.createComponent(MenuContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
