import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Chat } from './chat.entity';

@Injectable()
export class ChatService {
  constructor(
    @InjectRepository(Chat)
    private readonly chatRepository: Repository<Chat>,
  ) {}

  // Créer un chat
  async createChat(): Promise<Chat> {
    const chat = this.chatRepository.create(); // Créer un nouvel objet Chat
    return await this.chatRepository.save(chat); // Sauvegarder le chat dans la DB
  }

  // Récupérer tous les chats
  async findAll(): Promise<Chat[]> {
    return await this.chatRepository.find(); // Retourner tous les chats
  }

  // Récupérer un chat par son ID
  async findOne(uuid: string): Promise<Chat> {
    return await this.chatRepository.findOneBy({ uuid }); // Retourner un chat spécifique
  }

  // Supprimer un chat par son ID
  async remove(id: string): Promise<void> {
    await this.chatRepository.delete(id); // Supprimer un chat par ID
  }

}
