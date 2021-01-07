import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  error: any;

  constructor(
    private authService: AuthService, private router: Router, public fb: FormBuilder, private snackBar: MatSnackBar) { 
      this.form = this.fb.group({
        username: ['', Validators.required],
        password: ['', Validators.required]
      });
    }

  ngOnInit(): void {
  }

  login(){
    if (this.form.invalid){
      this.form.markAllAsTouched();
      this.snackBar.open("Invalid data", "OK");
    }
    else {
      this.authService.login(this.form.get('username').value, this.form.get('password').value).subscribe(
        success => this.router.navigate(['list']),
        error => this.snackBar.open(error.error.global, "OK")
      );
    }
  }
  redirectToSignUp() {
    this.router.navigate(['signup']);
}

}
