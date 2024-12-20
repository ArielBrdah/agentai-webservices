import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Agent } from './agent.entity';

@Injectable()
export class AgentService {
  constructor(
    @InjectRepository(Agent)
    private readonly agentRepository: Repository<Agent>,
  ) { }

  async createAgent(data: Partial<Agent>): Promise<Agent> {
    const agent = this.agentRepository.create(data);
    return this.agentRepository.save(agent);
  }

  async getAgents(): Promise<Agent[]> {
    return this.agentRepository.find();
  }

  async getAgentByUuid(uuid: string): Promise<Agent> {
    return this.agentRepository.findOneBy({ uuid });
  }

  async updateAgentByUuid(uuid: string,updateData: { name: string, settings: string,inProduction: boolean }): Promise<Agent> {
    const agent = await this.agentRepository.findOne({ where: { uuid } });

    if (!agent) {
      throw new Error('Agent not found');
    }

    agent.name = updateData.name;
    agent.settings = updateData.settings;
    agent.inProduction = updateData.inProduction;
    await this.agentRepository.save(agent);
    return agent
  }

  async destroyAgentByUuid(uuid: string): Promise<Agent> {
    const agent = await this.agentRepository.findOne({ where: { uuid } });

    if (!agent) {
      throw new Error('Agent not found');
    }

    return await this.agentRepository.remove(agent);
  }
}