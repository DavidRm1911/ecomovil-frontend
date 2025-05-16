import { Injectable } from '@angular/core';
import { User } from "../model/user.entity";
import { BaseService } from '../../shared/services/base.service';

@Injectable({
  providedIn: 'root'
})
export class UserService extends BaseService<User> {

  constructor() {
    super();
    this.resourceEndPoint = '/users';
  }

  // Adaptadores con nombres esperados por los componentes
  getUserById(id: any) {
    return this.getbyId(id); // usa el método real del base service
  }

  updateUser(id: any, user: User) {
    return this.update(id, user);
  }
}


