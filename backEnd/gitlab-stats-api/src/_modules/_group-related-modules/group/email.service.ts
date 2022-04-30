import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer'



@Injectable()

//°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°
export class EmailService {


  sendEmail() {
    console.log('________Sending Email to Admin now________');
    this.transporter.sendMail(this.mailOptions, function(error, info){
      if (error) { console.log(error) }
      else { console.log('Email sent: ' + info.response) }
    });

  }

  transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'fahoumlouda999@gmail.com',
      pass: 'Tibarrabarka111'
    }
  })

  mailOptions = {
    from: 'fahoumlouda999@gmail.com',
    to: 'fahem@w11k.de',
    subject: 'Some Error occurred on the Server',
    text: 'Check it out ASAP !',
    attachments: [
      { path: 'log-file.txt' },
      { path: 'error-file.txt' },
    ]
  };



}  //°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°°
