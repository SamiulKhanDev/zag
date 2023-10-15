import { Injectable } from '@nestjs/common'
import * as nodemailer from 'nodemailer'
import { promisify } from 'util'
import { randomInt } from 'crypto'
import { HashService } from '../hashservice/hash.service'
import { ConfigService } from '@nestjs/config'

@Injectable()
export class OtpService {
  constructor(
    private readonly hashService: HashService,
    private readonly configService: ConfigService,
  ) {}

  async generateOtp() {
    return await randomInt(10000, 999999)
  }

  async sendOtp(userId: String, otp) {
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        user: this.configService.get('EMAIL'),
        pass: this.configService.get('PASSWORD'),
      },
    })

    const sendMail = promisify(transporter.sendMail).bind(transporter)
    const mailOptions = {
      from: 'test.zagassignment@gmail.com',
      to: userId,
      subject: 'Do not Share',
      text: `your otp is ${otp}`,
    }
    await sendMail(mailOptions)
  }
  async verifyOtp(data, hash) {
    const computedHash = await this.hashService.generateHash(data) //regerating the hash from the given data.
    return computedHash === hash
  }
}
