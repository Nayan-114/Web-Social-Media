const Post = require('../models/post');
module.exports.home = function(req,res)
{
    console.log(req.cookies);
    res.cookie('user_id',25);
    // Post.find({},function(err,posts)
    // {
    //     if(err)
    //     {
    //         console.log('Error finding the posts');
    //         return;
    //     }
    //     return res.render('home',
    //     {
    //         title:"Home",
    //         posts:posts
    //     });
    // });

    
    // Previous method can  aloso be used
    // But As we need the name so we are populating the whole user object
    Post.find({}).populate('user').exec(function(err,posts)
    {
        if(err)
        {
            console.log('Error finding the posts');
            return;
        }
        return res.render('home',
        {
            title:"Home",
            posts:posts
        });
    })
}