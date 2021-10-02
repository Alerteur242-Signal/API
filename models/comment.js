const mongoose = require('mongoose');

const comment = new mongoose.Schema({
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
    content: {
        type: String,
        required: true
    }
},
{
    timestamps: true,
});

export default mongoose.model('Comment', comment);