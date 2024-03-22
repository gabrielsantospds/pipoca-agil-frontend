import { Component, OnInit } from '@angular/core';
import { Register } from '../../../register';
import { RequestsService } from '../../../services/requests.service';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { ValidatorService } from '../../../services/validator.service';
import { throwIfEmpty } from 'rxjs';
import { ShareService } from 'src/app/services/share.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {

  accountDetails!: FormGroup
  hide = true
  hideConfirm = true

  register!: Register

  passwordUpdate!: string

  constructor(
    private requests: RequestsService, 
    private validator: ValidatorService, 
    private fb: FormBuilder, 
  ) {

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
        Validators.email,
        // this.validarNumero()
      ]),
      birthDate: new FormControl('', [
        Validators.required,
        this.formatValidator(),
        this.ageValidator(18)
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(20)
      ]),
      confirmPassword: new FormControl('', [
        Validators.required,
        this.equalValidator()
      ])
    })
  }

  // validarNumero() {
  //   return (control: AbstractControl): ValidationErrors | null => {
  //     const valor = control.value;
  //     const numerosApenas = valor.replace(/[^0-9]/, '');

  //     control.setValue(numerosApenas, { emitEvent: false });

  //     return null;
  //   }

  // }

  spaceValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const regex = /^[A-Za-zÀ-ÖØ-öø-ÿ]+(\s[A-Za-zÀ-ÖØ-öø-ÿ]+)+$/
      if (!regex.test(control.value)) {
        return { notSpace: true }
      }
      return null
    }
  }

  characterValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const regex = /^[A-Za-zÀ-ÖØ-öø-ÿ\s]*$/
      if (!regex.test(control.value)) {
        return { invalidChar: true }
      }
      return null
    }
  }

  formatValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const regexLet = /^[a-zA-Z ]*$/
      const regexForm = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/
      if (regexLet.test(control.value)) {
        return { invalidFormat: true }
      }
      if (!regexForm.test(control.value)) {
        return { invalidFormat: true }
      }
      return null
    }
  }

  equalValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (this.passwordUpdate != control.value) {
        return { unequalPassword: true }
      }
      return null
    }
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

  blockLetters(event: KeyboardEvent) {
    const regex = /[0-9\/]/; 
    
    if (event.key === 'Backspace' || event.key === 'Tab') {
      return;
    }

    if (!regex.test(event.key)) {
      event.preventDefault();
    }
  }

  send() {
    let ret
    this.register = {
      name: this.accountDetails.value.name,
      email: this.accountDetails.value.email,
      password: this.accountDetails.value.password,
      birthDate: this.accountDetails.value.birthDate
    }

    if (this.accountDetails.valid) {
      this.requests.post(this.register, 'user/signup').subscribe(
        {
          next: (data) => {
            this.validator.validatorMessage('success')
          },
          error: (error) => {
            this.validator.successMessage = false
            this.validator.validatorMessage('unsuccess')
          }
        }
      )
    }
  }

  checked = false
}
