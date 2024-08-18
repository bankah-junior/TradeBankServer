const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
})


userSchema.statics.login = async function(name, password) {
    const user = await this.findOne({name});
    if(user){
        const match = await bcrypt.compare(password, user.password);
        if(match){
            return user;
        }
    }
    throw new Error('Wrong Credentials');
}


userSchema.statics.signup = async function(name, password) {
    const userExists = await this.findOne({name});
    if(userExists){
        throw new Error('User Already Exists');
    }

    const hashedPassword = await bcrypt.hash(password, 15);
    const newUser = new this({
        name,
        password: hashedPassword
    })
    return newUser.save();
}

const User = mongoose.model('User', userSchema)

module.exports = User
