const express = require('express');
const router = express.Router();
const ShippingAndTaxController = require('../controllers/ShippingAndTaxController');

router.post('/create', ShippingAndTaxController.createShippingAndTax);

router.get('/get', ShippingAndTaxController.getShippingAndTax);

router.put('/shipping-and-tax/:id', ShippingAndTaxController.updateShippingAndTax);

router.delete('/shipping-and-tax/:id', ShippingAndTaxController.deleteShippingAndTax);

module.exports = router;
