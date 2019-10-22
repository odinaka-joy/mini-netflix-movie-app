import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../auth.service';
import { first } from 'rxjs/operators';

import { NgForm } from '@angular/forms';
import { stringify } from '@angular/compiler/src/util';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})

export class SigninComponent implements OnInit {
  errorMessage = '';
  user_data = {
    email: '',
    password: ''
  };

  constructor(private route: ActivatedRoute,
              private auth: AuthService,
              private router: Router) {}

  ngOnInit() {
  }

  signin(projectForm: NgForm) {
    this.auth.getUser(this.user_data)
    .pipe(first())
    .subscribe(
      result => {
        this.router.navigate(['favourites'])
      },
      error => this.errorMessage ='Sorry, Could Not Authenticate'
    );
  }

}

