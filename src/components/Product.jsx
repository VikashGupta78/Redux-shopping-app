import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { add, remove } from '../redux/slices/CartSlice';

function Product({ id, post }) {
    const { cart } = useSelector((state) => state);
    const [readMore, setReadMore] = useState(true);
    const dispatch = useDispatch();

    const addToCart = () => {
        dispatch(add(post));
        toast.success("Item added to cart");
    }
    const removeFromCart = () => {
        dispatch(remove(post.id));
        toast.error("Item removed from cart");
    }

    const desc = post.description;
    const finaldesc = desc.length > 100 ? desc.slice(0, 100) : desc;

    return (
        <div className="bg-white shadow-md rounded-lg p-4 flex flex-col justify-evenly items-center gap-4 max-w-xs">
            <div className="w-full">
                <p className="text-lg font-semibold text-gray-800">{post.title}</p>
            </div>
            <div className="w-full">
                <p className="text-sm text-gray-600">{readMore ? finaldesc : desc}</p>
                <span onClick={() => setReadMore(!readMore)}
                    className="text-blue-500 cursor-pointer ml-2">{
                    readMore ? '...read more' : 'read less'
                }</span>
            </div>
            <div className="w-full flex justify-center">
                <img src={post.image} alt={post.title} className="h-40 object-fit rounded-lg" />
            </div>
            <div className="w-full">
                <p className="text-lg font-medium text-gray-700">${post.price}</p>
            </div>
            <div className="w-full flex justify-center">
                {cart.some((p) => p.id === post.id) ? (
                    <button
                        onClick={removeFromCart}
                        className="w-full bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition duration-200"
                    >
                        Remove Item
                    </button>
                ) : (
                    <button
                        onClick={addToCart}
                        className="w-full bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition duration-200"
                    >
                        Add to Cart
                    </button>
                )}
            </div>
        </div>


    )
}

export default Product