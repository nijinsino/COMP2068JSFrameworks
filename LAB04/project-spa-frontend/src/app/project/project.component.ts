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

  loadProjects(): void {
    this.projectService.getProjects().subscribe(data => {
      this.projects = data;
    });
  }

  clearForm(): void {
    this._id = '';
    this.name = '';
    this.dueDate = '';
    this.course = '';
  }

addProject(): void {
  let newProject = {
    name: this.name,
    dueDate: this.dueDate,
    course: this.course
  };

  this.projectService.addProject(newProject).subscribe({
    next: () => {
      this.loadProjects();
      this.clearForm();
    },
    error: err => console.error('Error adding project', err)
  });
}


  selectProject(p: any): void {
    this._id = p._id;
    this.name = p.name;
    this.dueDate = p.dueDate.substring(0, 10);
    this.course = p.course;
  }

  updateProject(): void {
    const updatedProject = {
      _id: this._id,
      name: this.name,
      dueDate: this.dueDate,
      course: this.course
    };

    this.projectService.updateProject(updatedProject).subscribe({
      next: () => {
        this.loadProjects();
        this.clearForm();
      },
      error: err => console.error('Error updating project:', err)
    });
  }

  deleteProject(id: string): void {
    if (confirm('Are you sure you want to delete this project?')) {
      this.projectService.deleteProject(id).subscribe({
        next: () => this.loadProjects(),
        error: err => console.error('Error deleting project:', err)
      });
    }
  }
}
