import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Prompt } from './prompt.entity';
import { Chat } from '../chat/chat.entity';
import { Agent } from '../agents/agent.entity';

@Injectable()
export class PromptService {
  constructor(
    @InjectRepository(Prompt)
    private readonly promptRepository: Repository<Prompt>,
  ) {}

  // Méthode pour créer un nouveau prompt
  async createPrompt(
    chat: Chat,
    agent: Agent,
    user_msg: string,
    agent_msg: string,
  ): Promise<Prompt> {
    const prompt = this.promptRepository.create({
      chat,
      agent,
      user_msg,
      agent_msg,
      created_at: new Date(),
    });

    return this.promptRepository.save(prompt);
  }

  // Méthode pour obtenir tous les prompts d'un chat
  async getPromptsByChat(chatId: string): Promise<Prompt[]> {
    return this.promptRepository.find({ where: { chat: { uuid: chatId } } });
  }

  // Méthode pour obtenir tous les prompts d'un agent
  async getPromptsByAgent(agentUuid: string): Promise<Prompt[]> {
    return this.promptRepository.find({ where: { agent: { uuid: agentUuid } } });
  }
}