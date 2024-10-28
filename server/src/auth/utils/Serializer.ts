import { Inject, Injectable } from '@nestjs/common';
import { PassportSerializer } from '@nestjs/passport';
import { User } from 'src/user/schemas/user.schema';
import { AuthService } from '../auth.service';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class SessionSerializer extends PassportSerializer {
  constructor(
    @Inject('AUTH_SERVICE') private readonly authService: AuthService,
    @InjectModel(User.name) private userModel: Model<User>,
  ) {
    super();
  }

  serializeUser(user: User, done: Function) {
    // console.log('Serialize user');
    // console.log(user);
    done(null, user);
  }

  async deserializeUser(payload: any, done: Function) {
    const user = await this.userModel.findById(payload._id);
    // console.log('Deserialize user');
    // console.log(user);
    return user ? done(null, user) : done(null, null);
  }
}
