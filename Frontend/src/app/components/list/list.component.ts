import { Component, Input, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Key } from '../../models/Key.model';
import { FormComponent } from '../form/form.component';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  page = 1;
  pageSize = 4;
  items: Key[] = [
    {
      title: 'Facebook',
      user: 'user',
      password: 'password',
      note: 'note',
    },
    {
      title: 'Twitter',
      user: 'user',
      password: 'password',
      note: 'note',
    },
    {
      title: 'Instagram',
      user: 'user',
      password: 'password',
      note: 'note',
    },
    {
      title: 'Github',
      user: 'user',
      password: 'password',
      note: 'note',
    },
  ];

  constructor() { }

  ngOnInit(): void {
  }


}
