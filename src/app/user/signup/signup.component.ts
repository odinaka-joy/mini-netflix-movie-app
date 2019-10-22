import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../auth.service';

import { NgForm, NgModel } from '@angular/forms';
import { IUser } from '../user';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  errorMessage = '';
  userData:IUser = {
    name: '',
    email: '',
    password: ''
  };

  constructor(private auth: AuthService,
              private router: Router) {}

  ngOnInit() {
  }

  signup(projectForm: NgForm) {
    this.auth.addUser(this.userData).subscribe(
      result => this.router.navigateByUrl('/signin'),
      error => this.errorMessage ='Sorry, There Was An Error. Please Try Again'
    );
  }
}
