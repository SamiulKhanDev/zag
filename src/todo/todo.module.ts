import { Module } from '@nestjs/common'
import { TodoController } from './controllers/todo.controller'
import { TodoService } from './services/todo.service'
import { TypeOrmModule } from '@nestjs/typeorm'
import { TodoEntity } from './entity/todo.entity'

@Module({
  imports: [TypeOrmModule.forFeature([TodoEntity])],
  controllers: [TodoController],
  providers: [TodoService],
})
export class TodoModule {}
