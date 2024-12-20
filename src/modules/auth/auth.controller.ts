import { Body, Controller, Post } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	@Post('/login')
	async login(@Body() userLogin: LoginDto) {
		const isAuthorized : boolean = await this.authService.isAuthorized(userLogin)
		if(isAuthorized) { 
			const token = await this.authService.generateToken(userLogin)
			return {results: true,token}
		}
		else return {results: false}
	}

	@Post('verify')
	async verifyToken(@Body('token') token: string): Promise<any> {
	  try {
		const decoded = await this.authService.verifyToken(token);
		return { valid: true, decoded };
	  } catch (error) {
		return { valid: false, error: error.message };
	  }
	}

}
