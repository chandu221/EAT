import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EsopComponent } from './esop.component';

describe('EsopComponent', () => {
  let component: EsopComponent;
  let fixture: ComponentFixture<EsopComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EsopComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EsopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
