import nodemailer from 'nodemailer';

function sendEmail(options) {
  const transport = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'devsearch.info@gmail.com',
      pass: '@d2021s@'
    }
  })
  const mailOptions = {
    from: options.from,
    to: options.to,
    subject: options.subject,
    html: options.text,
    attachments: options.data
  }
  transport.sendMail(mailOptions, (err, info) => {
    if (err)
      console.log(err);
  })
  // console.log('Email sent')
}

export default sendEmail;