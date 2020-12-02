const mongoose = require('mongoose');

//define a schema/ blueprint NOTE: id is not a part of the schema 
  const customerSchema = new mongoose.Schema({
    userID:  { type: String, required: true},
    firstName:  { type: String, required: true},
    lastName:  { type: String, required: true},
    cardType: { type: String, required: true},
    cardNumber: { type: String, required: true},
    exp: { type: String, required: true},
    cvc: { type: String, required: true}
  });

//use the blueprint to create the model 
// Parameters: (model_name, schema_to_use, collection_name)
//module.exports is used to allow external access to the model  
module.exports = mongoose.model('Customer', customerSchema);
//note capital S in the collection name
