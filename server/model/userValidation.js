import mongoose from 'mongoose'

const userValidationModel = mongoose.model("userValidation", {
    username: {type: String, required: true, unique: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true}
})

export {userValidationModel as user}