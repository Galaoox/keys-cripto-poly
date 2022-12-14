import { Component, OnInit, OnDestroy, Output, EventEmitter, Input, SimpleChanges, OnChanges } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Key } from '../../models/Key.model';
import { KeyManagerContractService } from '../../services/key-manager-contract.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit, OnDestroy, OnChanges {
  @Output() onUpdate = new EventEmitter();
  @Output() onView = new EventEmitter();

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
    this.subscriptions();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if( changes['disabled'].currentValue == false){
      this.getKeys();
    }else{
      this.items = [];
      this.itemsFiltered = [];
    }
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

  async delete(rowIndex?: number){
    if(rowIndex != undefined && rowIndex != null){
      await this.keyManagerContract.deleteKey(rowIndex);
      await this.getKeys();
    }

  }

  async view( key : Key){
      this.onView.emit(key);
  }


}
