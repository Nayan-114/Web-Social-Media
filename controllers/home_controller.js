const Post = require('../models/post');
const User = require('../models/user');
// const Post = require('../models/user');

module.exports.home = async function(req,res)
{
    console.log(req.cookies);
    res.cookie('user_id',25);
    // without Async Await remove async from above function
    
//     Post.find({}).populate('user')
//     .populate({
//         path:'comments',
//         populate:
//         {
//             path:'user'
//         }
//     }).exec(function(err, posts){
//         User.find({},function(err,users)
//         {
//             return res.render('home', {
//                 title: "Codeial | Home",
//                 posts:  posts,
//                 all_users:users
//             });
//         });
       
//     })
// }


// With Asyn await
    try 
    {
        let posts = await Post.find({}).populate('user')
        .populate({
        path:'comments',
        populate:
            {
                path:'user'
            }
        });
       let users = await User.find({});
    
       return res.render('home', {
                title: "Codeial | Home",
                posts:  posts,
                all_users:users
            });
    } catch (error) {
        console.log('Error',error);
        return;
    }
       
}