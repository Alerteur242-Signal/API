const mongoose = require('mongoose');

const alerte = new mongoose.Schema({
    category: {
        type: String,
        required: true,
        index: true
    },
    description: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: false,
    },
    position: {
        lat: {
            type: Number,
            required: true,
        },
        long: {
            type: Number,
            required: true,
        }
    },
    datetime: {
        type: Date,
        required: true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
},
{
    timestamps: true,
});

export default mongoose.model('Alerte', alerte);