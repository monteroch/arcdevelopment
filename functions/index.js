const functions = require('firebase-functions');
const nodemailer = require("nodemailer");
const admin = require("firebase-admin");

const config = functions.config();
const cors = require('cors')({origin: true})
admin.initializeApp();

const transporter = nodemailer.createTransport({
    service: "Gmail", 
    auth: {user:config.user.email, pass:config.user.password}
});

let mailOptions = {
    from: 'Arc Development', 
};

// Create and Deploy Your First Cloud Functions
// https://firebase.google.com/docs/functions/write-firebase-functions

exports.sendMail = functions.https.onRequest((request, response) => {
    cors(request, response, () => {
        const { name, email, phone, message, total, service, platiforms, features, customFeatures, users, category } = request.query;
        
        if(total){
            if(category){
                mailOptions = {
                    ...mailOptions, 
                    to: "test@test.com", 
                    subject: "Estimate received", 
                    html: `
                        <p style="font-size": 16px>From: ${name}</p>
                        <p style="font-size": 16px>Email: ${email}</p>
                        <p style="font-size": 16px>Phone: ${phone}</p>
                        <p style="font-size": 16px>Message: ${message}</p>
                        <p style="font-size": 16px>Total: ${total}</p>
                        <p style="font-size": 16px>Service: ${service}</p> 
                        <p style="font-size": 16px>Category: ${category}</p> 
                    `
                };
            }else{
                mailOptions = {
                    ...mailOptions, 
                    to: "test@test.com", 
                    subject: "Estimate received", 
                    html: `
                        <p style="font-size": 16px>From: ${name}</p>
                        <p style="font-size": 16px>Email: ${email}</p>
                        <p style="font-size": 16px>Phone: ${phone}</p>
                        <p style="font-size": 16px>Message: ${message}</p>
                        <p style="font-size": 16px>Total: ${total}</p>
                        <p style="font-size": 16px>Service: ${service}</p> 
                        <p style="font-size": 16px>Platforms: ${platforms}</p> 
                        <p style="font-size": 16px>Features: ${features}</p> 
                        <p style="font-size": 16px>Custom Features: ${customFeatures}</p> 
                        <p style="font-size": 16px>Custom Users: ${users}</p> 
                    `
                };
            }
            transporter.sendMail(mailOptions, error => {
                if(error){
                    response.send(error);
                }else{
                    response.send("Message sent successfully");
                }
            });
        }else{
            mailOptions = {
                ...mailOptions, 
                to: "test@test.com", 
                subject: "Message received!", 
                html: `
                    <p style="font-size": 16px>From: ${name}</p>
                    <p style="font-size": 16px>Email: ${email}</p>
                    <p style="font-size": 16px>Phone: ${phone}</p>
                    <p style="font-size": 16px>Message: ${message}</p>
                `
            };
    
            transporter.sendMail(mailOptions, error => {
                if(error){
                    response.send(error);
                }else{
                    response.send("Message sent successfully");
                }
            });
    
            mailOptions = {
                ...mailOptions, 
                to: email, 
                subject: "We have received your message!", 
                html: `
                    <p style="font-size": 16px>From: ${name}</p>
                    <p style="font-size": 16px>Email: ${email}</p>
                    <p style="font-size": 16px>Phone: ${phone}</p>
                    <p style="font-size": 16px>Message: ${message}</p>
                `
            };
    
            transporter.sendMail(mailOptions);
        }

    })
});
