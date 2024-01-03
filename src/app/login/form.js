'use client'
import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function Form() {
    const [ loginEmail, setLoginEmail ] = useState('');
    const [ loginPassword, setLoginPassword ] = useState('');

    const router = useRouter();
    const handleSubmit = async (e) => {
        e.preventDefault();
        const account = { loginEmail, loginPassword };
        const response = signIn('credentials', {
          email: account.loginEmail,
          password: account.loginPassword,
          redirect: false
        });

        if ((await response).error) {
          // display a message to the user
          alert("Login failed");
        } else {
          router.push('/');
          router.refresh();
        } 
    }
    return (
        <div className="login_page">
          <form onSubmit={handleSubmit} className="login-form">
            <h1>Login</h1>
            <input 
              className='input'
              type="email" 
              required
              name="Email" 
              placeholder="Email"
              value={loginEmail}
              onChange={e => setLoginEmail(e.target.value)} />
  
            <input 
              className='input'
              type="password" 
              required
              name="Password" 
              placeholder="Password"
              value={loginPassword}
              onChange={e => setLoginPassword(e.target.value)} />
  
            <button type="submit">Login</button>
          </form>
        </div>
      )
}