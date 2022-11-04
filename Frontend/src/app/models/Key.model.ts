export class Key {

  title: string;
  user: string;
  password: string;
  note: string;

  constructor(data : { title: string, user: string, password: string, note: string}) {
    this.title = data.title;
    this.user =  data.user;
    this.password = data.password;
    this.note = data.note;
    // crypto.subtle.encrypt('AES-GCM ', key, data.user);

  }

}
