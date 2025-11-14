import { TestBed } from '@angular/core/testing';

import { ProjectService } from './project.service';
//this will describe 
// the test suite for ProjectService
describe('ProjectService', () => {
  //declare variable
  let service: ProjectService;

  beforeEach(() => {
    //it creates 
    // a testing module
      // for the service
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProjectService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
