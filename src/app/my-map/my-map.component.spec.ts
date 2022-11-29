import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyMapComponent } from './my-map.component';

describe('MyMapComponent', () => {
  let component: MyMapComponent;
  let fixture: ComponentFixture<MyMapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyMapComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
