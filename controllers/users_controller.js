const User = require('../models/user');
module.exports.profile = function(req,res)
{
    User.findById(req.params.id,function(err,user)
    {
        return res.render('user_profile',
        {
            title:'User Profile',
            profile_user:user
        });
    });
    
}

// render the sign up page
module.exports.signUp = function(req,res)
{
    if(req.isAuthenticated())
    {
        return res.redirect('/users/profile');
    }
    return res.render('user_sign_up',
    {
        title:"Codeial | Sign Up"
    });
}

module.exports.update = function(req,res)
{
    if(req.user.id == req.params.id)
    {
        // Or --> User.findByIdAndUpdate(req.params.id,req.body) and same follows
        User.findByIdAndUpdate(req.params.id,{name:req.body.name,email:req.body.email},function(err,user)
        {
            return res.redirect('back');
        });
    }
    else{
        // Http status codes like:404,200,etc
        return res.status(401).send('Unathorized');
    }
}

// render the sign in page
module.exports.singIn = function(req,res)
{
    if(req.isAuthenticated())
    {
        return res.redirect('/users/profile');
    }
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
    req.flash('success','Logged in successfully');
    return res.redirect('/');
}
module.exports.destroySession = function(req,res)
{

    req.logout();
    req.flash('success','You have logged out');
    return res.redirect('/');
}