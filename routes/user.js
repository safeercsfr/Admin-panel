var express = require('express');
var router = express.Router();
const userHelpers = require('../helpers/user-helpers');


/* GET home page. */
router.get('/', function(req, res, next) {
  let user=req.session.user
  const products=[
    {
      name:"IPHONE 13",
      category:"Mobile",
      description:"Best Smartphone",
      image:"https://www.xda-developers.com/files/2022/09/Apple-iPhone-14-Plus-Purple.jpg"
    },
    {
      name:"ONEPLUS 10T",
      category:"Mobile",
      description:"Best Gaming Smartphone",
      image:"https://m.media-amazon.com/images/I/71flXufDnbL._SX679_.jpg"
    },
    {
      name:"Samsung Galaxy S22 Ultra",
      category:"Mobile",
      description:"Best Smartphone",
      image:"https://m.media-amazon.com/images/I/71PvHfU+pwL._SL1500_.jpg"
    },
    {
      name:"Xiaomi 12 Pro",
      category:"Mobile",
      description:"Best Smartphone",
      image:"https://i.gadgets360cdn.com/products/large/xiaomi-12-pro-800x800-1640703618.jpg"
    },
    {
      name:"Samsung Galaxy S22 Ultra",
      category:"Mobile",
      description:"Best Smartphone",
      image:"https://m.media-amazon.com/images/I/71PvHfU+pwL._SL1500_.jpg"
    },
    {
      name:"Xiaomi 12 Pro",
      category:"Mobile",
      description:"Best Smartphone",
      image:"https://i.gadgets360cdn.com/products/large/xiaomi-12-pro-800x800-1640703618.jpg"
    },
    {
      name:"IPHONE 13",
      category:"Mobile",
      description:"Best Smartphone",
      image:"https://www.xda-developers.com/files/2022/09/Apple-iPhone-14-Plus-Purple.jpg"
    },
    {
      name:"ONEPLUS 10T",
      category:"Mobile",
      description:"Best Gaming Smartphone",
      image:"https://m.media-amazon.com/images/I/71flXufDnbL._SX679_.jpg"
    },
    
  ]
  if(user){
    res.render('index', {products,user});
  }else{
    res.redirect('/login')
  }
 
});
router.get('/login',(req, res)=> {
  if(req.session.loggedIn){
    res.redirect('/')
  }else{
  res.render('login',{"loginErr":req.session.loginErr})
  req.session.loginErr=false
  }
});
router.get('/signup', function(req, res, next) {
  let error=req.session.error
  res.render('signup',{error})
  //console.log(error);
  req.session.error=false;
});
  router.post('/signup',(req,res)=>{
    userHelpers.doSignup(req.body).then((response)=>{
      console.log(response);
      if(response){
       // console.log(response);
       // console.log(response);
        req.session.loggedIn=true
        req.session.user=response
        res.render('login')
      }else{
        //console.log(response);
        req.session.error=true
        res.redirect('signup')
      }
     
    })
  })
router.post('/login',(req,res)=>{
  userHelpers.doLogin(req.body).then((response)=>{
    console.log(response);
      if(response.status){
        req.session.loggedIn= true
        req.session.user = response.user
        res.redirect('/')
      }else{
        req.session.loginErr="Invalid Email or Password"
        res.redirect('/login')
      }
    })
  })
  router.get('/logout',(req,res)=>{
    req.session.destroy()
    res.redirect('/login')
  })
// const verifyLogin=(req,res,next)=>{
//   if(req.session.loggedIn){
//     next()
//   }else{
//     res.redirect('/login')
//   }
// }

module.exports = router;
