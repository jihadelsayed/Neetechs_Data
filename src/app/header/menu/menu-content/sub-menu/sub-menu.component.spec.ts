import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { SubMenuComponent } from './sub-menu.component';

describe('SubMenuComponent', () => {
  let component: SubMenuComponent;
  let fixture: ComponentFixture<SubMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule],
      declarations: [SubMenuComponent],
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
