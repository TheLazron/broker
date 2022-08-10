import {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';

import {collection, query, getDocs, where, orderBy, limit, startAfter} from 'firebase/firestore';
import {db} from '../firebase.config';
import { toast } from 'react-toastify';
import ListingItem from '../components/ListingItem';

function Catergory(){

    const params = useParams();
    const [listings, setListings] = useState(null);
    const [loading, setLoading] = useState(true);
    const [lastFetchedListing, setLastFetchedListing] = useState(null)

  useEffect(()=>{

    const fetchListings = async ()=>{
      try {
     // Get reference
     const listingsRef = collection(db, 'listings')

     // Create a query
     const q = query(
       listingsRef,
       where('type', '==', params.categoryName),
       limit(2),
      
     )


     // Execute query
     const querySnap = await getDocs(q);

     const lastVisible = querySnap.docs[querySnap.docs.length - 1]
     setLastFetchedListing(lastVisible)

     const listings = [];

     querySnap.forEach((doc) => {
       return listings.push({
         id: doc.id,
         data: doc.data(),
       })
     })

         setListings(listings)
         setLoading(false);
         toast.success("Data fetched successfully")
         console.log("listing", listings);
        
     }catch(err){
         console.log(err);
         toast.error('Could not fetch Listings');
     }

     
 }

 fetchListings();

  },[params.categoryName])


const onFetchMoreListings= async ()=>{

  try{
      const listingsRef = collection(db, 'listings');

      const q= query(listingsRef,
         where('type', '==', params.categoryName),
         startAfter(lastFetchedListing),
         limit(10))

      const querySnap = await getDocs(q);

      const lastVisible = querySnap.docs[querySnap.docs.length - 1]
      setLastFetchedListing(lastVisible)

      const listings = []

      querySnap.forEach((doc) => {
        return listings.push({
          id: doc.id,
          data: doc.data(),
        })
      })

      setListings((prevState) => [...prevState, ...listings])
      setLoading(false)
    } catch (error) {
      toast.error('Could not fetch listings')
    }

  }







return ( <div className='category'>
<header>
  <p className='pageHeader'>
    {params.categoryName === 'rent'
      ? 'Places for rent'
      : 'Places for sale'}
  </p>
</header>
{loading? <h3>Loading...</h3>: listings && listings.length>0 ? (
  <>
  <main>
    {listings.map((listing)=>{
     return <ListingItem id={listing.id} listing={listing.data} key={listing.id}/>
    })}
  </main>

  <br />
          <br />
          {lastFetchedListing && (
            <p className='loadMore' onClick={onFetchMoreListings}>
              Load More
            </p>
          )}



  </>
): (
        <p>No listings for {params.categoryName}</p>
      )}
</div>

)

}

export default Catergory;
{/* <div className='category'>
      <header>
        <p className='pageHeader'>
          {params.categoryName === 'rent'
            ? 'Places for rent'
            : 'Places for sale'}
        </p>
      </header>

      {loading ? (
        <h3>Loading...</h3>
      ) : listings && listings.length > 0 ? (
        <>
          <main>
            <ul className='categoryListings'>
         
              {listings.map(listing=><ListingItem id={listing.id} key={listing.id} listing={listing.data}/>)}
            </ul>
          </main>
        </>
      ) : (
        <p>No listings for {params.categoryName}</p>
      )}
    </div> */}