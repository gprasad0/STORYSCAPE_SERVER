import express from 'express';
import passport from 'passport';

const router = express.Router();

router.get("/login/success",(req,res)=>{
    if(req.user){
        res.status(200).json({
            error:false,
            message:"Successfuly Logged In",
            use:req.user
        })
    }else{
        res.status(403).json({
            error:true,
            message:"Not Authorized"
        });
    }
})

router.get("/login/failed",(req,res)=>{
    res.status(401).json({
        error:true,
        message:"Log in Failure"
    })
})
router.get(
  '/google/callback',
  passport.authenticate('google', {
    successRedirect: process.env.CLIENT_URL,
    failureRedirect: '/login/failed',
  })
);
 
router.get("/google",passport.authenticate("google",["profile","email"])); 

router.get("/logout",(req,res)=>{
    req.logOut();
    res.redirect(process.env.CLIENT_URL)
})

export default router;