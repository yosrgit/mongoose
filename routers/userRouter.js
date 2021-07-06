const express = require('express');
const router = express.Router();
const Person = require('../models/userSchema');


//Create and Save a Record of a Model:

router.post('/newperson',(req,res)=> {
  let newperson = new Person (req.body)
  newperson.save((err,data)=> { 
      err ?  console.log(err) : res.send('person was created')
  })
})


// Create several people with Model.create(), using the function argument arrayOfPeople

var createManyPeople = function(arrayOfPeople, done) {
  Person.create( arrayOfPeople, (err, data) => err ? console.log(err) : done(null, data));
}; 

router.post('/ManyPerson',(req,res)=> {
createManyPeople (req.body,(err,data)=> { 
  err ?  console.log(err) : res.send('ManyPerson was created')
})  
})

//Use model.find() to Search Your Database 
router.get('/:name',(req,res)=> {
  Person.find({name:req.params.name},(err,data)=> { 
      err ?  console.log(err) : res.json(data)
})
})

//Use model.findOne() to Find just one person 
router.get('/getfavorite/:favoriteFoods',(req,res)=> {
 console.log('get favorite')
  Person.findOne({favoriteFoods: {$elemMatch:{$eq:req.params.favoriteFoods}} },(err,data)=> { 
      err ?  console.log(err) : res.json(data)
})
}) 

//Use model.findById() to Search Your Database By _id
router.get('/:id',(req,res)=> {
  Person.findById({_id:req.params.id},(err,data)=> { 
      err ?  console.log(err) : res.json(data)
})
})

//Perform Classic Updates by Running Find, Edit, then Save 

router.put('/:id',async (req,res)=>{
 
  try{
    var foodToAdd = 'hamburger';
    const data=await Person.findById(req.params.id)
    data.favoriteFoods=[...data.favoriteFoods,foodToAdd]
    const result= await  data.save()
    res.status(200).json(result)
  }
  catch(err){
    res.status(400).json({error:err})
  }
})

//Find a person by Name and set the person's age to 20 Using model.findOneAndUpdate() :

router.put('/update/:name',(req,res)=> {

var ageToSet = 20;
Person.findOneAndUpdate({name:req.params.name},{$set: {"age":ageToSet}},{returnNewDocument : true}, function(err, doc){
if(err){return console.log("Something wrong when updating record!");}
res.json(doc);                  
      })
  
})  

//Delete One Document Using model.findByIdAndRemove :
router.delete('/:id',(req,res)=> {
  Person.findByIdAndRemove({_id:req.params.id},(err,data)=> { 
      err ?  console.log(err) : res.json(data)
  }) })  
   
// Delete Many Documents with model.remove :
router.delete('/delname/:name',(req,res)=> {
Person.remove({ name:req.params.name},(err,data)=> { 
  err ?  console.log(err) : res.send('all persons named maram were deleted')
})   })

//Chain Search Query Helpers to Narrow Search Results :
router.get('/',(req,res)=> {
var foodToSearch = "pizza";
Person.find({favoriteFoods:{$elemMatch:{$eq:foodToSearch }}})
.sort({name : "desc"})
.limit(2)
.select("-age")
.exec((err, data) => {
     if(err)
   return  console.log(err);
  res.json(data)
})
})
module.exports=router