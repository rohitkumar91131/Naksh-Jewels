import { useContext } from 'react';
import { ProductContext } from '../context/ProductContext';
import '../styles/Pagination.css';

const Pagination = () => {
    const { currentPage, totalPages, changePage } = useContext(ProductContext);

    const handlePageChange = (newPage) => {
        if (newPage >= 1 && newPage <= totalPages) {
            changePage(newPage);
        }
    };

    return (
        <div className="pagination-container">
            <button 
                className="page-btn" 
                disabled={currentPage === 1}
                onClick={() => handlePageChange(currentPage - 1)}
            >
                Previous
            </button>
            
            <span className="page-info">
                Page {currentPage} of {totalPages}
            </span>
            
            <button 
                className="page-btn" 
                disabled={currentPage === totalPages}
                onClick={() => handlePageChange(currentPage + 1)}
            >
                Next
            </button>
        </div>
    );
};

export default Pagination;