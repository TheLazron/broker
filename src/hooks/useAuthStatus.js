import {getAuth, onAuthStateChanged} from 'firebase/auth';
import {useState, useEffect, useRef} from 'react';



const useAuthStatus=()=>{
    const [loggedIn, setLoggedIn] =  useState(false);
    const [checkingStatus, setCheckingStatus] = useState(true);
    const isMounted = useRef(true)
    
    const auth = getAuth();

    useEffect(()=>{


        if(isMounted){
            onAuthStateChanged(auth, (user)=>{
                if(user){
                    setLoggedIn(true);
                 
                }
                setCheckingStatus(false)
            })
          
        }
        return ()=>{
            isMounted.current=false
        }


    }, [isMounted])
    console.log('loh',loggedIn, checkingStatus);
 return { loggedIn, checkingStatus};

}

export default useAuthStatus;