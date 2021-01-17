import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../api.service';
import { Task } from '../task'
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss']
})
export class TaskListComponent implements OnInit {
  columnsToDisplay = ['id','title','date','hours','email','action']
  tasks$: Observable<Task[]>;
  task_form: FormGroup;

  constructor(private apiService: ApiService, private authService: AuthService, private form_builder: FormBuilder) { }

  ngOnInit(): void {
    this.getTasks();

    this.task_form = this.form_builder.group({
      title: '',
      hours: '',
      employee_email: this.authService.getEmail()
    });
    
    // Set validators for fields.
    this.task_form.controls["title"].setValidators([Validators.required]);
    this.task_form.controls["hours"].setValidators([Validators.required]);
  }

  public getTasks() {
    let email = this.authService.getEmail();
    this.tasks$ = this.apiService.getTasks(email);
  }

  public deleteTask(id: number) {
   this.apiService.deleteTask(id).subscribe(
    () => {
      this.getTasks();
    }
  )
  }

  onSubmit() {
    // Create the Task.
    this.apiService.postTask(this.task_form.value)
      .subscribe(
        (response) => {
          console.log(response);
          this.getTasks();
        }
      )
  }

  onEdit(id: number) {
    // Edit the Task.
    this.apiService.updateTask(id,this.task_form.value)
      .subscribe(
        (response) => {
          console.log(response);
          this.getTasks();
        }
      )
  }
}