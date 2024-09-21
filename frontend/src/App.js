import { useState } from 'react';
import { login, signup } from './services.js';
import './App.css';
import Todo from './Todo.js';

function App () {
    const [data, setData] = useState({ username: '', email: '', password: '' });
    const [activeState, setActiveState] = useState('login');
    const [error, setError] = useState('');
    const [isAuth, setIsAuth] = useState(false);
    const [token, setToken] = useState();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (activeState === 'signup' && (!data?.username || !data?.password || !data?.email)) {
            setError('Incomplete fields');
            setIsAuth(false);
            return;
        }
        if (activeState === 'login' && (!data?.password || !data?.email)) {
            setError('Incomplete fields');
            setIsAuth(false);
            return;
        }
        try {
            if (activeState === 'login') {
                const response = await login({ email: data?.email, password: data?.password });
                setToken(response.data.token);
            } else {
                const response = await signup(data);
                setToken(response.data.token);
            }
            setError('');
            setData({ username: '', email: '', password: '' });
            setIsAuth(true);
        } catch (err) {
            setIsAuth(false);
            setError('Login/Signup failed. Please try again.');
        }
    };

    const loginForm = [
        {
            label: 'Email',
            type: 'text'
        },
        {
            label: 'Password',
            type: 'password'
        }
    ];

    const signupForm = [
        {
            label: 'Username',
            type: 'text'
        },
        ...loginForm
    ];

    const fields = {
        login: loginForm,
        signup: signupForm
    };

    return (
        <>
            {!isAuth && <div>
                <div>
                    <button onClick={() => setActiveState('login')}>Login</button>
                    <button onClick={() => setActiveState('signup')}>Register</button>
                </div>
                <div>
                    {error && <div className="error">{error}</div>}
                    <form onSubmit={handleSubmit}>
                        {fields[activeState].map((item) => {
                            return (
                                <div key={item?.label}>
                                    <label htmlFor={item?.label}>{item?.label}</label>
                                    <input 
                                        value={data[item?.label?.toLowerCase()]} 
                                        required 
                                        type={item?.type} 
                                        onChange={(e) => setData({...data, [item?.label.toLowerCase()]: e.target.value})} 
                                    />
                                </div>
                            )
                        })}
                        <button type="submit">{activeState.toUpperCase()}</button>
                    </form>
                </div>
            </div>
            }
            {isAuth && <Todo token={token} />}
        </>
    )
};

export default App;
