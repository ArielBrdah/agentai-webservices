import { MiddlewareConsumer, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AgentModule } from './modules/agents/agent.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Agent } from './modules/agents/agent.entity';
import { AuthController } from './modules/auth/auth.controller';
import { AuthModule } from './modules/auth/auth.module';
import { AuthService } from './modules/auth/auth.service';
import { ConfigModule } from '@nestjs/config';
import { JwtMiddleware } from './middlewares/jwt/jwt.middleware';
import { JwtModule } from '@nestjs/jwt';
import { ChatController } from './modules/chat/chat.controller';
import { ChatService } from './modules/chat/chat.service';
import { ChatModule } from './modules/chat/chat.module';
import { Chat } from './modules/chat/chat.entity';
import { PromptController } from './modules/prompt/prompt.controller';
import { PromptService } from './modules/prompt/prompt.service';
import { PromptModule } from './modules/prompt/prompt.module';
import { Prompt } from './modules/prompt/prompt.entity';


@Module({
  imports: [
    ConfigModule.forRoot(), // load environment variables
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'db.sqlite',
      entities: [Agent, Chat, Prompt],
      synchronize: true,
    }),
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'your-secret-key',
      signOptions: { expiresIn: '1h' },
    }),
    TypeOrmModule.forFeature([Chat]),
    TypeOrmModule.forFeature([Prompt]),
    AgentModule,
    AuthModule,
    ChatModule,
    PromptModule
  ],
  controllers: [AppController, AuthController, ChatController, PromptController],
  providers: [AppService, AuthService, ChatService, PromptService],
})

export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(JwtMiddleware)
      .forRoutes('agents');
  }
}
