const express=require('express')
const router=express.Router();
const auth=require('../../middleware/auth')

const Profile=require('../../models/Profile')
const User=require('../../models/User')
const { check, validationResult } = require("express-validator");

//@route    GET api/profile/me
//@desc     Get current users profile
//@access   Private

router.get('/me',auth,async (req,res)=>{
    try{
        const profile=await Profile.findOne({user:req.user.id}).populate('user',['name','avatar']);
        if(!profile){
            return res.status(400).json({msg:'There is no profile for this user'});
        }
        res.json(profile)
    }
    catch(err){
        console.error(err.message);
        res.status(500).send("server Error")
    }
})

//@route    POST api/profile
//@desc     Create or update user profile
//@access   Private
router.post('/',[auth,[
    check('status','Status is required').not().isEmpty(),
    check('skills','Skills is required').not().isEmpty()
]],async (req,res)=>{
    const errors=validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()});
    }
    const {
        company,
        website,
        location,
        bio,
        status,
        githubusername,
        skills,
        youtube,
        facebook,
        twitter,
        instagram,
        linkedin
    }=req.body;

    //build profile object
    const profileFields={};
    profileFields.user=req.user.id;
    if(company) profileFields.company=company;
    if(website) profileFields.website=website;
    if(location) profileFields.location=location;
    if(bio) profileFields.bio=bio;
    if(status) profileFields.status=status;
    if(githubusername) profileFields.githubusername=githubusername;
    if(skills){
        profileFields.skills=skills.split(',').map(skill=>skill.trim());
    }
    //Build social object
    profileFields.social={};
    if(youtube) profileFields.social.youtube=youtube;
    if(twitter) profileFields.social.twitter=twitter;
    if(facebook) profileFields.social.facebook=facebook;
    if(linkedin) profileFields.social.linkedin=linkedin;
    if(instagram) profileFields.social.instagram=instagram;

    try{
        let profile= await Profile.findOne({user:req.user.id});
        if(profile){
            //update
            profile=await Profile.findOneAndUpdate(
                {user:req.user.id},
                {$set:profileFields},
                {new:true}
            );
            return res.json(profile);
        }
        //create
        profile=new Profile(profileFields);
        await profile.save();
        return res.json(profile);
    }
    catch(err){
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});


//@route    GET api/profile
//@desc     get all profiles
//@access   public
router.get('/', async (req,res)=>{
    try {
        const profile=await Profile.find().populate('user',['name','avatar']);
        res.json(profile);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');        
    }
})


//@route    GET api/profile/user/:user_id
//@desc     get profile by id
//@access   public
router.get('/user/:user_id', async (req,res)=>{
    try {
        const profile=await Profile.findOne({user:req.params.user_id}).populate('user',['name','avatar']);
        if(!profile) {
            console.log('ok');
            return res.status(400).json({msg:'There is no profile for this user'});
        }
        res.json(profile);
    } catch (err) {
        if(err.kind='ObjectId'){
            return res.status(400).json({msg:'There is no profile for this user'});
        }
        console.error(err.message);
        res.status(500).send('Server Error');        
    }
})

//@route    DEL api/profile/
//@desc     Delete user profile and posts
//@access   private
router.delete('/',auth, async (req,res)=>{
    try {
        await Profile.findOneAndRemove({user:req.user.id});
        await User.findOneAndRemove({_id:req.user.id});
        res.json({"msg":"User deleted"});
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');        
    }
})

//@route    PUT api/profile/experience
//@desc     add profile experience
//@access   private
router.put('/experience',[auth,[
    check('title','Title is required').not().isEmpty(),
    check('company','Company is required').not().isEmpty(),
    check('from','From date is required').not().isEmpty()
]], async (req,res)=>{
    const error=validationResult(req);
    if(!error.isEmpty()){
        return res.status(400).json({error:error.array()});
    }
    const {
        title,
        company,
        location,
        from,
        to,
        current,
        description
    }=req.body;
    const newExp={
        title,
        company,
        location,
        from,
        to,
        current,
        description
    }
    try {
        const profile =await Profile.findOne({user:req.user.id});
        profile.experience.unshift(newExp); //push to the beginning of the array

        await profile.save();
        res.json(profile);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

//@route    DEL api/profile/experience/:exp_id
//@desc     delete profile experience
//@access   private
router.delete('/experience/:exp_id',auth, async (req,res)=>{
    try {
        const profile=await Profile.findOne({user:req.user.id});
        const removeIndex=profile.experience.map(item=>item.id).indexOf(req.params.exp_id);
        profile.experience.splice(removeIndex,1); //remove "1" element from "removeIndex" index
        await profile.save();
        res.json(profile);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
}
);

//@route    PUT api/profile/education
//@desc     add profile education
//@access   private
router.put('/education',[auth,[
    check('school','School is required').not().isEmpty(),
    check('degree','Degree is required').not().isEmpty(),
    check('fieldofstudy','Field of study is required').not().isEmpty(),
    check('from','From date is required').not().isEmpty()
]], async (req,res)=>{
    const error=validationResult(req);
    if(!error.isEmpty()){
        return res.status(400).json({error:error.array()});
    }
    const {
        school,
        degree,
        fieldofstudy,
        from,
        to,
        current,
        description
    }=req.body;
    const newedu={
        school,
        degree,
        fieldofstudy,
        from,
        to,
        current,
        description
    }
    try {
        const profile =await Profile.findOne({user:req.user.id});
        profile.education.unshift(newedu); //push to the beginning of the array

        await profile.save();
        res.json(profile);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

//@route    DEL api/profile/education/:edu_id
//@desc     delete profile education
//@access   private
router.delete('/education/:edu_id',auth, async (req,res)=>{
    try {
        const profile=await Profile.findOne({user:req.user.id});
        const removeIndex=profile.education.map(item=>item.id).indexOf(req.params.edu_id);
        profile.education.splice(removeIndex,1); //remove "1" element from "removeIndex" index
        await profile.save();
        res.json(profile);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
}
);

     

module.exports=router;