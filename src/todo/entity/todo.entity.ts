import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class TodoEntity {
  @PrimaryGeneratedColumn()
  id: Number

  @Column()
  userId: String

  @Column()
  name: String

  @Column()
  description: String

  @Column({ default: false })
  isCompleted: boolean
}
