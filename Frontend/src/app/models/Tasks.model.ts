import {format} from 'date-fns';

export class Task{
  id: number;
  title: string;
  description: string;
  done: boolean;
  createdAt: string;
  constructor(id: number, title: string, description: string, done: boolean, createdAt: number) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.done = done;
    this.createdAt = format(new Date(createdAt * 1000), 'dd/MM/yyyy HH:mm');
  }
}
