// src/modules/prompt/prompt.controller.ts
import { Controller, Post, Body, Param, Get } from '@nestjs/common';
import { PromptService } from './prompt.service';
import { Prompt } from './prompt.entity';
import { ChatService } from '../chat/chat.service'; // Assurez-vous que ce chemin est correct
import { AgentService } from '../agents/agent.service'; // Assurez-vous que ce chemin est correct
import  OpenAI from "openai"

@Controller('prompts')
export class PromptController {
	constructor(
		private readonly promptService: PromptService,
		private readonly chatService: ChatService, // Vous aurez besoin d'un service pour récupérer un chat par son id
		private readonly agentService: AgentService, // Vous aurez besoin d'un service pour récupérer un agent par son UUID
	) { }

	// Route pour créer un prompt
	@Post()
	async createPrompt(
		@Body('chat_id') chatId: string,
		@Body('agent_uuid') agentUuid: string,
		@Body('user_msg') userMsg: string
	): Promise<Prompt> {
		const chat = await this.chatService.findOne(chatId);
		const agent = await this.agentService.getAgentByUuid(agentUuid);

		const assistantSettings = await agent.settings;
		const openai = new OpenAI({
			apiKey: process.env.OPENAI_AI_KEY
		})
		const completion = await openai.chat.completions.create({
			"model": "gpt-4o",
			"messages": [
				{ "role": "system", "content": assistantSettings },
				{ "role": "user", "content": userMsg },
			]
		})
		const assistantMsg = await completion.choices[0]["message"]['content']
		return this.promptService.createPrompt(chat, agent, userMsg, assistantMsg);
	}

	// Route pour obtenir tous les prompts d'un chat
	@Get(':chatId')
	async getPromptsByChat(@Param('chatId') chatId: string): Promise<Prompt[]> {
		return this.promptService.getPromptsByChat(chatId);
	}

	// Route pour obtenir tous les prompts d'un agent
	@Get('agent/:agentUuid')
	async getPromptsByAgent(@Param('agentUuid') agentUuid: string): Promise<Prompt[]> {
		return this.promptService.getPromptsByAgent(agentUuid);
	}
}
