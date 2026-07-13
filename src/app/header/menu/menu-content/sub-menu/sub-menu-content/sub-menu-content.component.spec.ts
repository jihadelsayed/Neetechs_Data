import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubMenuContentComponent } from './sub-menu-content.component';

describe('SubMenuContentComponent', () => {
  let component: SubMenuContentComponent;
  let fixture: ComponentFixture<SubMenuContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SubMenuContentComponent],
      schemas: [NO_ERRORS_SCHEMA],
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubMenuContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
