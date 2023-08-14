const mongoose = require('mongoose')

const productSchema = mongoose.Schema({
    title: {
        type: String,
    },
    description: {
        type: String
    },
    price: {
        type: Number,
    },
    rating: {
        type: Number,
        default: 0
    },
    reviews: {
        type: String,
        default: 0
    },
    mediaCount: {
        type: Number,
        default: 7
    }
    
})

module.exports = mongoose.model("product", productSchema);