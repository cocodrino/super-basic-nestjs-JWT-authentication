import { Injectable } from '@nestjs/common';
import {User} from './user';

@Injectable()
export class UsersService {

    users: User[] = [new User(0, 'blah@hotmail.com', '2343')];

    async findAll() {
        return await this.users;
    }

    async findbyId(ID: number) {
        return await this.users.find((user) => user.id === ID);
    }

    async findByEmailandPass(email, pass): Promise<User | null> {
        return await this.users.find((usr) => usr.email == email && usr.password == pass);

    }

    async create(user: { email: string, password: string }) {
        let usr = new User();
        usr.id = this.users.length;
        usr.email = user.email;
        usr.password = user.password;
        this.users.push(usr);
        return usr
    }
}
