import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './user/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title:string = 'Mini-Netflix';
  constructor(private router: Router, public auth: AuthService){}

  ngOnInit() {}

  logout() {
    this.auth.logout();
    this.router.navigate(['signin']);
  }
}
