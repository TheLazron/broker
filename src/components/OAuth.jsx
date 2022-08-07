import { useLocation, useNavigate } from "react-router-dom";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import {doc, setDoc, getDoc, serverTimestamp} from 'firebase/firestore';
import {db} from '../firebase.config'
import { toast } from 'react-toastify';
import googleIcon from '../assets/svg/googleIcon.svg';


function OAuth(){

const navigate = useNavigate();
const location = useLocation();



const onGoogleClick= async()=>{

    try{
    const auth = getAuth();
    const provider = new GoogleAuthProvider(auth);
    const result = await signInWithPopup(auth, provider);
    const user = result.user;

    const docSnap = await getDoc(doc(db, 'users', user.uid));

    if(!docSnap.exists()){
        await setDoc(doc(db, 'users', user.uid),{
            name: user.displayName,
            email: user.email,
            timeStamp: serverTimestamp()
        })
    }
    navigate('/')

}catch(err){
    console.log(err);
    toast.error("Couldn't authorize with Google'")
}
}

return (
    <div className="socialLogin">
    <p>Sign {location.pathname==='/sign-up'? 'up' : 'in'} with</p>
    <button className="socialIconDiv" onClick={onGoogleClick}>
        <img className="socialIconImg" src={googleIcon} alt="google"/>
    </button>
    </div>


)


}

export default OAuth;