import {children, createContext, useEffect, useState,useContext} from 'react';
import { PlayerContext } from "./PlayerContext";


export const SearchContext = createContext();

export const  useSearch  = () =>{
    const context = useContext(SearchContext);

    if(!context){
        throw new Error('useSearch must be  usesd within a search ]Provider');
    }
    return context;
}

export const SearchProvider = ({ children }) =>{
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResult, setSearchResult] = useState({songs:[], albums:[]});
    const [isSearchActive, setIsSearchActive] = useState(false);
    const {songsData, albumsData} = useContext(PlayerContext);

    useEffect(() =>{
     if(searchQuery.trim() === ''){
        setSearchResult({songs: [], albums: []});
        return;
     }

     const query = searchQuery.toLowerCase();

     const filteredSongs = songsData.filter(song => 
       song.name.toLowerCase().includes(query) || song.desc.toLowerCase().includes(query)
     );

     const filteredAlbum = albumsData.filter(album =>
        album.name.toLowerCase().includes(query) || album.desc.toLowerCase().includes(query)
     )

     setSearchResult({
        songs : filteredSongs,
        albums : filteredAlbum
     })
    },[searchQuery,songsData,albumsData]);

    const clearSearch = () =>{
        setSearchQuery('');
        setSearchResult({songs:[], albums: []});
        setIsSearchActive(false);
    }

   const contextValue = {
    searchQuery,setSearchQuery,
    searchResult,
    isSearchActive,setIsSearchActive,
    clearSearch
   }

    return(
        <SearchContext.Provider value={contextValue}> 
            {children}
        </SearchContext.Provider>
    )
}