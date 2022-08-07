import {getAuth, updateProfile} from 'firebase/auth'
import {useEffect, useState} from 'react';
import { updateDoc, doc } from 'firebase/firestore';
import {db} from '../firebase.config'
import {useNavigate, Link} from 'react-router-dom'
import { toast } from 'react-toastify';


function Profile(){

    const auth = getAuth();

    const [formData, setFormdData] = useState({
        name: auth.currentUser.displayName,
        email: auth.currentUser.email
    });
    const [changeDetails, setChangeDetails] = useState(false);
    

    const navigate = useNavigate();
    const onLogOut =()=>{
        auth.signOut();
        navigate('/');
    }
    const {name, email} = formData;
   
    const onSubmit = async()=>{

        try{
        if(auth.currentUser.displayName!=name){
            await updateProfile(auth.currentUser, {
                displayName: name
            })

            //update in firestore
           await updateDoc(doc(db, 'users', auth.currentUser.uid), {
                name
           })
           toast.success("Profile updated successfully");
           
        }
    }catch(err){
        toast.error("Couldn't update profile");
    }
}

    const onChange =(e)=>{
        setFormdData(prevData=>({
            ...prevData,
            [e.target.id]: e.target.value
        }))
        
    }

    return <>
         <div className="profile">
            <header className="profileHeader">
            <p className="pageHeader">My Profile</p>
            <button type='button' className="logOut" onClick={onLogOut}>Logout</button>    
            </header>
        </div> 

        <main>
            <div className="profileDetailsHeader">
                <p className="profileDetailsText">Personal Details</p>
                <p className="changePersonalDetails" onClick={()=>{
                    changeDetails && onSubmit();
                    setChangeDetails(!changeDetails);
                }}>
                    {changeDetails? 'done' : 'change'}
                </p>
            </div>
            <div className="profileCard">
                <form>
                    <input
                    type='text'
                    id='name'
                    className={!changeDetails? 'profileName': 'profileNameActive'}
                    disabled={!changeDetails}
                    value={name}
                    onChange={onChange}/>
                    
                </form>
            </div>
        </main>
    </>
       
    
    
    }
    
    export default Profile;