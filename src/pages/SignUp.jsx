import React, { useContext, useState } from 'react'
import SignUpBG from '../assets/SignUpBG.png'
import { Link, Navigate, useNavigate } from "react-router-dom";
import Logo from '../assets/Logo.png'
import SignUpImage from '../assets/SignUpImage.png'
import { UserAuth } from '../context/AuthContext';
import { validatePassword } from 'firebase/auth';
function SignUp() {
    const { user, createUser } = UserAuth();
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');

    //signup
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()){
            return;
        }

        setError('');
        try {
            await createUser(email, password);
            navigate('/signin')
        } catch (e) {
            setError(e.message);
            console.log(e.message);
        }
    };

    // validate SignUp
    const validateForm = () => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (email.trim() === '') {
            setEmailError('Email cannot be empty.');
        } else if (!emailRegex.test(email)) {
            setEmailError('Invalid email format.');
        } else {
            setEmailError('');
        }

        if (password.trim() === '') {
            setPasswordError('Password cannot be empty.');
        } else if (password.length < 3) {
            setPasswordError('Password must be at least 3 characters.');
        } else {
            setPasswordError('');
        }

        return !emailError && !passwordError;
    }

    return (
        <div style={{ backgroundImage: `url(${SignUpBG})` }}
            className='bg-no-repeat bg-cover bg-center h-screen px-40 py-16 bg-[#181754] text-white'
        >
            <div className='flex justify-center items-center h-full text-3xl'>
                <div className='flex flex-col justify-center items-center w-1/2 mr-6'>
                    <img src={SignUpImage}></img>
                    <div>
                        <p className='font-normal text-[25px] inline'>Already have an account ?  </p>
                        <Link to='/signIn' className='font-normal text-[25px] textSignInGradient underline underline-offset-4 decoration-[#3753cf8f] inline'>Log In</Link>
                    </div>
                </div>
                <div className='flex flex-col justify-center items-center w-1/2 ml-20'>
                    <Link to='/'><img src={Logo} alt="Logo" className='w-28' /></Link>
                    <h1 className='font-bold text-[50px] tracking-[2px] mt-4'>REGISTER</h1>
                    <p className='font-light text-[30px] tracking-[2px] mt-4'>Create New Account</p>
                    <form onSubmit={handleSubmit} className='flex flex-col gap-6 mt-6'>
                        <div className='input-box'>
                            <img width="35" height="35" src='https://img.icons8.com/fluency-systems-regular/48/151c38/new-post.png' className='icon mt-3 ml-6'></img>
                            {emailError == '' ? (
                                <input type='text' name='email' placeholder='Email' className='w-[600px] h-[60px] font-light' onChange={(e) => setEmail(e.target.value)} value={email}></input>
                            ) : (
                                <div>
                                    <p className="text-red-500 absolute text-sm pl-7">{emailError}</p>
                                    <input type='text' name='email' placeholder='Email' className='w-[600px] h-[60px] font-light'
                                        style={{ borderColor: "red" }} onChange={(e) => setEmail(e.target.value)} value={email}></input></div>
                            )}
                        </div>
                        <div className='input-box'>
                            <img width="35" height="35" src='https://img.icons8.com/fluency-systems-regular/48/151c38/password--v1.png' className='icon mt-3 ml-6'></img>
                            {passwordError == '' ? (
                                <input type='password' name='password' placeholder='Password' className='w-[600px] h-[60px] font-light' onChange={(e) => setPassword(e.target.value)}></input>
                            ) : (
                                <div>
                                    <p className="text-red-500 absolute text-sm pl-7">{passwordError}</p>
                                    <input type='password' name='password' placeholder='Password' className='w-[600px] h-[60px] font-light' style={{ borderColor: "red" }} onChange={(e) => setPassword(e.target.value)}></input></div>
                            )}
                        </div>
                        <button className='box-btnGradient font-bold text-[20px] text-[#0cb6ff] flex flex-col justify-center items-center py-3 mt-10 w-[600px]'>SIGNUP</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default SignUp