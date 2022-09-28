import {useState,useEffect} from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { Error,Loader,SongCard } from '../components';
import { useGetSongsByCountryQuery } from "../redux/services/shazamCore";

const AroundYou = () => {

    const [country, setCountry] = useState("");
    const [loading, setLoading] = useState(true);
    const {activeSong,isPlaying} = useSelector(state=>state.player);

    const {data,isFetching,error} = useGetSongsByCountryQuery('IL');

    useEffect(()=>{
        // at_7IEXGSYwwA8ZFO0UEcj19rgFIAQ6a
        axios.get(`https://geo.ipify.org/api/v1/country?apiKey=at_7IEXGSYwwA8ZFO0UEcj19rgFIAQ6a`)
        .then((res)=>setCountry(res?.data?.location?.country))
        .catch((err)=>console.log(err))
        .finally(()=>setLoading(false));

    },[country])


    if(isFetching || loading) return <Loader title="loading"/>

    if(error) return <Error/>

    return(
        <div className='flex flex-col'>

            <h2 className='font-bold text-3xl  text-white text-left mt-4 mb-10'>Around You <span className='font-black'>IL</span>  </h2>

            <div className='flex flex-wrap sm:justify-start justify-center gap-8'>

                {data?.map((song,i)=>(
                    <SongCard key={song.key} song={song} isPlaying={isPlaying} activeSong={activeSong} i={i} data={data} />
                ))}

            </div>

        </div>
    )

}

export default AroundYou;
