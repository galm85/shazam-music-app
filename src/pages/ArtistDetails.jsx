

import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import {DetailsHeader,Error,Loader,RelatedSongs} from '../components';
import { useGetSongDetailsQuery, useGetSongRelatedQuery,useGetArtistDetailsQuery} from "../redux/services/shazamCore";

const ArtistDetails = () => {

    const {activeSong,isPlaying}  = useSelector(state=>state.player);
    const {id:artistId} = useParams();

    
    const {data:artistData,isFetching:isFetchingArtistDetails,error} = useGetArtistDetailsQuery(artistId);

    
    if(isFetchingArtistDetails) return <Loader title="Searching...."/>

    if(error) return <Error/>
    
    return(
        <div className="flex flex-col">

                <DetailsHeader artistId={artistId} artistData={artistData}/>


                <RelatedSongs data={Object.values(artistData?.songs)} 
                              isPlaying={isPlaying} 
                              activeSong={activeSong} 
                              artistId={artistId}
                          />
        </div>
    )

}

export default ArtistDetails;
