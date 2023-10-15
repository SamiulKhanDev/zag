import { Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}
  async signIn(userId: String) {
    const payload = {
      userId: userId,
    }
    return await this.jwtService.signAsync(payload)
  }
}
