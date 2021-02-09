const mongoose=require('mongoose')
const validator=require('validator')

const userSchema = new mongoose.Schema({
    username : {

        type:String,
        required:true,
        unique:true

    },
    email : {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        validate: (value) => {
        return validator.isEmail(value)
        }
    },
    phone:{
        type:Number,
        required:true,


    },
    adress:{
        type:String,
        required:true

    }
})

module.exports = mongoose.model('Users',userSchema)