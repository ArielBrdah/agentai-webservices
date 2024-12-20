export class CreateAgentDto {
	name: string;
	settings: object;	
	agent_url: string;
	in_production: boolean;
}