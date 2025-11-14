import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../services/project.service';

@Component({
  // Component selector used in HTM
  selector: 'app-project',
  //html file
  templateUrl: './project.component.html',
  //style file
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit {

  projects: any = [];

  constructor(private projectService: ProjectService) {}

  ngOnInit(): void {
    //load project
    this.loadProjects();
  }

  loadProjects(): void {
    //this will call the 
    // service to fetch projects
    this.projectService.getProjects().subscribe(data => {
      this.projects = data;
    });
    
  }
  
}
