import {
  Injectable,
  ExecutionContext,
  UnauthorizedException
} from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { Observable } from "rxjs";

@Injectable()
export class JwtAuthGuard extends AuthGuard("jwt") {
  canActivate(
    context: ExecutionContext
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    if (request.headers?.authorization && request.session?.token) {
      const requestToken = request.headers.authorization.replace("Bearer ", "");
      const sessionToken = request.session?.token;

      if (requestToken !== sessionToken) {
        request.session.token = null;
        return false;
      }
    }

    return super.canActivate(context);
  }

  handleRequest(err: any, user: any): any {
    if (err || !user) {
      throw err || new UnauthorizedException();
    }
    return user;
  }
}
