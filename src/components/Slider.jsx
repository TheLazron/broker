import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { collection, getDocs, query, orderBy, limit } from 'firebase/firestore'
import { db } from '../firebase.config'
import { Swiper, SwiperSlide } from 'swiper/react';
import {Autoplay, Navigation, Pagination, Scrollbar, A11y } from 'swiper';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';



function Slider(){
    const [loading, setLoading] = useState(true);
    const [listings, setListings] = useState(null);

    const navigate = useNavigate();


    useEffect(()=>{
        const fetchListings = async ()=>{
            const listingRef = collection(db, "listings");
            const q = query(listingRef, limit(10));
            const querySnap = await getDocs(q);

            let listings= [];

            querySnap.forEach((doc)=>{
                return listings.push({
                    id: doc.id,
                    data: doc.data()
                })
            })

            setListings(listings);
            setLoading(false);


        }

        fetchListings();

    },[])

    if(loading){
        return <h3>Loading...</h3>
    }

    return (
        listings && (
            <>
                <p className='exploreHeading'>Recommended</p>

                <Swiper
                modules={[Autoplay , Navigation, Pagination, Scrollbar, A11y]}
                slidesPerView={1}
                navigation
                autoplay={{
                  delay: 2500,
                disableOnInteraction: false,
                     }}
                pagination={{ clickable: true }}
                scrollbar={{ draggable: true }}
                >
                {listings.map(({data, id})=>{

                  return  <SwiperSlide
              key={id}
              onClick={() => navigate(`/category/${data.type}/${id}`)}
            >
              <div
                style={{
                  background: `url(${data.imageUrls[0]}) center no-repeat`,
                  backgroundSize: 'cover',
                }}
                className='swiperSlideDiv'
              >
                <p className='swiperSlideText'>{data.name}</p>
                <p className='swiperSlidePrice'>
                  ${data.discountedPrice ?? data.regularPrice}{' '}
                  {data.type === 'rent' && '/ month'}
                </p>
              </div>
            </SwiperSlide>



                })}

                </Swiper>
            </>

        )



    )


}



export default Slider;