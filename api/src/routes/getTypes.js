const {Diet} = require('../db');

const getTypes = async (req,res)=>{
  try{
    let dietTypes = await Diet.findAll({});
    res.status(200).json( dietTypes)
  }catch(err){
    console.log(err);
    res.status(500).json({msg: err.message})
  }
}

const addType = async (req, res)=>{
try{
  let {name} = req.body;
  let newType = await Diet.create({
    name
  })
  res.status(200).json(newType)

}catch(err){
  console.log(err);
  res.status(404).json({msg:err.message});
}

}

module.exports={
  getTypes,
  addType
}