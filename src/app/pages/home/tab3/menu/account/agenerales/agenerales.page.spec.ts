import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgeneralesPage } from './agenerales.page';

describe('AgeneralesPage', () => {
  let component: AgeneralesPage;
  let fixture: ComponentFixture<AgeneralesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgeneralesPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgeneralesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
