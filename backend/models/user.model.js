const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');

const userSchema = mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    firstname: { type: String },
    lastname: { type: String },
    telephone: { type: String },
    active: { type: Boolean, default: true },
  },
  { timestamps: {} }
);

userSchema.pre('save', function (next) {
    var user = this;

   
    if (!user.isModified('password'))
        return next();

    
    bcrypt.genSalt(5, function (err, salt) {
        if (err)
            return next(err);

        bcrypt.hash(user.password, salt, null, function (err, hash) {
            if (err)
                return next(err);
            user.password = hash;
            next();
        });
    });
});


userSchema.methods.verifyPassword = function (password, next) {
    bcrypt.compare(password, this.password, function (err, isMatch) {
        if (err)
            return next(err);
        next(null, isMatch);
    });
};

module.exports = mongoose.model('User', userSchema);
