import React, { useEffect, useState } from 'react'
import Spinner from '../components/Spinner';
import Product from '../components/Product';

function Home() {
    const API_URL = "https://fakestoreapi.com/products";
    const [loading, setLoading] = useState(false);
    const [posts, setPosts] = useState([]);

    const fetchData = async() => {
        setLoading(true);

        try {
            const response = await fetch(API_URL);
            const data = await response.json();
            console.log(data);

            setPosts(data);
        } catch (error) {
            console.log("error in fetching");
            setPosts([]);
        }
        setLoading(false);

    }

    useEffect(()=>{
        fetchData();
    }, [])

  return (
    <div className='flex justify-center w-9/12 mx-[auto] mt-10 '>
        {
            loading ? (<Spinner />) :
            posts.length > 0 ? 
            (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
                {posts.map((post) => (
                    <Product key={post.id} post={post} />
                ))}
                </div>

            ) : (
                <p>No data found</p>
            )
        }
    </div>
  )
}

export default Home