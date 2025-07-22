import nodemailer from 'nodemailer';
import Token from '../models/Token.js';
import crypto from 'crypto';
import 'dotenv/config';

const transporter = nodemailer.createTransport({
    service: "Gmail",
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      // TODO: replace `user` and `pass` values from <https://forwardemail.net>
      user: "mola2022estateagency@gmail.com",
      pass: "jjis mulj fypt goyq",
    },
  });

export const sendEmailToken = async (req, res, next) => {
    try {
        var token = new Token({ email: req.body.email, token: crypto.randomBytes(3).toString('hex') });
            token.save(function (err) {
              if(err){
                return res.json({status:"error",msg:err.message});
              }});

                // send mail with defined transport object
                await transporter.sendMail({
                  from: '"Mola App" <mola2022estateagency@gmail.com>', // sender address
                  to: req.body.email, // list of receivers
                  subject: "Verification", // Subject line
                  text:"Hi, Mola App User!",
                  html: `Hi, Mola App User!. Here is your otp. <b><em> ${token['token']} </em></b>`// plain text body
                }, (error, info) => {
                  if (error) {
                    return res.status(402).json({status:"error", msg:'There was an error otp has not been sent!!'});
                  } else {
                    return res.status(200).json({status:"ok", msg:'An OTP has been sent to ' + req.body.email + '. It will be expire after one day. If you did not get any verification email, please click on resend token.'});
                  }
            });
        }
        catch (err) {
                next(err);
            }
        
    }

    export const confirmEmail = async function (req, res, next) {
        Token.findOne({ email: req.params.email, token: req.params.token }, function (err, token) {
            // token is not found in the database i.e. token may have expired 
            if (!token){
                return res.json({status:"error", msg:'Your verification link may have ehxpired. Please click on resend for verify your Email.', data:err});
            }   
                      
            return res.status(200).json({status: "ok", msg:'Your account has been successfully verified'});
                          
        });
    };
