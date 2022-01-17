export class NodeOwner {
  id?: string;
  first_name?: string = '';
  last_name?: string = '';
  pub_key: string = '';
  nodename?: string;
  username?: string = '';
  order?: number;

  get username_or_name() {
    if (this.username == 'None') {
      return this.first_name;
    }
    return `@${this.username}`;
  }
}
