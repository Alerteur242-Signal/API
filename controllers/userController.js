const User = require("../models/user");
const axios = require("axios");

function randomRecovery() {
    return Math.floor(1000 + Math.random() * 9000);
}

const accountSid = process.env.TWILIO_ACCOUNT_SID; // Your Account SID from www.twilio.com/console
const authToken = process.env.TWILIO_AUTH_TOKEN; // Your Auth Token from www.twilio.com/console

const client = require('twilio')('AC83377f5bed87355bd9f1837ffc67912e', "9f031c53cb871b209f0f602328e1be96", {
    lazyLoading: true
});

module.exports = {
    signinWithPhoneNumber: async (req, res, next) => {
        const {
            phoneNumber
        } = req.body;

        User.findOne({
                phoneNumber: phoneNumber,
            })
            .then((user) => {
                if (!user) {
                    return res.status(200).json({
                        code: "error",
                        message: "Utilisateur non trouvé !",
                    });
                }

                let code = randomRecovery();

                User.updateOne({
                        _id: user._id
                    }, {
                        lastOTP: code,
                    })
                    .then(() => {
                        client.messages
                            .create({
                                body: `Bienvenu sur Mokebisi, voici votre code OTP : ${code}`,
                                messagingServiceSid: 'MG7e4dacc00e9333ecc9adf6251244b443',
                                to: req.body.phoneNumber
                            })
                            .then(message => res.status(200).json({
                                code: "success",
                                message: "Code OTP envoyé !",
                                id: message.sid
                            }))
                            .catch(err => {
                                console.log(err);
                                res.status(400).json({
                                    code: "error",
                                    message: "Erreur lors de l'envoi du code OTP !",
                                });
                            });

                    })
            })
            .catch((error) =>
                res.status(400).json({
                    code: "error",
                    message: `${error}`
                })
            );
    },

    signupWithPhoneNumber: async (req, res, next) => {

        let code = randomRecovery();

        const user = new User({
            phoneNumber: req.body.phoneNumber,
            name: req.body.name,
            firstname: req.body.firstname,
            lastOTP: code,
        });
        user
            .save()
            .then(() => {
                client.messages
                    .create({
                        body: `Bienvenu sur Mokebisi, voici votre code OTP : ${code}`,
                        messagingServiceSid: 'MG7e4dacc00e9333ecc9adf6251244b443',
                        to: req.body.phoneNumber
                    })
                    .then(message => res.status(200).json({
                        code: "success",
                        message: "Utilisateur créé !",
                        id: message.sid
                    }))
                    .catch(err => {
                        console.log(err);
                        res.status(400).json({
                            code: "error",
                            message: "Erreur lors de l'envoi du code OTP !",
                        });
                    });
            })
    }

}