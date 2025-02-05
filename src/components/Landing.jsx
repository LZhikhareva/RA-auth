import { useState } from 'react';

export default function Landing({ handleSubmit }) {
    const [inputOne, setInputOne] = useState('');
    const [inputTwo, setInputTwo] = useState('');
    return (
        <div className='page'>
            <div className='header'>
                <p>Neto Social</p>
                <form className='auth-form' onSubmit={(e) => handleSubmit(e, { inputOne, inputTwo })}>
                    <input type="text" placeholder='Username' onChange={(event) => setInputOne(event.target.value)} />
                    <input type="text" placeholder='Password' onChange={(event) => setInputTwo(event.target.value)} />
                    <button className="login-button" type='submit'>Login</button>
                </form>
            </div>
            <div className='landing-text'>
                <p>Beto Social</p>
                <p>Facebook and VK Killer.</p>
            </div>
        </div>
    )
}