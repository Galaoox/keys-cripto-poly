export class Key {

  title: string;
  user: string;
  password: string;
  note: string;
  rowIndex?: number;

  constructor(data : { title: string, user: string, password: string, note: string, rowIndex?: number }) {
    this.title = data.title;
    this.user =  data.user;
    this.password = data.password;
    this.note = data.note;
    this.rowIndex = data.rowIndex;
  }

}
