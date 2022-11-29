import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BurgermenuComponent } from './burgermenu.component';

describe('BurgermenuComponent', () => {
  let component: BurgermenuComponent;
  let fixture: ComponentFixture<BurgermenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BurgermenuComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BurgermenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
