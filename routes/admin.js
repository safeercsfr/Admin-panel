var express=require('express');
const { response } = require('../app');
var router=express.Router();
let adminHelper=require('../helpers/admin-helpers');

router.get('/',(req,res,next)=>{
    adminHelper.getAllUsers().then((response)=>{
        let admin=req.session.user
        if(admin){
        res.render('admin/view-users',{admin:true,response,adminName:req.session.user})

        }else{
            res.redirect('/admin/admin-login')
        }
    })
})
router.get('/admin-login',(req,res)=>{
    if(req.session.loggedIn){
        res.redirect('/admin')
      }else{
      res.render('admin/admin-login',{"loginErr":req.session.loginErr,admin:true})
      req.session.loginErr=false
      }
})
router.get('/admin-signup',(req,res)=>{
    res.render('admin/admin-signup',{admin:true})
})
router.post('/admin-signup',(req,res)=>{
    console.log(req.body);
    adminHelper.doSignupAdmin(req.body).then((response)=>{
      console.log(response);
      res.redirect('/admin/admin-login')
    })
})
router.post('/admin-login',(req,res)=>{
    adminHelper.doLoginAdmin(req.body).then((response)=>{
        if(response.status){
          req.session.loggedIn= true
          req.session.user = response.admin
          res.redirect('/admin')
        }else{
          req.session.loginErr="Invalid Email or Password"
          res.redirect('/admin/admin-login')
        }
      })
    })
router.get('/admin-logout',(req,res)=>{
    req.session.destroy(()=>{
        res.redirect('/admin/admin-login')
    })
})

router.get('/add-users',(req,res,next)=>{
        res.render('admin/add-users',{admin:true})
    })
router.post('/add-users',(req,res,next)=>{
    adminHelper.addUser(req.body).then((response)=>{
    res.redirect('/admin')
    })
})
router.get('/delete-user/:email',(req,res,next)=>{
    let userMail=req.params.email
    console.log(userMail);
    adminHelper.deleteUser(userMail).then((response)=>{
    res.redirect('/admin')    
    })
})
router.get('/edit-user/:email',async (req,res)=>{
    let user=await adminHelper.getUserDetails(req.params.email)
    console.log(user);
    res.render('admin/edit-user',{user,admin:true})
})
router.post('/edit-user/:email',(req,res)=>{
    adminHelper.updateUser(req.body).then(()=>{
        res.redirect('/admin')
    })
})

module.exports=router;