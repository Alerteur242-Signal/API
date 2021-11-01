module.exports = {
    sendSMS: async (req, res) => {

        const accountSid = process.env.TWILIO_ACCOUNT_SID; // Your Account SID from www.twilio.com/console
        const authToken = process.env.TWILIO_AUTH_TOKEN; // Your Auth Token from www.twilio.com/console

        const client = require('twilio')('AC83377f5bed87355bd9f1837ffc67912e', "9f031c53cb871b209f0f602328e1be96", {
            lazyLoading: true
        });


        client.messages
            .create({
                body: 'CODE OTP : 1234',
                messagingServiceSid: 'MG7e4dacc00e9333ecc9adf6251244b443',
                to: '+242068539223'
            })
            .then(message => console.log(message.sid))
            .done();


    }
}