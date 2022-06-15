const LocalStrategy = require('passport-local').Strategy //alows authentication using username and password
const bcrypt = require('bcrypt') //encryption

var emailError = 'Email Incorrect'
var passwordError = 'Password Incorrect'

function initialize(passport, get_by_email, get_by_id){ 
    const authUser = async (email, password, done) => { //code waits until password is compared
        const user = get_by_email(email) //get the email
        if(user == null){ //if email is incorrect
            return done(null, false, emailError) //call result
        }
        try {
            if(await bcrypt.compare(password, user.password)) { //uses bcrypt to compare encrypted password to the password entered
                return done(null, user) //call result
            } else {
                return done(null, false, passwordError) //call result
            }
        } catch (e){
            return done(e) //call result
        }
    }
    passport.use(new LocalStrategy({usernameField: 'email' }, authUser)) //authorises by email
    passport.serializeUser((user, done) => done(null, user.id)) //which data of user should be stored in session (id)
    passport.deserializeUser((id, done) => {return done(null, get_by_id(id))}) //key (id) matched with JSON
}

module.exports = initialize //export code from initialize function