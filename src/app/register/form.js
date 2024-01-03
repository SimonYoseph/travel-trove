'use client'
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Form() {

    const [ registerEmail, setRegisterEmail ] = useState('');
    const [ registerPassword, setRegisterPassword ] = useState('');
    const [ confirmPassword, setConfirmPassword ] = useState('');

    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (registerPassword !== confirmPassword) {
            alert("Passwords do not match");
            return;
        }
        const account = { registerEmail, registerPassword };
        const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            email: account.registerEmail,
            password: account.registerPassword
        })
        });

        if ((await response).ok === false) {
          // display a message to the user
          alert("User already exists");
        } else if ((await response).ok === true) {
          router.push('/');
          router.refresh();
        } 
    }
    return (
        <div className="register-page">
          <form onSubmit={handleSubmit} className="register-form">
            <h1>Register</h1>
            <input 
              className="input"
              type="email" 
              required
              name="Email" 
              placeholder="Email"
              value={registerEmail}
              onChange={e => setRegisterEmail(e.target.value)} />
  
            <input 
              className="input"
              type="password" 
              required
              name="Password" 
              placeholder="Password"
              value={registerPassword}
              onChange={e => setRegisterPassword(e.target.value)} />

            <input
              className="input"
              type="password"
              required
              name="Password" 
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={e => setConfirmPassword(e.target.value)} />
  
            <button type="submit">Register</button>
          </form>
        </div>
      )
}