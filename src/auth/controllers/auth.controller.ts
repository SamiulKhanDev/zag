import { Controller, Post, Body, Res, Get } from '@nestjs/common'
import { AuthService } from '../services/authservice/auth.service'
import { Response } from 'express'
import { Public } from '../public/public.decorator'
import { UserDto } from '../dto/user.dto'
import { OtpService } from '../services/otpservice/otp.service'
import { HashService } from '../services/hashservice/hash.service'
@Controller('api/v1/auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly otpService: OtpService,
    private readonly hashService: HashService,
  ) {}

  @Public()
  @Post('sendotp')
  async sendOtp(@Body() body: UserDto) {
    const userId = body.userId
    if (!userId) {
      return {
        success: false,
        info: 'please provide an email',
      }
    }
    const otp = await this.otpService.generateOtp()
    const timeToLive = 1000 * 60 * 2
    const expires = Date.now() + timeToLive
    const data = `${userId}.${otp}.${expires}`
    const hashOtp = this.hashService.generateHash(data)
    await this.otpService.sendOtp(userId, otp)
    return {
      success: true,
      hash: `${hashOtp}.${expires}`,
    }
  }

  @Public()
  @Post('verifyotp')
  async verifyOtp(@Body() body: UserDto, @Res() response: Response) {
    const userId = body.userId
    const hash = body.hash
    const otp = body.otp
    if (!otp) {
      response.status(404).send({
        success: false,
        info: 'please provide an otp',
      })
      return
    }
    const [hashedOtp, expires] = hash.split('.')
    if (Date.now() > parseInt(expires)) {
      response.status(404).send({
        success: false,
        info: 'otp has been expired',
      })
      return
    }

    const data = `${userId}.${otp}.${expires}`
    const isValid = await this.otpService.verifyOtp(data, hashedOtp)
    if (!isValid) {
      response.status(404).send({
        success: false,
        info: 'provided otp is not valid',
      })
      return
    }

    const token = await this.authService.signIn(userId)
    response.cookie('accessToken', token, { httpOnly: true })
    response.status(200).send({
      success: true,
    })
  }

  @Get('signout')
  logout(@Res() response: Response) {
    response.clearCookie('accessToken')
    response.status(200).send({
      success: true,
    })
  }
}
