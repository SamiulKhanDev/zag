import { Module } from '@nestjs/common'
import { AuthModule } from './auth/auth.module'
import { TypeOrmModule } from '@nestjs/typeorm'
import { TodoModule } from './todo/todo.module'
import { TodoEntity } from './todo/entity/todo.entity'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { AppController } from './app.controller'

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    AuthModule,
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        return {
          type: 'mysql',
          host: configService.get('HOST'),
          port: configService.get('PORT'),
          username: configService.get('USERNAME'),
          password: configService.get('PASSWORD_DB'),
          database: configService.get('NAME'),
          entities: [TodoEntity],
          synchronize: true,
        }
      },
    }),
    TodoModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
