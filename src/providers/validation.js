const validations = {
    emailRules: [
    v => !!v || 'E-mail is required',
    v => /.+@.+\..+/.test(v) || 'Please enter a valid E-mail',
    ],
    passwordRules: [
    v => !!v || 'Password is required',
    v => /^([a-zA-Z0-9_-]){8,}$/.test(v) || 'Password must consist of atleast 8 characters',
    ],
    tableIndex: (index, page, limit) => page <= 1 ? (index + 1) : (limit * (page - 1)) + (index + 1),
}

module.exports = validations
