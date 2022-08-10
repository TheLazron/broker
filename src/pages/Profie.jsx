import {getAuth, updateProfile} from 'firebase/auth'
import {useEffect, useState} from 'react';
import {db} from '../firebase.config'
import {useNavigate, Link} from 'react-router-dom'
import { toast } from 'react-toastify';
import arrowRight from '../assets/svg/keyboardArrowRightIcon.svg'
import homeIcon from '../assets/svg/homeIcon.svg'
import {updateDoc, doc, collection, getDocs, query, where, orderBy, deleteDoc} from 'firebase/firestore';
import ListingItem from '../components/ListingItem';
 
function Profile(){

    const auth = getAuth();
    const [loading, setLoading] = useState(true);
    const [listings, setListings] = useState(null);

    useEffect(()=>{

        console.log(auth.currentUser.uid);
        console.log("police");

        const fetchUserListings = async ()=>{
            const listingRef = collection(db, 'listings');

            const q = query(listingRef, where('userRef', '==', auth.currentUser.uid));

            const querySnap = await getDocs(q);

            const listings=[];

            querySnap.forEach((doc)=>{
                return listings.push({
                    id: doc.id,
                    data: doc.data(),
                })

            })
             console.log("listings",listings);
            setListings(listings);
            setLoading(false);
        }

        fetchUserListings();  


    }, [auth.currentUser.uid])






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

    const onDelete= async (listingId)=>{
        console.log("del req");
        if(window.confirm("Sure you want to delete?")){
            await deleteDoc(doc(db, 'listings', listingId));
            const updateListings = listings.filter(listing=>listing.id!==listingId);
            setListings(updateListings);
            toast.success("Successfully deleted listing");

            
        }
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
            <Link to='/create-listing' className='createListing'>
          <img src={homeIcon} alt='home' />
          <p>Sell or rent your home</p>
          <img src={arrowRight} alt='arrow right' />
        </Link>


        {!loading && listings.length >0 && (

            <>
                <p className='listingText'>Your Listing</p>
                <ul className="listingList">
                    {listings.map(listing=>{
                       return <ListingItem 
                        key={listing.id} 
                        listing={listing.data} 
                        id={listing.id}
                        onDelete={()=> onDelete(listing.id)}/>


                    })}
                </ul>

            </>



        )}


        </main>
    </>
       
    
    
    }
    
    export default Profile;