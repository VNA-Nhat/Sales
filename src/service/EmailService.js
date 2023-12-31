const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
dotenv.config()
var inlineBase64 = require('nodemailer-plugin-inline-base64');

const sendEmailCreateOrder = async (email, orderItems) => { // tao ham nhan email va ds dat hang
  let transporter = nodemailer.createTransport({ //cấu hình thông tin kết nối đến máy chủ SMTP 
    host: "smtp.gmail.com",
    port: 465, //port 465 thường được sử dụng cho SSL/TLS.
    secure: true, // true for 465, false for other ports
    auth: {
      user: process.env.MAIL_ACCOUNT, // generated gmail user
      pass: process.env.MAIL_PASSWORD, // generated gmail password
    },
  });
  transporter.use('compile', inlineBase64({cidPrefix: 'somePrefix_'})); // nhúng hình ảnh vào email bằng cách thêm tiền tố cidPrefix: 'somePrefix_

  let listItem = '';
  const attachImage = []
  orderItems.forEach((order) => {
    listItem += `<div>
    <div>
      Bạn đã đặt sản phẩm <b>${order.name}</b> với số lượng: <b>${order.amount}</b> và giá là: <b>${order.price} VND</b></div>
      <div>Bên dưới là hình ảnh của sản phẩm</div>
    </div>`
    attachImage.push({path: order.image})
  })

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: process.env.MAIL_ACCOUNT, // sender address
    to: email, // list of receivers
    subject: "Bạn đã đặt hàng tại store", // Subject line
    text: "Hello world?", // plain text body
    html: `<div><b>Bạn đã đặt hàng thành công</b></div> ${listItem}`,
    attachments: attachImage,
  });
}

module.exports = { sendEmailCreateOrder }