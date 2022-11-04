import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-generator-password',
  templateUrl: './generator-password.component.html',
  styleUrls: ['./generator-password.component.css']
})
export class GeneratorPasswordComponent implements OnInit {

  form: FormGroup;

  password: string = '';

  randomFunc: any = {
    lower: this.getRandomLower.bind(this),
    upper: this.getRandomUpper.bind(this),
    number: this.getRandomNumber.bind(this),
    symbol: this.getRandomSymbol.bind(this),
  };

  constructor(private fb: FormBuilder, public activeModal: NgbActiveModal) {
    this.form = this.createForm();
  }

  ngOnInit(): void {
  }


  createForm() {
    return this.fb.group({
      uppercase: [true],
      lowercase: [true],
      numbers: [true],
      symbols: [false],
      length: [16, [Validators.min(8), Validators.max(128)]],
    });
  }

  generate() {
    const values = this.form.value;
    const length = values.length;
    const hasLower =  values.lowercase
    const hasUpper = values.uppercase
    const hasNumber = values.numbers
    const hasSymbol =  values.symbols
    this.password = this.generatePassword(length, hasLower, hasUpper, hasNumber, hasSymbol);
  }

  booleanToNumber(value: boolean) {
    return value ? 1 : 0;
  }

  generatePassword(length: number, lower: any, upper: any, number: any, symbol: any) {
    let generatedPassword = "";
    const typesCount = lower + upper + number + symbol;
    const typesArr = [{ lower }, { upper }, { number }, { symbol }].filter(item => Object.values(item)[0]);
    if (typesCount === 0) {
      return "";
    }
    for (let i = 0; i < length; i++) {
      typesArr.forEach(type => {
        const funcName = Object.keys(type)[0];
        generatedPassword += this.randomFunc[funcName]();
      });
    }
    return generatedPassword.slice(0, length);
  }

  secureMathRandom() {
    return window.crypto.getRandomValues(new Uint32Array(1))[0] / (Math.pow(2, 32) - 1);
  }

  getRandomLower() {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
  }

  getRandomUpper() {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 65);
  }

  getRandomNumber() {
    return String.fromCharCode(Math.floor(this.secureMathRandom() * 10) + 48);
  }

  getRandomSymbol() {
    const symbols = '~!@#$%^&*()_+{}":?><;.,';
    return symbols[Math.floor(Math.random() * symbols.length)];
  }

  copy(){
    navigator.clipboard.writeText(this.password);
  }


}
