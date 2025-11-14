import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectComponent } from './project.component';

describe('ProjectComponent', () => {
  //declare variables
  let component: ProjectComponent;
  let fixture: ComponentFixture<ProjectComponent>;

  beforeEach(() => {
    //this will 
    // configure the testing module
    TestBed.configureTestingModule({
      declarations: [ProjectComponent]
    });
    //this will create 
    // the component instance
    fixture = TestBed.createComponent(ProjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
//this will test whether 
// the component is created successfully
  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
