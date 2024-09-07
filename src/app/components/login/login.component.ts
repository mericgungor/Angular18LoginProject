import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { userModel } from '../../models/user.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  constructor(private http: HttpClient,
    private router: Router
  ) { }

  userName: string = "emilys";
  password: string = "emilyspass";

  signIn() {
    this.http.post<userModel>("https://dummyjson.com/auth/login", { username: this.userName, password: this.password }).subscribe({
      next: res => {
        if (!res.token) {
          alert("Şifre Yanlış");
          return false;
        }

        localStorage.setItem("token", res.token);

        this.router.navigateByUrl("/home");
        return true;
      },
      error: err => {
        alert("Şifre Yanlış");
        return false;
      }
      
    });//post
  }//signIn
}//LoginComponent
