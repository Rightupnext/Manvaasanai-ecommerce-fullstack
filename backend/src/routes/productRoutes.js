const express = require('express');
const multer = require('multer');
const { addProduct, addReview,getProducts,getImage,getProduct,updateProduct,deleteProduct,getProductsByCategory,getProductByTitle } = require('../controllers/productController');
const { isAuthenticated, allowRoles } = require("../middleware/AuthMiddleware");

const router = express.Router();

const storage = multer.memoryStorage(); 
const upload = multer({ 
  storage: storage,
  limits: { files: 5 }
}).array('images');
router.post('/', upload, addProduct);
router.get('/',  getProducts);
router.get('/:id', getProduct);
router.put('/:id',isAuthenticated,allowRoles('admin'), upload, updateProduct);
router.delete('/:id',isAuthenticated,allowRoles('admin'), deleteProduct);
router.get('/category/:categoryId',getProductsByCategory);
router.get('/:title',getProductByTitle);
router.get('/images/:filename', getImage);
router.post('/reviews',isAuthenticated,allowRoles('admin','client'), addReview); 

module.exports = router;
