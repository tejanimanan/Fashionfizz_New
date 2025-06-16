import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Footer from './Footer'
import { FaEye, FaShoppingCart } from 'react-icons/fa'
import { BsEyeFill } from 'react-icons/bs'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useDispatch, useSelector } from 'react-redux'
import { fetchProducts, addToCart as addProductToCart } from '../redux/productSlice'
import { api } from '../services/api'

export default function AllProduct() {
    const dispatch = useDispatch()
    const { items: product, status, error } = useSelector((state) => state.products)
    const cartItems = useSelector((state) => state.products.cart)
    const navigation = useNavigate()
    
    useEffect(() => {
        if (status === 'idle') {
            dispatch(fetchProducts())
        }
    }, [status, dispatch])

    const AddToCart = async (productToAdd) => {
        const userId = localStorage.getItem('userId')

        if (!userId) {
            toast.error('Please login first to add items to cart')
            navigation('/login')
            return
        }

        const productExistsInCart = cartItems.some(item => item.id === productToAdd.id)

        if (productExistsInCart) {
            toast.error('This product is already in your cart')
            return
        }

        try {
            dispatch(addProductToCart(productToAdd))

            const cartItemForApi = {
                productId: productToAdd.id,
                userId: userId,
                price: productToAdd.price,
                quantity: 1,
                name: productToAdd.name,
                size: productToAdd.size,
                color: productToAdd.color,
                image: productToAdd.image,
            }

            const addResponse = await api.addToCart(cartItemForApi)

            if (addResponse) {
                toast.success('Product added to cart successfully!')
                setTimeout(() => {
                    navigation('/cart')
                }, 1500)
            } else {
                toast.error('Failed to add product to cart. Please try again.')
            }
        } catch (error) {
            console.error('Error adding to cart:', error)
            toast.error('Something went wrong. Please try again.')
        }
    }

    if (status === 'loading') {
        return <div>Loading products...</div>
    }

    if (status === 'failed') {
        return <div>Error: {error}</div>
    }

    return (
        <div className='py-4' >
            <ToastContainer />
            <div className='container rounded-5 px-4 py-4' style={{ background: 'linear-gradient(145deg,rgb(230, 235, 237),rgb(246, 247, 248))' }}>
                <div className='row g-4'>
                    {
                        Array.isArray(product) && product.map((v) => (
                            <div key={v.id} className="col-12 col-sm-6 col-md-4 col-lg-3">
                                <div className="card h-100 shadow-lg border-0 rounded-3" style={{
                                    background: 'linear-gradient(145deg,rgb(230, 235, 237),rgb(246, 247, 248))'
                                }}>
                                    <div className="position-relative overflow-hidden rounded-3" style={{ height: '270px', background: 'linear-gradient(145deg,rgb(230, 235, 237),rgb(246, 247, 248))' }}>
                                        <img 
                                            src={v.image} 
                                            className="card-img-top p-3 product-img h-100 w-100" 
                                            style={{ objectFit: 'contain' }}
                                            alt={v.name} 
                                        />
                                    </div>
                                    <div className="card-body d-flex flex-column justify-content-between rounded-3 " style={{ background: 'linear-gradient(145deg,rgb(230, 235, 237),rgb(246, 247, 248))' }}>
                                        <div className='card-text mb-3'>
                                            <h5 className="card-title fw-semibold text-dark mb-2">{v.name}</h5>
                                            <p className="card-text fw-bold text-primary mb-3">Rs.{v.price}</p>
                                        </div>
                                        <div className='d-flex flex-wrap gap-2'>
                                            <Link 
                                                to={`/singleproduct/${v.id}`} 
                                                className='btn btn-outline-primary flex-grow-1'
                                                style={{
                                                    background: 'linear-gradient(to right, #0d6efd, #0a58ca)',
                                                    color: 'white',
                                                    border: 'none'
                                                }}
                                            >
                                                Quick View
                                              
                                            </Link>
                                            <button 
                                                onClick={() => AddToCart(v)} 
                                                className='btn flex-grow-1'
                                                style={{
                                                    background: 'linear-gradient(to right, #0F2143, #1a365d)',
                                                    color: 'white',
                                                    border: 'none'
                                                }}
                                            >
                                                Add to cart <FaShoppingCart size={22} color="#ffff" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}
