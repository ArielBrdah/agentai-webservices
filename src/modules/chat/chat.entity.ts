import { Entity, PrimaryGeneratedColumn, CreateDateColumn, OneToMany } from 'typeorm';
import { Prompt } from '../prompt/prompt.entity';

@Entity('chat')
export class Chat {
  @PrimaryGeneratedColumn('uuid')
  uuid: string;

  @CreateDateColumn()
  created_at: Date;

  @OneToMany(() => Prompt, (prompt) => prompt.chat)
  prompts: Prompt[];
}