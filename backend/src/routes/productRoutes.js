const express = require('express');
const multer = require('multer');
const { addProduct, addReview,getProducts,getImage,getProduct,updateProduct,deleteProduct,getProductsByCategory,getProductByTitle } = require('../controllers/productController');


const router = express.Router();

const storage = multer.memoryStorage(); 
const upload = multer({ 
  storage: storage,
  limits: { files: 5 }
}).array('images');
router.post('/', upload, addProduct);
router.get('/',  getProducts);
router.get('/:id', getProduct);
router.put('/:id', upload, updateProduct);
router.delete('/:id', deleteProduct);
router.get('/category/:categoryId',getProductsByCategory);
router.get('/:title',getProductByTitle);
router.get('/images/:filename', getImage);
router.post('/review', addReview); 

module.exports = router;
