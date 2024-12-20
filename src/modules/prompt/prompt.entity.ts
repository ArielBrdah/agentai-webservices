import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Chat } from '../chat/chat.entity'; // Assurez-vous que ce chemin est correct
import { Agent } from '../agents/agent.entity'; // Assurez-vous que ce chemin est correct

@Entity('prompt')
export class Prompt {
  @PrimaryGeneratedColumn('uuid')
  uuid: string;

  @ManyToOne(() => Chat, (chat) => chat.prompts)
  @JoinColumn({ name: 'chat_uuid' })
  chat: Chat;

  @ManyToOne(() => Agent, (agent) => agent.uuid, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'agent_uuid' })
  agent: Agent;

  @Column({ type: 'text' })
  user_msg: string;

  @Column({ type: 'text' })
  agent_msg: string;

  @Column({ type: 'datetime' })
  created_at: Date;
}