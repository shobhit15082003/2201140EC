const numService = require('../service/calciService');
const windowModel = require('../models/calciModels');

exports.getNums = async(req,res)=>{
    const {type} = req.params;
    try{
        const nums=await numService.fetchNums(type);
        const result = windowModel.updates(nums);

        res.json(result);
    }
    catch(e){
        console.log(e.message);
        console.error(e);
        res.status(500).json({error:'Failed to fetch numbers'});
    }
};
