import { createContext, useEffect, useState } from "react";
import { useAuth } from "./AuthContext";
import axios from "axios";
export const  PlayerContext = createContext();
import { API_BASE_URL } from './AuthContext';



export const PlayerContextProvider = ({children}) => {

    const[songsData,setSongsData] = useState([]);
    const[albumData,setAlbumData] = useState([]);
    const{user, token,getAuthHeader} = useAuth();
    
    const getSongsData = async() =>{
       try{
           const response = await axios.get(`${API_BASE_URL}/api/songs`,{headers: getAuthHeader()})
           const songs = response.data.songs || [];
           setSongsData(songs);
        }catch (error){
          console.error(error);
           setSongsData([]);
        }
    }

     const getAlbumData = async() =>{
        try{
           const response = await axios.get(`${API_BASE_URL}/api/albums`,{headers: getAuthHeader()})
           const albums = response.data.albums || [];
           setAlbumData(albums);
        }catch (error){
          console.error(error);
           setAlbumData([]);
        }
    }

    const contextValue = {
        getAlbumData,
        getSongsData,
        songsData,
        albumData
    }

    useEffect(()=>{
        if(user && token){
            getAlbumData();
            getSongsData();
        }
    },[user,token])
    return (
    <PlayerContext.Provider value={contextValue}>
        {children}
    </PlayerContext.Provider>
  )
}
