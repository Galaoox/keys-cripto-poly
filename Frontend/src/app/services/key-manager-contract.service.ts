import { Injectable } from '@angular/core';
import TruffleContract from '@truffle/contract';
import * as KeyManagerContractArtifact from '../../../../Blockchain/build/contracts/KeyManagerContract.json';
import { Key } from '../models/Key.model';
import { AuthWeb3Service } from './auth-web3.service';

@Injectable({
  providedIn: 'root'
})
export class KeyManagerContractService {
  contract : any;
  addressUser: string = '';

  constructor(private authWeb3Service: AuthWeb3Service) {
    this.authWeb3Service.addressUser.subscribe((res: string) => {
      this.addressUser = res;
    });
  }

  async loadContract(){
    const result = TruffleContract(KeyManagerContractArtifact);
    result.setProvider(this.authWeb3Service.web3Instance);
    this.contract = await result.deployed();
  }

  async getKeys(){
    try {
      const result = await this.contract.getKeys(this.addressUser, {from: this.addressUser });
      return result.map((item: Key, index: number) => {
        return new Key({...item, rowIndex: index});
      });
    } catch (error) {
      return [];
    }
  }

  async updateKey(key: Key, rowIndex: number){
    await this.contract.updateKey(this.addressUser,rowIndex,key, {from: this.addressUser });
  }

  async createKey(key: Key){
    await this.contract.createKey(this.addressUser,key, {from: this.addressUser });
  }

  async deleteKey(rowIndex : number){
    await this.contract.deleteKey(this.addressUser, rowIndex, {from: this.addressUser });
  }

}
