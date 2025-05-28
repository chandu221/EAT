import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssistantComponentTsComponent } from './assistant.component.ts.component';

describe('AssistantComponentTsComponent', () => {
  let component: AssistantComponentTsComponent;
  let fixture: ComponentFixture<AssistantComponentTsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AssistantComponentTsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssistantComponentTsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
