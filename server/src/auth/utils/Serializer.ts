import { Injectable } from '@nestjs/common';
import { PassportSerializer } from '@nestjs/passport';
import { User } from 'src/user/schemas/user.schema';
import { UserService } from 'src/user/user.service';

@Injectable()
export class SessionSerializer extends PassportSerializer {
  constructor(private userService: UserService) {
    super();
  }

  serializeUser(user: User, done: Function) {
    console.log('Serialize user');
    done(null, user);
  }

  async deserializeUser(payload: any, done: Function) {
    const user = await this.userService.getOneUser(payload.id);
    console.log('Deserialize user');
    console.log(user);
    return user ? done(null, user) : done(null, null);
  }
}
