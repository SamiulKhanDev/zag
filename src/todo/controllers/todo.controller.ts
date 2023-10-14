import {Controller, Get,Req,Post,Body,Param } from '@nestjs/common';
import { TodoService } from '../services/todo.service';
import { Request } from 'express';
import { TodoDto } from '../dto/todo.dto';

@Controller('api/v1/todo')
export class TodoController {

    constructor(private readonly todoService:TodoService){}
   @Get()
   async getAllTodos(@Req() request:Request)
   {
       try {
           const data = await this.todoService.getAllTodos(request.body.user.userId);
           return {
               success: true,
               data
           }
       } catch (error) {
           return {
               error,     
        }
       }
       
   }
    
    @Post("insert")
    async insertATodo(@Body() body:TodoDto,@Req() request:Request)
    {
        try {
            const name = body.name;
            const descreption = body.description;
            if (!name || !descreption)
                throw new Error();
            await this.todoService.insert(body.name, body.description, request.body.user.userId);
            return {
                success:true
            }
        } catch (error) {
            return {
                success: false,
                info:"please provide a name and desc to the Todo"
            }
        }
        
    }

    @Get("delete/:id")
    async deleteATodo(@Param() param:any)
    {
        try {
            await this.todoService.delete(param.id);
            return {
                success:true
            }
        } catch (error) {
            return {
                error,
            }
        }
        
    }
    @Post("update")
    async updateATodo(@Body() body:TodoDto)
    {
        try {
            await this.todoService.update(body.id, body.description)
            return {
                success: true
    }
    } catch (error) {
        return {
            error,
        }
    }
    }



}
