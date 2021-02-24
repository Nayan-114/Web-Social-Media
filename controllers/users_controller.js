const User = require('../models/user');
module.exports.profile = function(req,res)
{
    return res.render('user_profile',
    {
        title:'profile'
    });
}

// render the sign up page
module.exports.signUp = function(req,res)
{
    return res.render('user_sign_up',
    {
        title:"Codeial | Sign Up"
    });
}

// render the sign in page
module.exports.singIn = function(req,res)
{
    return res.render('user_sign_in',
    {
        title:"Codieal | Sign In"
    });
}

// get the sign up data
module.exports.create = function(req,res)
{
    if(req.body.password != req.body.confirm_password)
    {
        return res.redirect('back');
    }
    
    User.findOne({email:req.body.email},function(err,user)
    {
        if(err)
        {
            console.log('Error finding the user:' ,err);
            return;
        }
        if(!user)
        {
            User.create(req.body,function(err,user)
            {
                if(err)
                {
                    console.log('Error creating the user:' ,err);
                    return;
                }
                return res.redirect('/users/sign-in');       
            });
        }
    });
}
// Sign in and create  a session for the user
module.exports.createSession= function(req,res)
{
    // TODO Later
}