import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../services/project.service';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit {

  projects: any = [];

  _id: any = '';
  name: any = '';
  dueDate: any = '';
  course: any = '';

  constructor(private projectService: ProjectService) {}

  ngOnInit(): void {
    this.loadProjects();
  }
//load all projects
  loadProjects(): void {
    //fetch projects from the service
    this.projectService.getProjects().subscribe(data => {
      this.projects = data;
    });
  }
//clear form fields
  clearForm(): void {
    this._id = '';
    this.name = '';
    this.dueDate = '';
    this.course = '';
  }
//add a new project
addProject(): void {
  let newProject = {
    name: this.name,
    dueDate: this.dueDate,
    course: this.course
  };
//call the service to add the project
  this.projectService.addProject(newProject).subscribe({
    next: () => {
      this.loadProjects();
      this.clearForm();
    },
    error: err => console.error('Error adding project', err)
  });
}

//select a project for editing
  selectProject(p: any): void {
    this._id = p._id;
    this.name = p.name;
    this.dueDate = p.dueDate.substring(0, 10);
    this.course = p.course;
  }
//this will update an existing project
  updateProject(): void {
    const updatedProject = {
      _id: this._id,
      name: this.name,
      dueDate: this.dueDate,
      course: this.course
    };
//here it will call the service to update the project
    this.projectService.updateProject(updatedProject).subscribe({
      next: () => {
        this.loadProjects();
        this.clearForm();
      },
      error: err => console.error('Error updating project:', err)
    });
  }
//this part of code will delete a project
  deleteProject(id: string): void {
    if (confirm('Are you sure you want to delete this project?')) {
      this.projectService.deleteProject(id).subscribe({
        next: () => this.loadProjects(),
        error: err => console.error('Error deleting project:', err)
      });
    }
  }
}
