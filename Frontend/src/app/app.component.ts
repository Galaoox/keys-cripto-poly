import { Component, OnInit, ChangeDetectorRef, ViewChild } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { AuthWeb3Service } from './services/auth-web3.service';
import { ListComponent } from './components/list/list.component';
import { FormComponent } from './components/form/form.component';
import { Key } from './models/Key.model';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  @ViewChild('list') list?: ListComponent;
  @ViewChild('formComp') formComp?: FormComponent;
  title = 'app';

  loginUser: boolean = false;
  addressUser: string = '';
  addressUserView: boolean = false;
  web3: any;
  contracts: any = {};
  tasksContractDeployed: any;

  taskList: any[] = [];

  keyMaster  = new FormControl('', [Validators.required]);
  hasKeyMaster: boolean =false;
  keyMasterValue: string = '';

  constructor(private authWeb3Service: AuthWeb3Service, private cdr: ChangeDetectorRef) {
    this.web3 = this.authWeb3Service.web3Instance;
  }




  async ngOnInit() {
    this.authWeb3Service.loginUser.subscribe((res: boolean) => {
      this.loginUser = res;
      (!this.loginUser) ? this.addressUserView = false : this.addressUserView = true;
      this.cdr.detectChanges();
    });

    this.authWeb3Service.addressUser.subscribe((res: string) => {
      this.addressUser = res;
      this.cdr.detectChanges();
    });
    await this.connect();
  }

  async connect() {
    await this.authWeb3Service.connect();
  }

  async reloadData(){
    if(this.list)this.list.getKeys();
  }

  async deleteKey(){
    this.keyMaster.setValue('');
    this.keyMasterValue = '';
    this.hasKeyMaster = false;
  }

  async insertKey(){
    if(this.keyMaster.value){
      this.hasKeyMaster = true;
      this.keyMasterValue = this.keyMaster.value;
    }
  }

  async onUpdate(event: Key){
    await this.formComp?.toUpdate(event);
  }

  async onView(event: Key){
    await this.formComp?.toView(event);
  }

}
