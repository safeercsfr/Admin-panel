var db=require('../config/connection')
const bcrypt=require('bcrypt')
module.exports={
    doSignup:(userData)=>{
        return new Promise(async(resolve,reject)=>{
            let response={}
            let user=await db.get().collection('login').findOne({email:userData.email})
            console.log(user);
            if(user){
                resolve(response.status=false)
            }else{
                userData.password=await bcrypt.hash(userData.password,10)
                db.get().collection('login').insertOne(userData).then((req,res)=>{
                    resolve(response.status=true)

                })
            }
        })
             
    },
    doLogin:(userData)=>{
        return new Promise(async(resolve,reject)=>{
            let loginStatus=false;
            let response={}
            let user=await db.get().collection('login').findOne({email:userData.email})
            if(user){
                console.log(user);
                bcrypt.compare(userData.password,user.password).then((status)=>{
                    if(status){
                        console.log('login success');  
                        response.user=user
                        response.status=true
                        resolve(response)
                    }else{
                        console.log('login failed!!');
                        resolve({status:false})
                    }
                })
            }else{
                console.log('login failed');
                resolve({status:false})
            }   
        })
    }
}

