import { Controller, Get, Param, Post, OnUndefined, Body} from 'routing-controllers';
import 'reflect-metadata';
import { User } from '../models/User'

@Controller()
export class UserController {
  @Get('/users/:id')
  getOne (@Param('id') id: number) {
    return 'This action returns user #' + id;
  }

  @Post('/users/:id')
  @OnUndefined(204)
  postOne (@Param('id') id: number, @Body() info: User) {
    console.log(JSON.stringify(info));
  }
}