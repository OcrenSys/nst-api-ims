import { Controller, Post, Body } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';

@ApiTags('Authentication')
@ApiBearerAuth()
@Controller('authentication')
export class AuthenticationController {
  constructor(private readonly authenticationService: AuthenticationService) {}

  @Post()
  login(@Body() user) {
    return this.authenticationService.login(user);
  }
}
