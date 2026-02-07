import { useState, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'
import { CartContext } from '../context/CartContext'
import '../styles/CartNavbar.css'

const CartNavbar = () => {
  const { user, logout } = useContext(AuthContext)
  const { cartCount } = useContext(CartContext)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/auth/login')
    setIsMenuOpen(false)
  }

  return (
    <nav className="cart-navbar">
      <div className="navbar-container">
        <Link to="/" className="brand-link" onClick={() => setIsMenuOpen(false)}>
          <span className="brand-name">Naksh Jewels</span>
        </Link>

        <div className="mobile-right">
          {user && (
            <span className="mobile-user">
              Hi, {user.email?.split('@')[0]}
            </span>
          )}
          <button className="menu-toggle" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? '✖' : '☰'}
          </button>
        </div>

        <div className={`nav-links ${isMenuOpen ? 'active' : ''}`}>
          <Link to="/" className="nav-item" onClick={() => setIsMenuOpen(false)}>
            Home
          </Link>

          <Link to="/cart" className="nav-item cart-link-active" onClick={() => setIsMenuOpen(false)}>
            Cart
            <div className="cart-icon-wrapper">
              🛒
              {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
            </div>
          </Link>

          {user ? (
            <button className="logout-btn" onClick={handleLogout}>
              Logout
            </button>
          ) : (
            <Link to="/auth/login" className="login-btn" onClick={() => setIsMenuOpen(false)}>
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  )
}

export default CartNavbar
