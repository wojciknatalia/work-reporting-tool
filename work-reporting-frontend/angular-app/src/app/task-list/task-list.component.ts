import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';

import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import { ApiService } from '../api.service';
import { Task } from '../task'
import { AuthService } from '../auth.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogBoxEditComponent } from '../dialog-box-edit/dialog-box-edit.component';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss']
})
export class TaskListComponent implements OnInit {
  columnsToDisplay = ['email', 'title', 'date', 'hours', 'action']
  tasks$: Observable<Task[]>;
  tasks: Task[];
  task_form: FormGroup;
  @ViewChild('content') content: ElementRef;

  constructor(public dialog: MatDialog, private apiService: ApiService, private authService: AuthService, private form_builder: FormBuilder) { }

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
    this.apiService.getTasks(email).subscribe(tasks => this.tasks = tasks);
  }

  public deleteTask(id: number) {
    this.apiService.deleteTask(id).subscribe(
      () => {
        this.getTasks();
      })
  }

  public savePDF(): void {
    pdfMake.vfs = pdfFonts.pdfMake.vfs;
    let tasksOutput: string[] = [];
    tasksOutput.push("Work Reporting Report\n\n");
    this.tasks.forEach(task => {
      tasksOutput.push("Date: " + task.date + "\nEmployee: " + task.employee_email + "\nHours: " + task.hours + "\nTask: " + task.title + "\n\n");
    });
    const documentDefinition = { content: tasksOutput };
    pdfMake.createPdf(documentDefinition).open();
    pdfMake.createPdf(documentDefinition).download();
  }

  openDialog(action, obj) {
    obj.action = action;
    const dialogRef = this.dialog.open(DialogBoxEditComponent, {
      width: '250px',
      data: obj
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result.event == 'Edit') {
        this.onEdit(result.data);
      } else if (result.event == 'Add new task') {
        this.onSubmit(result.data);
      }
    });
  }

  onSubmit(data) {
    // Create the Task.
    this.apiService.postTask(data)
      .subscribe(
        (response) => {
          console.log(response);
          this.getTasks();
        }
      )
  }

  onEdit(data) {
    //this.deleteTask(data.id);
    // Edit the Task.
    this.apiService.updateTask(data.id, data)
      .subscribe(
        (response) => {
          console.log(response);
          this.getTasks();
        }
      )
  }
}