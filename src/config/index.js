const mongoose = require('mongoose')



exports.connectDB = async () => {
    try {
        await mongoose.connect('mongodb+srv://User:kPyFinuo5g2uoy12@experimentalcluster.gj356.mongodb.net/ecommerce')
        // await mongoose.connect('mongodb://127.0.0.1:27017/c70130')
        console.log('base conectada')
    } catch (error) {
        console.log(error)
    }   
} 


// User - kPyFinuo5g2uoy12
