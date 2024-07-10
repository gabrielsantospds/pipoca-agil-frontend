import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Register } from 'src/app/register';
import { RequestsService } from 'src/app/services/requests.service';
import { ShareService } from 'src/app/services/share.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  private readonly authenticationKey = 'auth';
  private readonly subKey = 'sub';

  hide = true

  register: Register

  loginData!: FormGroup
  
  loginError: boolean = false

  constructor(
    private requests: RequestsService,
    private fb: FormBuilder,
    private shareService: ShareService,
    private router: Router
  ) {
    this.register = new Register()
  }

  ngOnInit(): void {
    this.createForm()
    this.loginError = this.shareService.isLoginError();
    this.shareService.clearLoginError(); 
  }

  createForm() {
    this.loginData = this.fb.group({
      email: new FormControl('', [
        Validators.required
      ]),
      password: new FormControl('', [
        Validators.required
      ])
    })
  }

  handleLoginError(): void {
    this.shareService.handleLoginError();
  }

  enter() {
    if(this.loginData.valid) {
      let auth
      let sub
      this.register = {
        email: this.loginData.value.email,
        password: this.loginData.value.password
      }
      this.requests.post<Register>(this.register, "auth/login", false).subscribe({
        next: (data: any) => {
          auth = data.token
          sub = data.sub
          sessionStorage.setItem(this.authenticationKey, auth)
          sessionStorage.setItem(this.subKey, sub)
          this.router.navigate(['user-data/view'])
        },
        error: (err) => {
          this.handleLoginError()
          window.location.reload();
        }
      })
    } 
  }

  scrollToRegister() {
    this.router.navigate(['home'])
    this.shareService.requestScroll('anotherPage')
  }
}
