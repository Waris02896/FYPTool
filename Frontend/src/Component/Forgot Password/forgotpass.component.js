import React, { useState } from 'react';
import axios from 'axios';

function ForgotPassword() {
    const [email, setEmail] = useState('');
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    const handleForgotPassword = async (e) => {
        e.preventDefault();
        try {
            // Send a request to the server with the user's email address
            await axios.post('/api/forgot-password', { email });
            // If the request is successful, update the component's state
            setSuccess(true);
            setError(null);
        } catch (err) {
            // If there is an error, update the component's state
            setError(err.response.data.error);
        }
    }

    return (
        <div>
            {success ? (
                <p>A password reset link has been sent to your email.</p>
            ) : (
                <form onSubmit={handleForgotPassword}>
                    <label>
                        Email:
                        <input
                            type="email"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            required
                        />
                    </label>
                    <button type="submit">Reset Password</button>
                    {error && <p>{error}</p>}
                </form>
            )}
        </div>
    )
}

export default ForgotPassword;
