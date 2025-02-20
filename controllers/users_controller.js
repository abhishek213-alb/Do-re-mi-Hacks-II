const User = require('../models/user');
const fs = require('fs');
const path = require('path');

module.exports.profile = function(req, res){
    User.findById(req.params.id, function(err, user){
        return res.render('user_profile', {
            title: 'User Profile',
            profile_user: user
        });
    })
}

module.exports.game1 = function(req, res){
    User.findById(req.params.id, function(err, user){
        return res.render('game1',{
            title: 'Game1',
            profile_user: user
        })
    })
}

module.exports.update_game1 = function(req, res){
    if(req.user.id == req.params.id){
        try{
            User.findByIdAndUpdate(req.params.id, {$set:{game1: req.body.game1}}, function (err, data) {
                if (err){
                    console.log(err)
                }
                else{
                    console.log("Updated User : ", data);
                }
            });
            console.log(req.body.game1);
            return res.redirect('back');
        }
        catch(err){
            return res.redirect('back');
        }
    }
}

module.exports.update = async function(req, res){
    if(req.user.id == req.params.id){
        try{
            let user = await User.findById(req.params.id);
            User.uploadedAvatar(req, res, function(err){
                if(err) {console.log('Multer Error----', err)}

                // user.name = req.body.name;
                // user.email = req.body.email;

                if(req.file){

                    if(user.avatar){
                        fs.unlinkSync(path.join(__dirname, '..', user.avatar));
                    }

                    // saving the path of the uploaded file into the avatar field in the user
                    user.avatar = User.avatarPath + '/' + req.file.filename;
                }
                user.save();
                return res.redirect('back');
            });
        }
        catch(err){
            return res.redirect('back');
        }
    }
    else{
        return res.status(401).send('Unauthorized');
    }
}

module.exports.signUp = function(req, res){
    if(req.isAuthenticated()){
        return res.redirect('/users/profile');
    }

    return res.render("user_signup",{
        title: 'Sign Up'
    })
}

module.exports.signIn = function(req, res){
    if(req.isAuthenticated()){
        return res.redirect('/users/profile');
    }

    return res.render("user_signin",{
        title: "Sign In"
    })
}

// get sign up data
module.exports.create = function(req, res){
    if(req.body.password != req.body.confirm_password){
        return res.redirect('back');
    }

    User.findOne({email: req.body.email}, function(err, user){
        if(err){
            console.log('error in finding user in signing up');
            return;
        }
        if(!user){
            User.create(req.body, function(err, user){
                if(err){
                    console.log('error in creating user while signing up');
                    return;
                }
                return res.redirect('/users/sign-up');
            });
        }
        else{
            return res.redirect('back');
        }
    })
}

// sign-in and create session for user
module.exports.createSession = function(req, res){
    return res.redirect('/');
}

module.exports.destroySession = function(req, res){
    req.logout();

    return res.redirect('/');
}
