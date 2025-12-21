import { Toaster } from "react-hot-toast";
import Display from "./components/Display";
import AuthWrapper from "./components/AuthWrapper";
// import { Sidebar } from "lucide-react";
import Sidebar from "./components/Sidebar";
import Player from "./components/Player";
import { useContext } from "react";
import { PlayerContext } from "./context/PlayerContext";

const App = () => {
  const {audioRef, track} = useContext(PlayerContext);

  return (
    <>
    <Toaster />
     <AuthWrapper>
      <div className="h-screen bg-black">
        <div className="h-[90%] flex">
          <Sidebar />
          <Display />
        </div>
        {/* Player comment */}
        <Player />
        <audio ref={audioRef} src={track ? track.file: ""} preload="auto"></audio>
       </div>
    </AuthWrapper>
    </>
  )
}

export default App;