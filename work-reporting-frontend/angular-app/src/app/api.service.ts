import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Task } from './task';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  API_URL = 'http://localhost:8000/api'

  constructor(private http: HttpClient) { }


  public getTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(`${this.API_URL}/tasks`);
  }

  public postTask(newTask: Task) {
    return this.http.post(`${this.API_URL}/tasks`, newTask);
  }
}
