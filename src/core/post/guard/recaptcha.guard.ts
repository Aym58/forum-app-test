import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { HttpService } from '@nestjs/axios';

import { Messages } from '../enum/post.enum';

@Injectable()
export class RecaptchaGuard implements CanActivate {
  constructor(private readonly httpService: HttpService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    if (process.env.NODE_ENV === 'dev') return true;

    const { body } = context.switchToHttp().getRequest();
    const { data } = await this.httpService
      .post(
        `https://www.google.com/recaptcha/api/siteverify?response=${body.recaptchaValue}&secret=${process.env.RECAPTCHA_SECRET}`,
      )
      .toPromise();

    if (!data.success) {
      throw new ForbiddenException(Messages.CAPTCHA_ERROR);
    }

    return true;
  }
}
