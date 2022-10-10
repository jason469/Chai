export class User {
  constructor(
    public id: string,
    public name: string,
    private _username: string,
    private _token: string,
    // private _tokenExpirationDate: Date
  ) {}

  get token() {
    return this._token;
  }
}
