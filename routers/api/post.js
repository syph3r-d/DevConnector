const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const auth = require("../../middleware/auth");


const User = require("../../models/User");
const Post = require("../../models/Post");
const profile=require('../../models/Profile');

//@route    post api/post
//@desc     add post
//@access   Private
router.post(
  "/",
  [auth,[check("text", "Text is required").not().isEmpty()]],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    } 

    try {
        const user=await User.findById(req.user.id).select('-password');
        const newPost=new Post({
            text:req.body.text,
            name:user.name,
            avatar:user.avatar,
            user:req.user.id
        });
        const post=await newPost.save();
        res.json(post);
        
    } catch (err) {
        console.log(err.message);
        res.status(500).send('Server Error');
    }

  }
);

//@route    GET api/post
//@desc     get all post
//@access   private
router.get('/',auth,async (req,res)=>{
    try {
        const posts=await Post.find().sort({date:-1});
        res.json(posts);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('server Error')
    }
})

//@route    get api/post/:post_id
//@desc     get post by id
//@access   private

router.get('/:post_id',auth,async (req,res)=>{
    try {
        const post=await Post.findById(req.params.post_id);
        if(!post){
            return res.status(404).json({msg:"Post not found"});
        }
        res.json(post);
    } catch (err) {
        if(err.kind='ObjectId'){
            return res.status(404).json({msg:'Post not found'});
        }
        console.error(err.message);
        res.status(500).send('Server Error');
    }
})

//@route    delete api/post/:post_id
//@desc     delete post by id
//@access   private
router.delete('/:post_id',auth, async (req,res)=>{
    try {
        const post=await Post.findById(req.params.post_id);
        if(!post){
            return res.status(404).json({msg:"Post not found"});
        }
        //check user
        if(post.user.toString()!== req.user.id){
            return res.status(401).json({msg:"Access denied"});
        }
        await post.remove();
        res.send('Post removed')
    } catch (err) {
        if(err.kind='ObjectId'){
            return res.status(400).json({msg:'Post not found'});
        }
        console.error(err.message);
        res.status(500).send('Server Error');
    }
})

//@route    put api/post/like/:post_id
//@desc     like a post by id
//@access   private
router.put('/like/:post_id',auth,async (req,res)=>{
    try {
        const post=await Post.findById(req.params.post_id);
        if(!post){
            return res.status(404).json({msg:"Post not found"});
        }
        //check for if the user already liked
        if((post.likes.filter(i=>(i.user==req.user.id))).length>0){
            return res.status(400).json({msg:"Post already liked"});
        }
        post.likes.unshift({user:req.user.id.toString()});
        await post.save();
        res.json(post.likes);
    } catch (err) {
        if(err.kind='ObjectId'){
            return res.status(404).json({msg:'Post not found'});
        }
        console.error(err.message);
        res.status(500).send('Server Error');
    }
})
//@route    delete api/post/unlike/:post_id
//@desc     unlike a post by id
//@access   private
router.delete('/unlike/:post_id',auth,async (req,res)=>{
    try {
        const post=await Post.findById(req.params.post_id);
        if(!post){
            return res.status(404).json({msg:"Post not found"});
        }
        //check for if the user already liked
        if((post.likes.filter(i=>(i.user.toString()==req.user.id))).length===0){
            return res.status(400).json({msg:"Post not yet liked"});
        }
        const removeIndex=post.likes.map(i=>i.user.toString()).indexOf(req.user.id);
        post.likes.splice(removeIndex,1);
        await post.save();
        res.json(post.likes);
    } catch (err) {
        if(err.kind='ObjectId'){
            return res.status(404).json({msg:'Post not found'});
        }
        console.error(err.message);
        res.status(500).send('Server Error');
    }
})
//@route    post api/post/comment/:post_id
//@desc     comment a post by id
//@access   private
router.post('/comment/:post_id',auth,async (req,res)=>{
    try {
        const post=await Post.findById(req.params.post_id);
        const user=await User.findById(req.user.id).select('-password');
        if(!post){
            return res.status(404).json({msg:"Post not found"});
        }
        const comment={
            user:req.user.id,
            text:req.body.text,
            name:user.name,
            avatar:user.avatar,
        }
        post.comments.unshift(comment);
        await post.save();
        res.json(post.comments);
    } catch (err) {
        if(err.kind='ObjectId'){
            return res.status(404).json({msg:'Post not found'});
        }
        console.error(err.message);
        res.status(500).send('Server Error');
    }
})
//@route    delete api/post/:post_id/:comment_id
//@desc     delete comment in a post by id
//@access   private
router.delete('/:post_id/:comment_id',auth,async (req,res)=>{
    try {
        const post=await Post.findById(req.params.post_id);
        if(!post){
            return res.status(404).json({msg:"Post not found"});
        }
        //check for the comment
        const removeIndex=post.comments.map(i=>i.id.toString()).indexOf(req.params.comment_id);
        if(removeIndex===-1){
            return res.status(404).json({msg:"Comment not found"});
        }
        //check for ownership
        console.log(post.comments[removeIndex].user.toString());
        console.log(req.user.id.toString());
        if(post.comments[removeIndex].user.toString() !==req.user.id.toString()){
            return res.status(400).json({msg:"User unauthorized"})
        };
        post.comments.splice(removeIndex,1);
        await post.save();
        res.json(post.comments);
    } catch (err) {
        if(err.kind='ObjectId'){
            return res.status(404).json({msg:'Post not found'});
        }
        console.error(err.message);
        res.status(500).send('Server Error');
    }
})

module.exports = router;
