import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenudetailsComponent } from './menudetails.component';

describe('MenudetailsComponent', () => {
  let component: MenudetailsComponent;
  let fixture: ComponentFixture<MenudetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MenudetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MenudetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
