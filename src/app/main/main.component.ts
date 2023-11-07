import { Component, OnInit } from '@angular/core';
import { Register } from './register';
import { RequestsService } from '../services/requests.service';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { ValidatorService } from '../services/validator.service';


@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
})
export class MainComponent implements OnInit {

  accountDetails!: FormGroup
  hide = true
  hideConfirm = true

  register!: Register

  birthDate: any

  passwordUpdate!: string

  constructor(private requests: RequestsService, private validator: ValidatorService, private fb: FormBuilder) {
    
  }

  validationMessages = {
    'name': [
      {
        type: 'required', message: 'Campo obrigatório'
      },
      {
        type: 'invalidChar', message: 'Não são permitidos caracteres especiais'
      },
      {
        type: 'notSpace', message: 'Por favor, digite nome e sobrenome'
      }
    ],
    'email': [
      {
        type: 'required', message: 'Campo obrigatório'
      },
      {
        type: 'email', message: 'Favor preencher no formato exemplo@email.com'
      }
    ],
    'birthDate': [
      {
        type: 'required', message: 'Campo obrigatório'
      },
      {
        type: 'ageTooYoung', message: 'Usuário deve ser maior de 18 anos'
      },
      {
        type: 'invalidFormat', message: 'Formato inválido! Favor preencher DD/MM/AAAA'
      }
    ],
    'password': [
      {
        type: 'required', message: 'Campo obrigatório'
      },
      {
        type: 'minlength', message: 'Limite de caracteres 6 a 20'
      },
      {
        type: 'maxlength', message: 'Limite de caracteres 6 a 20'
      }
    ],
    'confirmPassword': [
      {
        type: 'required', message: 'Campo obrigatório'
      },
      {
        type: 'unequalPassword', message: 'A senha deve ser a mesma'
      }
    ]
  }

  ngOnInit(): void {
    this.createForm()
    this.accountDetails.controls['password'].valueChanges.subscribe((newValue) => {
      this.passwordUpdate = newValue
    })
    console.log(this.passwordUpdate)
  }

  createForm() {
    this.accountDetails = this.fb.group({
      name: new FormControl('', [
        Validators.required,
        this.spaceValidator(),
        this.characterValidator()
      ]),
      email: new FormControl('', [
        Validators.required,
        Validators.email
      ]),
      birthDate: new FormControl('',[
        Validators.required,
        this.formatValidator(),
        this.ageValidator(18)
      ]),
      password: new FormControl('',[
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(20)
      ]),
      confirmPassword: new FormControl('',[
        Validators.required,
        this.equalValidator()
      ])
    })
  }

  spaceValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const regex = /\s/
      if(!regex.test(control.value)) {
        return {notSpace : true}
      }
      return null   
    }
  }

  characterValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const regex = /^[a-zA-Z ]*$/
      if(!regex.test(control.value)) {
        return {invalidChar : true}
      }
      return null
    }
  }

  formatValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const regexLet = /^[a-zA-Z ]*$/
      const regexForm = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/
      if(regexLet.test(control.value)) {
        return {invalidFormat : true}
      }
      if(!regexForm.test(control.value)) {
        return {invalidFormat : true}
      }
      return null
    }
  }

  equalValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if(this.passwordUpdate != control.value) {
        return {unequalPassword : true}
      }
      return null
    }
  }

  teste() {
    console.log(new Date())
    console.log(typeof this.accountDetails.get('birthDate')!.value)
    console.log(document.getElementById('birthDate'))
    // let valueSelected = this.register.birthDate.value
    // let selected = this.register.birthDate
    // console.log(typeof valueSelected)

  }

  ageValidator(minAge: number) {
    return (control: AbstractControl) => {
      const partsDate = control.value.split('/')
      const day = parseInt(partsDate[0], 10);
      const month = parseInt(partsDate[1], 10) - 1; 
      const year = parseInt(partsDate[2], 10);
      const birthDate = new Date(year, month, day)
      const today = new Date()

      const diffMonth = today.getMonth() - birthDate.getMonth()
      const diffDay = today.getDate() - birthDate.getDate()
      let age = today.getFullYear() - birthDate.getFullYear()

      if (diffMonth < 0 || diffMonth === 0 && diffDay < 0) {
        age--
      } 
      if (age < minAge) {
        return { ageTooYoung: true }
      }
      return null
    }
  }

  async teste1() {
    // this.validator.openDialog("0ms","0ms")
    let registerY: Register = {
      username: this.register.username.value,
      email: this.register.email.value,
      birthDate: this.register.birthDate.value,
      password: this.register.password.value,
      passConfirm: this.register.passConfirm.value
    }

    this.requests.testPost(registerY).subscribe(
      {
        next: (data) => {
          this.validator.openDialog("0ms", "0ms")
        },
        error: (error) => {
          console.log(error.status)
        }
      }
    )
  }

  checked = false
}
