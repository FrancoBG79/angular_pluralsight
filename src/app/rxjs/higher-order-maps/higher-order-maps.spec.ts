import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HigherOrderMaps } from './higher-order-maps';

describe('HigherOrderMaps', () => {
  let component: HigherOrderMaps;
  let fixture: ComponentFixture<HigherOrderMaps>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HigherOrderMaps],
    }).compileComponents();

    fixture = TestBed.createComponent(HigherOrderMaps);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
