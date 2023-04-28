import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";

@Injectable()
export class RefreshTokenStrategy extends PassportStrategy(Strategy, 'refresh-token') {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromBodyField('refresh_token'),
      secretOrKey: 'refresh-token-secret',
      ignoreExpiration: false,
    });
  }

  async validate(payload: any) {
    // Aquí deberías validar el payload del token de actualización
    // y devolver un nuevo token de acceso si el token de actualización es válido.
    const accessToken = 'new-access-token';
    return { accessToken };
  }
}