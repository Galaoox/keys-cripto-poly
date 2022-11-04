import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GeneratorPasswordComponent } from '../generator-password/generator-password.component';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
  @ViewChild('FormModal') formGeneral: ElementRef<HTMLFormElement> | undefined ;
  form: FormGroup;
  iSpasswordShow: boolean = false;

  constructor(private fb: FormBuilder, private renderer: Renderer2, private modalService: NgbModal) {
    this.form = this.createForm();
   }

  ngOnInit(): void {
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
    if (this.form.valid) {
      // await this.taskContractService.createTask(this.form.value.title, this.form.value.description, this.addressUser);
      // this.form.reset();
      // await this.loadTasks();
    }else{
      this.renderer.addClass(this.formGeneral?.nativeElement, 'was-validated');
    }
  }

  openGenerator() {
    const modalRef = this.modalService.open(GeneratorPasswordComponent);
    // modalRef.componentInstance.name = 'World';
  }




}
