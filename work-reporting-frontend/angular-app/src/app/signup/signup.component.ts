import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  form: FormGroup;
  error: any;

  constructor(private authService: AuthService, private router: Router,public fb: FormBuilder, private snackBar: MatSnackBar) {
      this.form = this.fb.group({
        username: ['', Validators.required],
        email: ['', Validators.required],
        password1: ['', Validators.required],
        password2: ['', Validators.required]
      });
    }


  ngOnInit(): void {
  }

  signup(){
    if (this.form.invalid){
      this.form.markAllAsTouched();
      this.snackBar.open("Invalid data", "OK");
    }
    else {
      this.authService.signup(this.form.value).subscribe(
        () => this.router.navigate(['list']),
        error => {
          if (error.error.username) this.form.controls['username'].setErrors({'error': true})
          if (error.error.email) this.form.controls['email'].setErrors({'error': true})
          if (error.error.password1) this.form.controls['password1'].setErrors({'error': true})
          if (error.error.password2) this.form.controls['password2'].setErrors({'error': true})
          if (error.error.global) this.snackBar.open(error.error.global, "OK")
        }
        );
      }

  }

  

}
