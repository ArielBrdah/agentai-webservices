import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';

@Module({
	imports: [
		JwtModule.register({
		  secret: process.env.JWT_SECRET || 'your-secret-key',
		  signOptions: { expiresIn: '1h' },
		}),
		ConfigModule,
	  ],
	controllers: [AuthController],
	providers: [AuthService]
})
export class AuthModule {
}
