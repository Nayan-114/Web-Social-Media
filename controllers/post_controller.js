const Post = require('../models/post');
const Comment = require('../models/comment');

// Without async await
// module.exports.create = function(req, res){
//     Post.create({
//         content: req.body.content,
//         user: req.user._id
//     }, function(err, post){
//         if(err){console.log('error in creating a post'); return;}

//         return res.redirect('back');
//     });
// }

// With Async await
module.exports.create = async function(req, res){
    try 
    {
        await Post.create({
            content: req.body.content,
            user: req.user._id
        });
        return res.redirect('back');
    } catch (error) {
        console.log('Error',error); 
        return;   
    }
}


module.exports.destroy = function(req, res){
    Post.findById(req.params.id, function(err, post){
        // if(post.user == req.user._id) we do not use it because to compare id's of 2 objects,
        // should be converted to string,So mongoose automatically convert it when we use 'id' instead of '._id'
        // .id means converting the object id into string
        if (post.user == req.user.id){
            post.remove();

            Comment.deleteMany({post: req.params.id}, function(err){
                return res.redirect('back');
            });
        }else{
            return res.redirect('back');
        }

    });
}