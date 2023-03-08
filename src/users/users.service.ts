import { Injectable } from '@nestjs/common';
import { User } from './user.entity';


@Injectable()
export class UsersService {


    finAll(): User[] {
        return [{
            id:  1,
            name: 'Oscar',
            middle_name: 'Bojorquez',
            last_name: 'Ruíz',
            curp: 'Oskiki',
            rfc: 'Oscar30',
            phone_number: 558388304,
            email: 'oscarBQ@gmail.com'
        }];
    }

}
