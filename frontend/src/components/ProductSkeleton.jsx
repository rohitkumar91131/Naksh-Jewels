import '../styles/ProductSkeleton.css';

const ProductSkeleton = () => {
    
    return (
        <div className="product-card skeleton-card">
            <div className="skeleton-image skeleton-animate"></div>
            <div className="product-info">
                <div className="skeleton-text title skeleton-animate"></div>
                <div className="skeleton-text price skeleton-animate"></div>
                <div className="skeleton-button skeleton-animate"></div>
            </div>
        </div>
    );
};

export default ProductSkeleton;