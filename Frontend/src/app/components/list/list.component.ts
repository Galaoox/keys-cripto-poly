import { Component, OnInit, OnDestroy, Output, EventEmitter, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Key } from '../../models/Key.model';
import { KeyManagerContractService } from '../../services/key-manager-contract.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit, OnDestroy {
  @Output() onUpdate = new EventEmitter();
  @Input() disabled = false;

  page = 1;
  pageSize = 4;
  items: Key[] = [];

  itemsFiltered  : Key[]= [];

  searchControl = new FormControl('');

  subscription : Subscription | undefined;

  constructor(private keyManagerContract : KeyManagerContractService) { }

  async ngOnInit() {
    await this.keyManagerContract.loadContract();
    await this.getKeys();
    this.subscriptions();
  }

  ngOnDestroy(){
    this.deleteSubscription();
  }

  async getKeys(){
    this.items = await this.keyManagerContract.getKeys();
    this.itemsFiltered = this.items;
  }

  subscriptions(){
    this.subscription =  this.searchControl.valueChanges.subscribe((value: any) => {
      this.filter(value);
    })
  }

  filter(text: string){
    this.itemsFiltered = this.items.filter((item) => {
      return item.title.toLowerCase().includes(text.toLowerCase());
    })
  }

  deleteSubscription(){
    this.subscription?.unsubscribe();
  }

  update(item: Key){
    this.onUpdate.emit(item);
  }

  async delete(rowIndex: number){
    await this.keyManagerContract.deleteKey(rowIndex);
    await this.getKeys();
  }




}
