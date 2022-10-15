import { Injectable } from '@angular/core';
import TruffleContract from '@truffle/contract';
import * as TasksContractArtifact from '../../../../Blockchain/build/contracts/TasksContract.json';
import { Task } from '../models/Tasks.model';
import { AuthWeb3Service } from './auth-web3.service';

@Injectable({
  providedIn: 'root'
})
export class TasksContractService {

  contract : any;

  constructor(private authWeb3Service: AuthWeb3Service) { }

  async loadContract(){
    const result = TruffleContract(TasksContractArtifact);
    result.setProvider(this.authWeb3Service.web3Instance);
    this.contract = await result.deployed();
  }

  async getTasks(): Promise<Task[]>{
    const list:Task[] = [];
    const taskCounter = (await this.contract.taskCounter()).toNumber();
    console.log(taskCounter);
    for(let i = 0; i < taskCounter; i++){
      const task = await this.contract.tasks(i);
      list.push(new Task(
        task.id.toNumber(),
        task.title,
        task.description,
        task.done,
        task.createdAt,
      ));
    }
    return list;
  }

  async togleDoneTask(id: number, addressUser: string){
    await this.contract.toggleDone(id, {from: addressUser});
  }

  async createTask(title: string, description: string, addressUser: string){
    await this.contract.createTask(title, description, {from: addressUser});
  }


}
