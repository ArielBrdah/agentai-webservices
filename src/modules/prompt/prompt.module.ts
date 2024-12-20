import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Prompt } from './prompt.entity';
import { ChatModule } from '../chat/chat.module';
import { AgentModule } from '../agents/agent.module';
import { PromptService } from './prompt.service';
import { PromptController } from './prompt.controller';
import { AgentService } from '../agents/agent.service';
import { ChatService } from '../chat/chat.service';

@Module({
  imports: [TypeOrmModule.forFeature([Prompt]), ChatModule, AgentModule],
  providers: [PromptService],
  controllers: [PromptController],
  exports: [PromptService]
})
export class PromptModule {}
