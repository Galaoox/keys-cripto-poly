import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { AuthWeb3Service } from './services/auth-web3.service';
import { TasksContractService } from './services/tasks-contract.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';

  form: UntypedFormGroup;

  loginUser: boolean = false;
  addressUser: string = '';
  addressUserView: boolean = false;
  web3: any;
  contracts: any = {};
  tasksContractDeployed: any;

  taskList: any[] = [];

  constructor(private fb: UntypedFormBuilder, private authWeb3Service: AuthWeb3Service, private cdr: ChangeDetectorRef, private taskContractService: TasksContractService) {
    this.form = this.createForm();
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
    await this.taskContractService.loadContract();
    await this.loadTasks();
  }

  async connect() {
    await this.authWeb3Service.connect();
  }


  async loadTasks() {
    this.taskList = await this.taskContractService.getTasks();
  }

  createForm() {
    return this.fb.group({
      title: ['', [Validators.required]],
      description: ['', [Validators.required]],
    });
  }

  async onSubmit() {
    if (this.form.valid) {
      await this.taskContractService.createTask(this.form.value.title, this.form.value.description, this.addressUser);
      this.form.reset();
      await this.loadTasks();
    }
  }



  async togleDone(id: number) {
    await this.taskContractService.togleDoneTask(id, this.addressUser);
    await this.loadTasks();
  }

}
