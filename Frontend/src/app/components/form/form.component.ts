import { Component, ElementRef, EventEmitter, Input, OnChanges, OnInit, Output, Renderer2, SimpleChanges, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GeneratorPasswordComponent } from '../generator-password/generator-password.component';
import { CryptographyService } from '../../services/cryptography.service';
import { Key } from '../../models/Key.model';
import { KeyManagerContractService } from '../../services/key-manager-contract.service';
import { AlertService } from '../../services/alert.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements  OnChanges, OnInit {
  @ViewChild('FormModal') formGeneral: ElementRef<HTMLFormElement> | undefined ;
  @Output() reload = new EventEmitter();
  @Input() keyMasterValue: string = '';
  form: FormGroup;
  iSpasswordShow: boolean = false;
  rowIndex?: number;
  modeUpdate = false;
  modeView = false;

  constructor(private fb: FormBuilder, private renderer: Renderer2, private modalService: NgbModal,
    private cryptographyService:  CryptographyService, private keyManagerContractService : KeyManagerContractService,
    private alertService : AlertService) {
    this.form = this.createForm();
   }
  ngOnInit(): void {
    this.form.disable();
  }
  ngOnChanges(changes: SimpleChanges): void {
    if( changes['keyMasterValue'].currentValue){
      this.form.enable();
    }else if(!changes['keyMasterValue'].currentValue){
      this.form.reset();
      this.form.disable();
    }
  }




  createForm() {
    return this.fb.group({
      title: ['', [Validators.required]],
      note: ['',[Validators.maxLength(200)]],
      user: [''],
      password: ['', [Validators.required]],
    });
  }

  async onSubmit() {
    if (!this.modeView && this.form.valid) {

      const data : Key = new Key({
        title: this.form.value.title,
        user: await this.encrypt(this.form.value.user, this.keyMasterValue),
        password: await this.encrypt(this.form.value.password, this.keyMasterValue),
        note: await this.encrypt(this.form.value.note, this.keyMasterValue),
      });
      if(this.modeUpdate){
        await this.keyManagerContractService.updateKey(data, (this.rowIndex as number));
      }else{
        await this.keyManagerContractService.createKey(data);
      }
      this.form.reset();
      this.modeUpdate = false;
      this.reload.emit();
    }else if(!this.modeView && !this.form.valid){
      this.renderer.addClass(this.formGeneral?.nativeElement, 'was-validated');
    }
  }

  async encrypt(text: string, keyMaster: string) {
    return await this.cryptographyService.aesGcmEncrypt(text, keyMaster);
  }

  async decrypt(text: string, keyMaster: string) {
    return await this.cryptographyService.aesGcmDecrypt(text, keyMaster);
  }

  openGenerator() {
    const modalRef = this.modalService.open(GeneratorPasswordComponent);
  }

  async toUpdate(key : Key){
    try {
      this.form.reset();
      this.rowIndex = key.rowIndex;
      this.modeUpdate = true;
      this.form.setValue({
        title: key.title,
        note: await this.decrypt(key.note, this.keyMasterValue) ,
        user: await this.decrypt(key.user, this.keyMasterValue)  ,
        password: await this.decrypt(key.password, this.keyMasterValue)  ,
      });
    } catch (error) {
      this.errorDecrypt();
    }

  }


  async toView(key : Key){
    try {
      this.form.reset();
      this.modeView = true;
      this.modeUpdate = false;
      this.form.setValue({
        title: key.title,
        note: await this.decrypt(key.note, this.keyMasterValue) ,
        user: await this.decrypt(key.user, this.keyMasterValue)  ,
        password: await this.decrypt(key.password, this.keyMasterValue)  ,
      });
    } catch (error) {
      this.errorDecrypt();
    }
  }

  errorDecrypt(){
    this.alertService.show({
      title: 'Error',
      text: 'Error al desencriptar la clave, verifique que la clave maestra sea correcta',
      confirmButtonText: 'Aceptar'
    })
  }

  cancel(){
    this.form.reset();
    this.modeUpdate = false;
    this.modeView = false;
  }




}
