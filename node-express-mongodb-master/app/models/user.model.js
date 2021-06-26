const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports = (mongoose, uniqueValidator) => {
    const Schema = mongoose.Schema;
    const userSchema = new Schema({
        name: {
            type: String,
            required: true,
        },
        password: {
            type: String,
            required: true
        },
        phoneNumber: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
    }, {
        timestamps: true,
    });

    userSchema.methods.hashPassword = async (password) => {
        return await bcrypt.hashSync(password, 10);
    }
    userSchema.methods.compareUserPassword = async (inputtedPassword, hashedPassword) => {
        return await bcrypt.compare(inputtedPassword, hashedPassword)
    }
    userSchema.methods.generateJwtToken = async (payload, secret, expires) => {
        return jwt.sign(payload, secret, expires)
    }
    userSchema.plugin(uniqueValidator, {
        message: '{PATH} Already in use'
    });
    const user = mongoose.model("user", userSchema);
    return user;
};