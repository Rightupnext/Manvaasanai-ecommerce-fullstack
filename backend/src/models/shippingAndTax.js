const mongoose=require('mongoose');

const ShippingAndTaxSchema=mongoose.Schema({
    tax:{type:Number},
    ShippingAmount:{type:Number}
})
module.exports=mongoose.model('shippingAndTax',ShippingAndTaxSchema)