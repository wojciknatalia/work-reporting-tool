import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  form: FormGroup;
  error: any;

  constructor(private authService: AuthService, private router: Router){}
  ngOnInit(): void {
  }
  
  list(){
    this.router.navigate(['list']);
  }

  contact(){
    this.router.navigate(['contact']);
  }

  logout(){
    this.authService.logout();
    this.router.navigate(['login']);
  }
  
  isUserLoggedIn(){
    return this.authService.isLoggedIn();
  }
}
