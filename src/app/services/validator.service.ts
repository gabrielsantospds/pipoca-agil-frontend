import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogAnimationComponent } from '../template/dialog-animation/dialog-animation.component';
import { DialogChangesComponent } from '../template/dialog-changes/dialog-changes.component';
import { DialogConfirmComponent } from '../template/dialog-confirm/dialog-confirm.component';
import { Dialog } from '@angular/cdk/dialog';
import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ValidatorService {

  passwordUpdate: string = ''

  constructor() { }

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
      if (this.passwordUpdate !== control.value) {
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
    ],
    'keyWord': [
      {
        type: 'required', message: 'Campo obrigatório'
      }
    ],
    'value': [
      {
        type: 'required', message: 'Campo obrigatório'
      }
    ]
  }
}
