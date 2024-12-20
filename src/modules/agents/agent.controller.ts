import { Body, Controller, Delete, Get, Param, Post, Put, Req } from '@nestjs/common';
import { CreateAgentDto } from './dto/create-agents.dto';
import { AgentService } from './agent.service';
import { Agent } from './agent.entity';


@Controller('agents')
export class AgentController {
  constructor(private readonly agentService: AgentService) {}

  @Post()
  async createAgent(@Body() data: Partial<Agent>): Promise<Agent> {
    return this.agentService.createAgent(data);
  }

  @Get()
  async getAllAgents(): Promise<Agent[]> {
    return this.agentService.getAgents();
  }

  @Get(':uuid')
  async getAgentByUuid(@Param('uuid') uuid: string): Promise<Agent|{found: boolean;}> {
	  const agent = await this.agentService.getAgentByUuid(uuid);
	  console.log(agent);
	if(agent === null) return {found: false} 
	  return agent
  }

  @Put(':uuid')
  async updateAgentByUuid(@Param('uuid') uuid: string, @Body() updateData: { name: string; settings: string; inProduction: boolean }): Promise<Agent> {
	return this.agentService.updateAgentByUuid(uuid,updateData);
  }

  @Delete(':uuid')
  async deleteAgentByUuid(@Param('uuid') uuid: string) : Promise<Agent> {
	return this.agentService.destroyAgentByUuid(uuid);
  }
}
