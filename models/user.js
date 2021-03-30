const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');
const AVATAR_PATH = path.join('/uploads/users/avatars');

const userSchema = new mongoose.Schema(
    {
        email:
        {
            type: String,
            required: true,
            unique: true
        },
        password:
        {
            type: String,
            required: true
        },
        name:
        {
            type: String,
            required: true
        },
        // Field to store the path of the file
        avatar:
        {
            type:String
        }
    },{
        timestamps:true
    });



   let storage = multer.diskStorage({
    //    'cb' is the call back function
        destination: function (req, file, cb) {
          cb(null, path.join(__dirname,'..',AVATAR_PATH));
        },
        filename: function (req, file, cb) {
          cb(null, file.fieldname + '-' + Date.now());
        //   Here fieldname is avatar from above schema
        }
      });

// Static methods
    userSchema.statics.uploadedAvatar = multer({storage: storage}).single('avatar');
    // single used so that we can upload only one file not multiple files
    userSchema.statics.avatarPath = AVATAR_PATH;


    const User = mongoose.model('User',userSchema);
    module.exports = User;