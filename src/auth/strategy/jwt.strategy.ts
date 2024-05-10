import {
  Injectable,
  UnauthorizedException,
  HttpException,
} from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: true,
      secretOrKey: process.env.JWT_TOKEN_SECRET,
    });
  }

  async validate(payload: any) {
    if (!payload.userID || !payload.refID || !payload.exp) {
      throw new UnauthorizedException('Invalid Token');
    }
    const {
      userID = null,
      refID = null,
      isIC = null,
      accessBranchID = null,
      ownerBranchID = null,
      exp = null,
      actions = [],
    } = payload;

    if (
      !userID ||
      !refID ||
      !accessBranchID ||
      !isIC ||
      !ownerBranchID ||
      !exp ||
      !actions
    ) {
      throw new HttpException('Cannot Get Data from Token', 400);
    }

    if (exp <= Math.floor(Date.now() / 1000)) {
      throw new HttpException('Authorized Timeout', 419);
    }

    return { userID, refID, isIC, accessBranchID, ownerBranchID, actions };
  }
}
