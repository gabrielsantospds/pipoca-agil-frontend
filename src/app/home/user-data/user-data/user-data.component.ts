import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-data',
  templateUrl: './user-data.component.html',
  styleUrls: ['./user-data.component.css']
})
export class UserDataComponent {

  title: string = ''

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
    let fullPath = this.router.url
    let path = fullPath.slice(11)

    if (path === 'update-password' || fullPath === '/reset-password') {
      this.title = 'Alterar senha'
    } else {
        this.title = 'Dados de cadastro'
      }
  }
}
