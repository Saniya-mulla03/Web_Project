const CampusInfo = require("../models/campusInfo-model");

const campusInfos = async (req,res) => {
    try {
        const response = await CampusInfo.find();
        if(!response){
            res.status(404).json({msg: "No Campus Info found"});
            return;
        }
        res.status(200).json({msg: response});
        // console.log(response);
    } catch (error) {
        console.log(`campusInfos: ${error}`);
    }
};

module.exports = campusInfos;