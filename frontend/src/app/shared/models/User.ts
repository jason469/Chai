export class User {
  constructor(
    public id: string,
    public name: string,
    private _username: string,
    private _token: string,
  ) {}

  get token() {
    return this._token;
  }
}
