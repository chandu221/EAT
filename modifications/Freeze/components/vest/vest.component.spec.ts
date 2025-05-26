import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VestComponent } from './vest.component';

describe('VestComponent', () => {
  let component: VestComponent;
  let fixture: ComponentFixture<VestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VestComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
