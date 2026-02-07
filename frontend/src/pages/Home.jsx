import { useContext } from 'react'; // Import useContext
import { ProductContext } from '../context/ProductContext'; // Import Context
import Navbar from '../components/Navbar';
import ProductList from '../components/ProductList';
import Pagination from '../components/Pagination';
import '../styles/Home.css';

const Home = () => {    const { loading } = useContext(ProductContext);

    return (
        <div className="home-container">
            <Navbar />
            
            <main className="main-content">
                <h1 className="page-title">Latest Collection</h1>
                
                <ProductList />

                {/* Only show Pagination if NOT loading */}
                {!loading && <Pagination />}
            </main>
        </div>
    );
};

export default Home;