var db=require('../config/connection')
const bcrypt=require('bcrypt')

module.exports={
    doSignupAdmin:(adminData)=>{
        return new Promise(async(resolve,reject)=>{
            adminData.password=await bcrypt.hash(adminData.password,10)
            db.get().collection('loginAdmin').insertOne(adminData).then((req,res)=>{
                resolve(adminData)
            })
        })
    },
    doLoginAdmin:(adminData)=>{
        return new Promise(async(resolve,reject)=>{
            let loginStatus=false;
            let response={}
            let admin=await db.get().collection('loginAdmin').findOne({email:adminData.email})
            if(admin){
                console.log(admin);
                bcrypt.compare(adminData.password,admin.password).then((status)=>{
                    if(status){
                        console.log('login success');  
                        response.admin=admin
                        response.status=true
                        resolve(response)
                    }else{
                        console.log('login failed!');
                        resolve({status:false})
                    }
                })
            }else{
                console.log('login failed');
                resolve({status:false})
            }   
        })
    },
    getAllUsers:()=>{
        return new Promise(async(resolve,reject)=>{
        let user=await db.get().collection('login').find().toArray()
        //console.log(user);
        resolve(user)
        })
    },
    addUser:(userData)=>{
        return new Promise(async(resolve,reject)=>{
            userData.password=await bcrypt.hash(userData.password,10)
            db.get().collection('login').insertOne(userData).then((req,res)=>{
                resolve(userData)
            })
        })
    },
    deleteUser:(email)=>{
        return new Promise((resolve,reject)=>{
            db.get().collection('login').deleteOne({email:email}).then((req,res)=>{
            resolve()
            })
        })
    },
    getUserDetails:(email)=>{
        return new Promise((resolve,reject)=>{
            db.get().collection('login').findOne({email:email}).then((user)=>{
                resolve(user)
            })   
        })
    },
    updateUser:(userDetails)=>{
        console.log(userDetails);
        return new Promise(async(resolve,reject)=>{
            userDetails.password=await bcrypt.hash(userDetails.password,10)
            db.get().collection('login').updateOne({email:userDetails.email},{
                $set:{
                    first_name:userDetails.first_name,
                    last_name:userDetails.last_name,
                    password:userDetails.password
                }
            }).then((response)=>{
                console.log(response);
                resolve()
            })
        })
    }
}