import { TestBed } from '@angular/core/testing';

import { AssistantServiceTsService } from './assistant.service.ts.service';

describe('AssistantServiceTsService', () => {
  let service: AssistantServiceTsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AssistantServiceTsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
