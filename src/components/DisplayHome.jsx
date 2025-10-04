import React, { useContext } from 'react'
import { PlayerContext } from '../context/PlayerContext';
import { AlbumIcon } from 'lucide-react';
import AlbumItem from './AlbumItem';

const DisplayHome = () => {
  //  const { logout } = useAuth();

  //   const handleLogout = () => {
  //     logout();
  //   }
   const {songsData = [], albumsData = []} = useContext(PlayerContext);
   console.log(albumsData);

  return (
    <>
      {/* <div>Display the albums and songs </div>
      <button className="bg-red-600 hover:bg-red-700 py-1 px-3 rounded-2xl text-[15px] text-white cursor-pointer transition-colors flex items-center gap-1"
        onClick={handleLogout}>Logout</button> */}
      <div className="mb-4">
        <h1 className="my-5 font-bold text-2xl">Featured Charts</h1>
        <div className="flex overflow-auto">
          {/* Display the album */}
          {albumsData?.map((item,index)=>(
            <AlbumItem 
             key={index}
             name={item.name}
             desc={item.desc}
             id={item._id}
             image={item.imageUrl}
            />
          ))}
        </div>
      </div>
      <div className="mb-4">
        <h1 className="my-5 font-bold text-2xl">Today's biggest hits</h1>
        <div className="flex overflow-auto">
          {/* Display the song */}
          Displaying the songs
        </div>
      </div>

    </>
  )
}

export default DisplayHome