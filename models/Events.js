const User = require('./user-model')
const { passwordStrength } = require('check-password-strength')

exports.validateUser = async (req) => {
    const { username, email, password } = req
    const user = await User.findOne('Atman123').error(e => console.log(e))
    console.log(user)
    if (user) {
        return ({ error: true, message: 'User already exists' })
    }
    else {
        return ({ error: false, message: 'User registered successfully' })
    }
}

exports.validateNumber = (num) => {
    if (num > 1) {
        return true
    }
    else {
        return false
    }
}

exports.validatePassword = (password) => {
    const { id } = passwordStrength(password)
    if (id < 2) {
        return false
    }
    else {
        return true
    }
}