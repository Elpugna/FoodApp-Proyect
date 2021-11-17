const {Diet} = require('../db');

const getTypes = async (req,res)=>{
  try{
    let dietTypes = await Diet.findAll({});
    res.status(200).json({msg:"Success", diets: dietTypes})
  }catch(err){
    console.log(err);
    res.status(500).json({msg: err.message})
  }
}

module.exports={
  getTypes
}