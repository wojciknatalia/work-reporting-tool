import { Component, Inject, Optional } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Task } from '../task'

@Component({
  selector: 'app-dialog-box-edit',
  templateUrl: './dialog-box-edit.component.html',
  styleUrls: ['./dialog-box-edit.component.scss']
})

export class DialogBoxEditComponent{
  action:string;
  local_data:any;

  constructor(
    public dialogRef: MatDialogRef<DialogBoxEditComponent>,
    //@Optional() is used to prevent error if no data is passed
    @Optional() @Inject(MAT_DIALOG_DATA) public data: Task) {
    console.log(data);
    this.local_data = {...data};
    this.action = this.local_data.action;
  }

  doAction(){
    this.dialogRef.close({event:this.action,data:this.local_data});
  }

  closeDialog(){
    this.dialogRef.close({event:'Cancel'});
  }
}

