import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TokenService } from '../services/token.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  // @Output() isAuthenticated = new EventEmitter<boolean>();
  isAuthenticated: boolean = false;

  constructor(private formBuilder: FormBuilder, private tokenService: TokenService) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: ['', [Validators['required']]],
      password: ['', [Validators['required']]]
    });
  }

  login(): void {
    if (this.loginForm?.valid) {
      const username = this.loginForm?.get('username')?.value;
      const password = this.loginForm?.get('password')?.value;
      if (username && password) {
        // Call the authentication method in the TokenService
        this.tokenService.authenticate(username, password).subscribe(
          (response) => {
            this.tokenService.setAuthenticated(true);
            // Handle successful authentication, e.g., navigate to another page
          },
          (error) => {
            this.tokenService.setAuthenticated(false);
            // Handle authentication error, e.g., display error message
          }
        );
      }
    }
  }
}
