import { BadRequestException, CanActivate, ExecutionContext, ForbiddenException, HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { Observable } from "rxjs";
import * as jwt from 'jsonwebtoken';
import { GqlExecutionContext } from "@nestjs/graphql";


@Injectable()
export class AdminGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const ctx = GqlExecutionContext.create(context);
    const token = ctx.getContext().req.headers.authorization?.split(' ')[1];

    if (token){
      try{

        const decodedToken = jwt.verify(token, 'hide-me') as {role : string};
        ctx.getContext().req.user = {user_role: decodedToken.role};
        return decodedToken.role.includes('admin');

      }catch (err){
        throw new ForbiddenException(`Falta el encabezado de autorización. Error: ${err}`);
      }

    }else{
      throw new ForbiddenException('You do not have permission to access this resource.');
      
    }

  }
}