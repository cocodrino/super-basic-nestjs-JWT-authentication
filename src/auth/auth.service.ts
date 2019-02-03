import {Injectable, UnauthorizedException} from '@nestjs/common';
import {UsersService} from "../users/users.service";
import {PassportStrategy} from '@nestjs/passport';
import {ExtractJwt,Strategy} from 'passport-jwt'


@Injectable()
export class AuthService extends PassportStrategy(Strategy){
    constructor(

        private readonly usersService: UsersService,
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey : 'someSecret'
        })
    }


    async validate(payload) {
        let {id} = payload;
        let user = await this.usersService.findbyId(id);
        if (!user) {
            throw new UnauthorizedException()
        }

        return user
    }
}
