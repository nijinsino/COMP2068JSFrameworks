import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
//API endpoint
  private apiUrl = 'http://localhost:3000/projects';
//
  constructor(private http: HttpClient) { }
//this will fetch 
// the projects from the backend
  getProjects() {
    return this.http.get(this.apiUrl);
  }
}
