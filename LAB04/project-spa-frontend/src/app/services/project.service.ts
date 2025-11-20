import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  private apiUrl = environment.ServerAPI + 'projects';

  constructor(private http: HttpClient) { }

  getProjects() {
    return this.http.get<any[]>(this.apiUrl);
  }

  addProject(project: any) {
    return this.http.post(this.apiUrl, project);
  }

  updateProject(project: any) {
    return this.http.put(this.apiUrl, project);
  }

  deleteProject(id: string) {
    return this.http.delete(this.apiUrl + '/' + id);
  }
}
