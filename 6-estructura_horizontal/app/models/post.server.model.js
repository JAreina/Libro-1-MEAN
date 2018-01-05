const PostSchema = new Schema({
title: {
type: String,
required: true
},
content: {
type: String,
required: true
},
author: {
type: Schema.ObjectId,
ref: 'Usuario'
}
});
mongoose.model('Post', PostSchema);
