import { useState } from "react";
import { Link } from "react-router-dom";
import {ReactComponent as ArrowRightIcon} from '../assets/svg/keyboardArrowRightIcon.svg'
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { toast } from "react-toastify";


function ForgotPassword(){

    const [email, setEmail]=useState('');
    const auth = getAuth();

    const onChange=(e)=>{
        setEmail(e.target.value)
    }

    const onSubmit = async (e)=>{
        e.preventDefault();

        try{
            await sendPasswordResetEmail(auth, email);
            toast.success("Password Reset Mail Sent");
        }
        catch(err){
            console.log(err);
            toast.error('Failed to send mail');
        }

    }



    
    return (
        <>
            <div className='pageContainer'>
      <header>
        <p className='pageHeader'>Forgot Password</p>
      </header>
      <main>
        <form onSubmit={onSubmit}>
          <input
            type='email'
            className='emailInput'
            placeholder='Email'
            id='email'
            value={email}
            onChange={onChange}
          />
         <Link className='forgotPasswordLink' to='/sign-in'>
            Sign In
          </Link>
          <div className='signInBar'>
            <div className='signInText'>Send Reset Link</div>
            <button type="submit" className='signInButton'>
              <ArrowRightIcon fill='#ffffff' width='34px' height='34px' />
            </button>
          </div>
        </form>
      </main>
    </div>
        </>
    )
    
    }
    
    export default ForgotPassword;