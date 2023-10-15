import { Injectable } from '@nestjs/common'
import { Equal, Repository } from 'typeorm'
import { TodoEntity } from '../entity/todo.entity'
import { InjectRepository } from '@nestjs/typeorm'

@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(TodoEntity)
    private todoRepository: Repository<TodoEntity>,
  ) {}

  async getAllTodos(userId: String) {
    const data = await this.todoRepository.find({
      where: {
        userId: Equal(userId),
      },
    })
    return data
  }
  async insert(name: String, desc: String, userId: String) {
    await this.todoRepository.insert({
      userId: userId,
      description: desc,
      name: name,
    })
  }

  async delete(id: Number) {
    await this.todoRepository.delete({
      id: Equal(id),
    })
  }
  async update(id: Number, desc: String) {
    await this.todoRepository.update({ id: Equal(id) }, { description: desc })
  }
}
