import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class ConnectionInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const httpRequest = context.switchToHttp().getRequest();
    if (httpRequest.method !== 'GET') {
      return next.handle().pipe(map((data) => (data ? data : null)));
    }

    return next.handle().pipe(map((data) => (data ? { data } : null)));
  }
}
