import { useContext } from 'react';
import ProductCard from './ProductCard';
import ProductSkeleton from './ProductSkeleton';
import { ProductContext } from '../context/ProductContext';
import '../styles/Home.css';

const ProductList = () => {
    const { products, loading, error } = useContext(ProductContext);

    if (loading) {
        return (
            <div className="product-grid">
                {[...Array(8)].map((_, index) => (
                    <ProductSkeleton key={index} />
                ))}
            </div>
        );
    }

    if (error) return <div className="error">{error}</div>;
    
    if (products.length === 0) return <div className="no-results">No products found</div>;

    return (
        <div className="product-grid">
            {products.map(product => (
                <ProductCard key={product._id} product={product} />
            ))}
        </div>
    );
};

export default ProductList;