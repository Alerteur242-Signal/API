const mongoose = require('mongoose');

const fake = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    alerte: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Alerte',
        required: true
    },
    status: {
        type: Boolean,
        required: true
    }

},
{
    timestamps: true,
});

export default mongoose.model('Fake', fake);