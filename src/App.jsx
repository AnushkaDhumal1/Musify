import { Toaster } from "react-hot-toast";
import Display from "./components/Display";
import AuthWrapper from "./components/AuthWrapper";
// import { Sidebar } from "lucide-react";
import Sidebar from "./components/Sidebar";

const App = () => {
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
       </div>
    </AuthWrapper>
    </>
  )
}

export default App;