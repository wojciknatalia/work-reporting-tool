import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { ApiService } from '../api.service';
import { Task } from '../task'

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss']
})
export class TaskListComponent implements OnInit {
  tasks$: Observable<Task[]>;

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.getTasks();

    // this.task_form = this.form_builder.group({
    //   title: '',
    //   hours: '',
    //   employee_email: this.authService.getEmail()
    // });
  }

  public getTasks() {
    this.tasks$ = this.apiService.getTasks();
  }

  // onSubmit() {
  //   // Create the Task.
  //   this.apiService.postTask(this.task_form.value)
  //     .subscribe(
  //       (response) => {
  //         console.log(response);
  //         this.getTasks();
  //       }
  //     )
  // }
}