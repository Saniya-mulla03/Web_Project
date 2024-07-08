const {Schema, model} = require('mongoose');

const campusInfoSchema = new Schema({
    // service: {type: String, required: true},
    // description: {type: String, required: true},
    // price: {type: String, required: true},
    // provider: {type: String, required: true},
    company_name: {type: String, required: true},
    company_package: {type: String, required: true},
    details: {type: String, required: true},
});

const CampusInfo = new model("campusInfos", campusInfoSchema);

module.exports = CampusInfo;