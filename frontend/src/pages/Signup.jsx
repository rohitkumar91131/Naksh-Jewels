import { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import '../styles/Auth.css';

const Signup = () => {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { signup, error } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        const result = await signup(formData.email, formData.password);
        if (result.success) {
            navigate('/');
        }
        setIsSubmitting(false);
    };

    return (
        <div className="auth-container">
            <div className="auth-card">
                <img src="/logo.png" alt="Naksh Jewels" className="auth-logo" />
                <h2 className="auth-title">Create Account</h2>
                <p className="auth-subtitle">Join us to explore exclusive collections</p>
                
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
                        {isSubmitting ? 'Signing Up...' : 'Sign Up'}
                    </button>
                </form>
                
                <div className="auth-footer">
                    <p>Already have an account? <Link to="/auth/login" className="auth-link">Login</Link></p>
                </div>
            </div>
        </div>
    );
};

export default Signup;