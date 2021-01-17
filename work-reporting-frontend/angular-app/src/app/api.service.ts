import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Task } from './task';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  API_URL = 'http://localhost:8000/api'

  constructor(private http: HttpClient) { }

  public getTasks(userEmail: string): Observable<Task[]> {
    const params = new HttpParams().append('email', userEmail);
    return this.http.get<Task[]>(`${this.API_URL}/tasks`, { params });
  }

  public postTask(newTask: Task) {
    return this.http.post(`${this.API_URL}/tasks`, newTask);
  }

  public deleteTask(id: number) {
    return this.http.delete(`${this.API_URL}/tasks/${id}`);
  }

  public updateTask(id: number, updateTask: Task) {
    return this.http.post('${this.API_URL}/tasks/${id}', updateTask);
  }
}
