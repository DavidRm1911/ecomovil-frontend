/**
 * Model for sign up request
 */
export class SignUpRequest {
  public username: string;
  public password: string;
  public email: string;
  /**
   * Constructor.
   * @param username The username.
   * @param password The password.
   * @param email
   */
  constructor(username: string, password: string, email: string) {
    this.password = password;
    this.username = username;
    this.email = email;

  }
}
