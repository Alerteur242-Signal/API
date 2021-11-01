const axios = require('axios');
const querystring = require('querystring');

module.exports = {
    sendSMS: (req, res) => {
        let tel = "242068539223";
        let code = "9999";

        var data = `{
            \n\t"to":${tel},
            \n\t"content":"Bienvenu sur Mokebisi, votre code OTP est : ${code}",
            \n\t"from":"Mokebisi",
            \n\t"dlr":"yes",
            \n\t"dlr-method":"GET", 
            \n\t"dlr-level":"2", 
            \n\t"dlr-url":"http://yourcustompostbackurl.com"\n
        }`;

        var config = {
            method: 'post',
            url: 'https://rest-api.d7networks.com/secure/send',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': 'Basic b2tnZDU1NzU6MTZIaHE2Snc='
            },
            data: data
        };

        axios(config)
            .then(function (response) {
                console.log(response.data);
            })
            .catch(function (error) {
                console.log(error);
            });

    }
}