import { Navigate, Outlet } from "react-router-dom";
import useAuthStatus from "../hooks/useAuthStatus";
import ReactLoading from "react-loading";
const PrivateRoute = ()=>
{
    
    const {loggedIn, checkingStatus} = useAuthStatus();
    
        if(checkingStatus){
            return <ReactLoading className="loadingSpinner" type='spin' color='#00cc66'/>
        }

    return loggedIn ? <Outlet/> : <Navigate to='/sign-in' />;
}


export default PrivateRoute;

