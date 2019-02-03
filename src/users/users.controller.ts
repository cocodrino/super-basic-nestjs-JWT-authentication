import {UsersService} from './users.service';
import {Controller, Post, Response, Body, HttpStatus, Get, UseGuards, Req} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import * as jwt from 'jsonwebtoken';

@Controller('users')
export class UsersController {
    constructor(private readonly userService : UsersService){}

    @Get("/hello")
    async hello(@Response() resp){
        let users = await this.userService.findAll();
        resp.send("todo ok " + JSON.stringify(users))
    }

    @Post('register')
    async register(@Response() res, @Body() user : {email : string,password:string}){
        let usr = await this.userService.findByEmailandPass(user.email, user.password);
        if(usr){
            return res.status(HttpStatus.BAD_REQUEST).send("user exist")
        }

        let result = await this.userService.create(user);

        const accesToken = jwt.sign({
            id: result.id,
        }, 'someSecret', {expiresIn: 3600});

        return res.status(HttpStatus.OK).json({expiresIn:3600,accesToken})
    }

    @Post('login')
    async login(@Response() res,@Body() user:{email:string,password:string}){
        let usr = this.userService.findByEmailandPass(user.email, user.password);
        if(!usr){
            return res.status(HttpStatus.FORBIDDEN)
        }

        const accesToken = jwt.sign({
            email: user.email,
        }, 'someSecret', {expiresIn: 3600});

        return res.status(HttpStatus.OK).json({expiresIn:3600,accesToken})
    }

    @Get('protected')
    @UseGuards(AuthGuard('jwt'))
    async protected(@Req() req){
        return "you can access here now!! " + req.user
    }
}
