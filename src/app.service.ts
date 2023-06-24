import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Back-end of "Sistema de Gestion de Informacion del C3"!';
  }
}
