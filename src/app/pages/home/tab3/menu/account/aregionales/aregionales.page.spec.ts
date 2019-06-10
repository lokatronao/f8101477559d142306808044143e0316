import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AregionalesPage } from './aregionales.page';

describe('AregionalesPage', () => {
  let component: AregionalesPage;
  let fixture: ComponentFixture<AregionalesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AregionalesPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AregionalesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
