import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnomalyCheckerComponent } from './anomaly-checker.component';

describe('AnomalyCheckerComponent', () => {
  let component: AnomalyCheckerComponent;
  let fixture: ComponentFixture<AnomalyCheckerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AnomalyCheckerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnomalyCheckerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
