import { Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { Chat } from './chat.entity';
import { ChatService } from './chat.service';

@Controller('chats')
export class ChatController {
	constructor(private readonly chatService: ChatService) {}

  @Post()
  async createChat(): Promise<Chat> {
    return this.chatService.createChat();
  }

  @Get()
  async findAll(): Promise<Chat[]> {
    return this.chatService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') uuid: string): Promise<Chat> {
    return this.chatService.findOne(uuid);
  }

  @Delete(':id')
  async remove(@Param('id') uuid: string): Promise<void> {
    return this.chatService.remove(uuid);
  }
}
