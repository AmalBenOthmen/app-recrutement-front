export class UserProfile {
  firstname: string;
  lastname: string;
  email: string;
  password?: string;
  public photo?: string;

  constructor(firstname: string, lastname: string, email: string, password?: string, photo?: string) {
    this.firstname = firstname;
    this.lastname = lastname;
    this.email = email;
    this.password = password;
    this.photo = photo;
  }
}
