import { TestBed } from '@angular/core/testing';

import { Route.Resolve.ServiceService } from './route.resolve.service';

describe('Route.Resolve.ServiceService', () => {
  let service: Route.Resolve.ServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Route.Resolve.ServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
