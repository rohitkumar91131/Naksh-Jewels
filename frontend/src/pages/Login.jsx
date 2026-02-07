import { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import '../styles/Auth.css';

const Login = () => {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { login, error } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        const result = await login(formData.email, formData.password);
        if (result.success) {
            navigate('/');
        }
        setIsSubmitting(false);
    };

    return (
        <div className="auth-container">
            <div className="auth-card">
                <img src="/logo.png" alt="Naksh Jewels" className="auth-logo" />
                <h2 className="auth-title">Welcome Back</h2>
                <p className="auth-subtitle">Login to access your jewelry collection</p>
                
                {error && <div className="error-message">{error}</div>}
                
                <form onSubmit={handleSubmit} className="auth-form">
                    <div className="form-group">
                        <input
                            type="email"
                            name="email"
                            className="form-input"
                            placeholder="Email Address"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <input
                            type="password"
                            name="password"
                            className="form-input"
                            placeholder="Password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <button type="submit" className="auth-button" disabled={isSubmitting}>
                        {isSubmitting ? 'Logging In...' : 'Login'}
                    </button>
                </form>
                
                <div className="auth-footer">
                    <p>Don't have an account? <Link to="/auth/signup" className="auth-link">Sign Up</Link></p>
                </div>
            </div>
        </div>
    );
};

export default Login;