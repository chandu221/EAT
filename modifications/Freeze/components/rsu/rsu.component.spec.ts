import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RsuComponent } from './rsu.component';

describe('RsuComponent', () => {
  let component: RsuComponent;
  let fixture: ComponentFixture<RsuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RsuComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RsuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
