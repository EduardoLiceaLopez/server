import { CanActivate, Injectable,  ExecutionContext } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Observable } from "rxjs";
import { ROLES_KEY } from "./roles.decorator";
import { GqlExecutionContext } from "@nestjs/graphql";
import Role, {  } from "./role.enum";

@Injectable()
export class RolesGuard implements CanActivate {

    constructor(private reflector: Reflector){}

    canActivate(context: ExecutionContext):boolean | Promise<boolean> | Observable<boolean>{
        const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
            context.getHandler(),
            context.getClass(),
        ]);

        if(!requiredRoles){
            return false; //true
        }

        const ctx = GqlExecutionContext.create(context);
        const user = ctx.getContext().req.user;

        return requiredRoles.some((role) => user.role?.includes(role));
    }
}