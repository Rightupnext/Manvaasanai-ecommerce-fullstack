import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addProduct, getProduct, updateProduct } from '../../store/reducers/productReducers'
import { getCategories } from '../../store/reducers/CategorySlice'
import { useNavigate, useParams } from 'react-router-dom'

const ProductForm = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { id } = useParams()

  const { categories } = useSelector((state) => state.category)
  const { product, loading, error } = useSelector((state) => state.products)

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    price: '',
    image1: null,
    image2: null,
    image3: null,
    image4: null,
    discountprice: '',
    offer: '',
    packSize: '',
    available: 'available',
  })

  useEffect(() => {
    if (id) {
      dispatch(getProduct(id))
    }
    dispatch(getCategories())
  }, [id, dispatch])

  useEffect(() => {
    if (product) {
      setFormData({
        title: product.title || '',
        description: product.description || '',
        category: product.category || '',
        price: product.price || '',
        discountprice: product.discountprice || '',
        offer: product.offer || '',
        packSize: product.packSize || '',
        available: product.available || 'available',
        image1: null,
        image2: null,
        image3: null,
        image4: null,
      })
    }
  }, [product])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleFileChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.files[0] })
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    const data = new FormData()
    data.append('title', formData.title)
    data.append('description', formData.description)
    data.append('category', formData.category)
    data.append('price', formData.price)
    data.append('discountprice', formData.discountprice)
    data.append('offer', formData.offer)
    data.append('packSize', formData.packSize)
    data.append('available', formData.available)

    if (formData.image1) data.append('images', formData.image1)
    if (formData.image2) data.append('images', formData.image2)
    if (formData.image3) data.append('images', formData.image3)
    if (formData.image4) data.append('images', formData.image4)

    if (id) {
      dispatch(updateProduct({ id, formData: data }))
        .unwrap()
        // .then(() => navigate('/products'))
        .catch(console.error)
    } else {
      dispatch(addProduct(data))
        .unwrap()
        // .then(() => navigate('/products'))
        .catch(console.error)
    }
  }

  return (
    <div>
      <h2>{id ? 'Update Product' : 'Add Product'}</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <input
          type="text"
          name="title"
          placeholder="Product Title"
          value={formData.title}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="price"
          placeholder="price"
          value={formData.price}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="discountprice"
          placeholder="Discount Price"
          value={formData.discountprice}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="description"
          placeholder="Product Description"
          value={formData.description}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="offer"
          placeholder="Offer (e.g. 10% off)"
          value={formData.offer}
          onChange={handleChange}
        />
        <input
          type="text"
          name="packSize"
          placeholder="Pack Size"
          value={formData.packSize}
          onChange={handleChange}
        />
        <select name="category" value={formData.category} onChange={handleChange} required>
          <option value="">Select a Category</option>
          {categories.map((category) => (
            <option key={category._id} value={category._id}>
              {category.name}
            </option>
          ))}
        </select>
        <div>
          {[1, 2, 3, 4].map((i) => (
            <label key={i}>
              <input type="file" name={`image${i}`} onChange={handleFileChange} />
            </label>
          ))}
        </div>
        <button type="submit" disabled={loading}>
          {loading ? 'Saving...' : id ? 'Update Product' : 'Create Product'}
        </button>
      </form>
    </div>
  )
}

export default ProductForm
