const Vonage = require('@vonage/server-sdk');

const {
    SMS_API_KEY,
    SMS_API_SECRET
} = process.env;

const vonage = new Vonage({
    apiKey: SMS_API_KEY,
    apiSecret: SMS_API_SECRET
})

module.exports = {
    sendSMS: (req, res) => {
        console.log("enter");
        const from = "Mokebisi App"
        const to = "242068539223"
        const text = 'Bienvenue chez Mokebisi App, votre code OTP est : 1234 '

        vonage.message.sendSms(from, to, text, (err, responseData) => {
            if (err) {
                console.log(err);
                res.status(500).json({
                    status: 'error',
                    message: 'Error sending SMS'
                });
            } else {
                if (responseData.messages[0]['status'] === "0") {
                    console.log(`Message sent successfully to ${to}`);
                    res.status(200).json({
                        status: 'success',
                        message: "SMS sent successfully",
                        data: responseData
                    });
                } else {
                    console.log(`Message failed with error: ${responseData.messages[0]['error-text']}`);
                    res.status(400).json({
                        status: 'error',
                        message: "SMS failed",
                        data: responseData
                    });
                }
            }
        })

    }
}