/**
 * User entity
 * @class User
 * @description
 * This class is used to represent a user
 * It contains the following properties:
 * @property id: string - The ID of the source.
 * @property firstName: string - The name of the source.
 * @property lastName: string - The lastname of the source.
 * @property phone: string - The number of the source.
 * @property email: string - The mail of the source.
 * @property password: string - The password of the source.
 * @property ruc: string - The RUC of the source.
 * @property role: string - The role of the source.
 * @property url: string - The URL of the source.
 * @property apiId: string - The apiId.
 */


export class User {
  id: number;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  password: string;
  ruc: string;
  role: string;
  url: string;
  apiId: string;

  constructor(id: number, firstName: string, lastName: string, phone: string, email: string, password: string, ruc: string, role: string, url: string, apiId: string) {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.phone = phone;
    this.email = email;
    this.password = password;
    this.ruc = ruc;
    this.role = role;
    this.url = url;
    this.apiId = apiId;
  }

  getFullName(): string {
    return `${this.firstName} ${this.lastName}`;
  }

  updateEmail(newEmail: string): void {
    this.email = newEmail;
  }

  isSubscribed(): boolean {
    return this.role === 'student';
  }

  formatPhoneNumber(): string {
    const cleaned = this.phone.replace(/\D/g, '');
    const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
    if (match) {
      return `(${match[1]}) ${match[2]}-${match[3]}`;
    }
    return this.phone;
  }
}
