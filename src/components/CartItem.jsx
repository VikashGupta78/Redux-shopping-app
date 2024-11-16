import React from 'react';
import { MdDelete } from "react-icons/md";
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { remove } from '../redux/slices/CartSlice';

function CartItem({ item }) {
    const dispatch = useDispatch();

    const removeFromCart = () => {
        dispatch(remove(item.id));
        toast.error("Item removed");
    };

    return (
        <div className="flex items-center gap-4 p-4 bg-white rounded-lg shadow-md">
            <img src={item.image} alt={item.title} className="w-24 h-24 object-cover rounded-lg" />
            <div className="flex flex-col justify-between w-full">
                <div>
                    <h3 className="text-lg font-semibold text-gray-800">{item.title}</h3>
                    <p className="text-gray-600 text-sm mt-1">{item.description}</p>
                </div>
                <div className="flex justify-between items-center mt-4">
                    <p className="text-lg font-medium text-gray-700">${item.price}</p>
                    <button 
                        onClick={removeFromCart} 
                        className="text-red-500 hover:text-red-700 transition duration-200"
                    >
                        <MdDelete size={24} />
                    </button>
                </div>
            </div>
        </div>
    );
}

export default CartItem;
