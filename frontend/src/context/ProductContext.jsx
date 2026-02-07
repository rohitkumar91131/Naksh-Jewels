import { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
    const [products, setProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');

    const backendUrl = import.meta.env.VITE_BACKEND_URL;

    const fetchProducts = async (page = 1, query = '') => {
        setLoading(true);
        try {
            let endpoint = `${backendUrl}/products?page=${page}`;
            
            if (query) {
                endpoint = `${backendUrl}/products/search?q=${query}&page=${page}`;
            }

            const res = await axios.get(endpoint);
            
            setProducts(res.data.products); 
            setCurrentPage(res.data.currentPage);
            setTotalPages(res.data.totalPages);
            setLoading(false);
        } catch (err) {
            setError('Failed to load products');
            setLoading(false);
        }
    };

    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            fetchProducts(1, searchQuery);
        }, 500);

        return () => clearTimeout(delayDebounceFn);
    }, [searchQuery]);

    const changePage = (newPage) => {
        if (newPage >= 1 && newPage <= totalPages) {
            fetchProducts(newPage, searchQuery);
            window.scrollTo(0, 0);
        }
    };

    return (
        <ProductContext.Provider value={{ 
            products, 
            loading, 
            error, 
            searchQuery, 
            setSearchQuery,
            currentPage,
            totalPages,
            changePage
        }}>
            {children}
        </ProductContext.Provider>
    );
};