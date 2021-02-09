const express=require('express')
const app=express()
app.use(express.json())

require('dotenv').config()
const userModel = require('./models/User')

// creating the server 
const port=5000 || process.env.PORT
app.listen(port,()=>{
    console.log(`now connected at port ${port}`)
})


app.get('/',(req,res)=>{
    res.send('hello lkol')
})

// connection to DB 
const mongoose = require('mongoose')
const User = require('./models/User')
mongoose.connect(process.env.DB_URL,{useNewUrlParser:true,useUnifiedTopology: true})
.then(()=>{
    console.log("connected to database")
})
.catch(err=>{
    console.error(err)
})
// GEt all users
app.get('/users',async (req,res)=>{
   try{
    const users=await userModel.find()
   console.log('all users at /users')
    res.send(users)
   }catch(err){
    res.send({message:err.message})
   }
})

// Get One user by id 
app.get('/users/:id',async(req,res)=>{
    try{
            const oneUser = await userModel.find({_id:req.params.id})
            res.send(oneUser)
    }catch(err){
        res.send({message:err.message})
    }
})

// add new User 
app.post('/users',async (req,res)=>{
   let user=new userModel({
        username:req.body.username,
        email:req.body.email,
        phone:req.body.phone,
        adress:req.body.adress
    })
   try{
       const usertoadd = await user.save();
       res.send(usertoadd)

   }
   catch (err){
       res.send({message:err.message})
   }

})

// edit user 
app.put('/users/:id',async (req,res)=>{
    try{
    let editeduser= await userModel.updateOne(
        {_id:req.params.id},
        {$set:{username:req.body.username,
            email:req.body.email,
            phone:req.body.phone,
            adress:req.body.adress}}
        )
    res.send(editeduser)
    res.redirect('/users')
    }catch (err){
        res.send({message:err.message})
    }
})


// Delete a user 
app.delete('/users/:id',async (req,res)=>{
    try{
      const deletedUser= await userModel.deleteOne({_id: req.params.id},{})

         res.send({"user deleted with suceess" : deletedUser})
        
        
    }catch(err){
        res.send({message:err.message})
    }
})

