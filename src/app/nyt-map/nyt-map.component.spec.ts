import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NytMapComponent } from './nyt-map.component';

describe('NytMapComponent', () => {
  let component: NytMapComponent;
  let fixture: ComponentFixture<NytMapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NytMapComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NytMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
