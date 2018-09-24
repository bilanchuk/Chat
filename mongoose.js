var mongoose = require('mongoose');
mongoose.connect('mongodb://user:user22@ds251902.mlab.com:51902/loginform');
console.log('mongoDB connected!!');
module.exports=mongoose;