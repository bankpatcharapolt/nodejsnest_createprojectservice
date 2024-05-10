import {
  Controller,
  Post,
  Logger,
  InternalServerErrorException,
  Body,
  UnauthorizedException,
  Ip,
  BadRequestException,
  HttpCode,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { JwtService } from '@nestjs/jwt';
import { to } from 'await-to-js';
import * as jwt from 'jsonwebtoken';
import * as moment from 'moment';

import { SwaggerMessage } from './../../../shared/enums/swagger-message.enum';

import { AuthService } from './../../services';
import { LoginDto } from './../../dto';
import { LoginResultModel } from './../../models';

@ApiTags('Auth')
@ApiOkResponse({ description: SwaggerMessage.OK })
@ApiUnauthorizedResponse({ description: SwaggerMessage.NOT_AUTHORIZED })
@ApiInternalServerErrorResponse({
  description: SwaggerMessage.INTERNAL_SERVER_ERROR,
})
@Controller('auth')
export class AuthController {
  logger = new Logger(AuthController.name);

  constructor(
    private authService: AuthService,
    private jwtService: JwtService,
  ) {}

  // @Post('user')
  // @HttpCode(200)
  // @ApiBadRequestResponse({ description: SwaggerMessage.BAD_REQUEST })
  // async user(@Body() loginDto: LoginDto, @Ip() ipAddress: string) {
  //   const errorMessageTitle = 'Login';
  //   const { userID, refID, features, exp } = jwt.decode(loginDto.token) as any;

  //   if (exp <= Math.floor(Date.now() / 1000)) {
  //     this.logger.error(`${errorMessageTitle} - ${refID} :  Token Expired`);
  //     throw new BadRequestException('token expired');
  //   }

  //   if (!features.includes('open-account.page.menu')) {
  //     this.logger.error(`${errorMessageTitle} - ${refID} :  No Permission`);
  //     throw new UnauthorizedException('no permission');
  //   }

  //   if (
  //     !loginDto.ipAddress ||
  //     (loginDto.ipAddress && loginDto.ipAddress.trim() === '')
  //   ) {
  //     ipAddress = ipAddress;
  //   }

  //   const [error, result] = (await to(
  //     this.authService.login(refID, ipAddress),
  //   )) as [any, LoginResultModel];
  //   if (error) {
  //     console.log(error);
  //     if (error.response && error.response.status) {
  //       const { status } = error.response;
  //       if (status === 404) {
  //         this.logger.error(
  //           `${errorMessageTitle} - ${refID} : No User In BLSAccountOpeningAPI`,
  //         );
  //         throw new UnauthorizedException('no permission');
  //       }
  //     }

  //     this.logger.error(`${errorMessageTitle} - Get Error from WS`, error);
  //     throw new InternalServerErrorException(
  //       'get error from BLSAccountOpeningAPI login',
  //     );
  //   }

  //   if (!result.accessBranchID || !result.ownerBranchID || !result.actions) {
  //     let errorField = '';
  //     if (!result.accessBranchID) {
  //       errorField = 'accessBranchID';
  //     } else if (!result.ownerBranchID) {
  //       errorField = 'ownerBranchID';
  //     } else {
  //       errorField = 'actions';
  //     }

  //     this.logger.error(
  //       `${errorMessageTitle} - Cannot Get ${errorField} from BLSAccountOpeningAPI login result`,
  //     );
  //     throw new InternalServerErrorException();
  //   }

  //   const { accessBranchID, ownerBranchID, actions, isIC } = result;
  //   const payload = {
  //     userID,
  //     refID,
  //     isIC,
  //     accessBranchID,
  //     ownerBranchID,
  //     actions: actions.map((action) => action.name),
  //   };

  //   const expireAuthTokenTime = moment(exp * 1000);
  //   const token = this.jwtService.sign(payload, {
  //     secret: process.env.JWT_TOKEN_SECRET,
  //     expiresIn: Math.ceil(
  //       moment.duration(expireAuthTokenTime.diff(moment())).asSeconds(),
  //     ),
  //   });

  //   const actionList = actions.map((item: any) => item.name);
  //   const menu = [];
  //   const mappingMenu = {
  //     ['openaccount']: [
  //       'Add',
  //       'Edit',
  //       'Reject',
  //       'Resend Email',
  //       'Approve',
  //       'Print',
  //       'Report',
  //       'Resend Contract',
  //       'Delete',
  //       'Submit',
  //       'Not Complete',
  //     ],
  //     ['user']: ['Add Account'],
  //     ['user-group']: ['Add Group'],
  //     ['branch']: ['Branch Management'],
  //     ['fund']: [
  //       'Accop More View',
  //       'Accop More Success',
  //       'Accop More Delete',
  //       'Accop More Reject',
  //       'Accop More Return',
  //     ],
  //     ['global-invest']: ['GI View', 'GI Resend Email', 'GI Print'],
  //     ['tfex']: [
  //       'View (TFEX)',
  //       'Approve by IC (TFEX)',
  //       'Approve (TFEX)',
  //       'Reject (TFEX)',
  //       'Delete (TFEX)',
  //       'Return (TFEX)',
  //       'In Progress (TFEX)',
  //       'Complete (TFEX)'
  //     ],
  //   };
  //   actionList.forEach((actionName: string) => {
  //     Object.keys(mappingMenu).forEach((menuName: string) => {
  //       if (
  //         mappingMenu[menuName].includes(actionName) &&
  //         !menu.includes(menuName)
  //       ) {
  //         menu.push(menuName);
  //       }
  //     });
  //   });

  //   return {
  //     token,
  //     data: {
  //       userID,
  //       refID,
  //       isIC,
  //       accessBranchID,
  //       ownerBranchID,
  //       privilages: {
  //         menu,
  //         actions: actionList,
  //       },
  //     },
  //   };
  // }
}
