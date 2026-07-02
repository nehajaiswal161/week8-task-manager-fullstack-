import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      await axios.post('http://localhost:8085/api/auth/login', { username, password });
      localStorage.setItem('user', username);
      navigate("/");
    } catch (error) {
      alert("Invalid credentials");
    }
  };

  return (
    <div className="container" style={{ textAlign: 'center', marginTop: '50px' }}>
      <h2>Login</h2>
      <input onChange={(e) => setUsername(e.target.value)} placeholder="Username" /><br/><br/>
      <input type="password" onChange={(e) => setPassword(e.target.value)} placeholder="Password" /><br/><br/>
      <button onClick={handleLogin}>Login</button>
    </div>
  );
}
export default Login;