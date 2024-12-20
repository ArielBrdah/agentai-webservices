import { Injectable } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';  // Importation de JwtService

@Injectable()
export class AuthService {
	constructor(private configService: ConfigService,
		private jwtService: JwtService,
	) { }

	async isAuthorized(user: LoginDto): Promise<boolean> {
		const email: string = this.configService.get<string>('USER_EMAIL');
		const pwd: string = this.configService.get<string>('USER_PASS');

		if (email === user.name && user.password == pwd) return true
		else return false
	}


	async generateToken(user: LoginDto): Promise<string> {
		const payload = { username: user.name };
		return this.jwtService.sign(payload);
	}

	async verifyToken(token: string): Promise<any> {
		try {
			return await this.jwtService.verifyAsync(token);
		} catch (error) {
			throw new Error('Invalid token');
		}
	}
}
