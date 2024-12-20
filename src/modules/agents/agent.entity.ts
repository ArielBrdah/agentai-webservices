import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	CreateDateColumn,
	UpdateDateColumn,
  } from 'typeorm';
  
  @Entity('agents')
  export class Agent {
	@PrimaryGeneratedColumn('uuid')
	uuid: string;
  
	@Column({ type: 'text' })
	settings: string;
  
	@Column({ type: 'text' })
	name: string;
  
	@CreateDateColumn({ name: 'created_at' })
	createdAt: Date;
  
	@UpdateDateColumn({ name: 'updated_at' })
	updatedAt: Date;
  
	@Column({ type: 'boolean', name: 'in_production' })
	inProduction: boolean;

  }