
import Home from "./pages/home"

import Layout from "./components/layout"
import {Routes, BrowserRouter as Router, Route} from "react-router-dom"
import Memory from "./pages/memory/memory"
import Login from "./pages/login/login"
import Register from "./pages/register/register"
import MemoryEdit from "./pages/momentEditForm/momentForm"
import CreateMoment from "./pages/createMomentForm/createMomentForm"
import NotFound from "./pages/404/404"
import { useContext } from "react"
import { Context } from "./context/appContext"
function App() {
  const {user} = useContext(Context)
 
  return (
    <Router>
    <div className="App" >
      <Layout>
       
       <Routes>
        <Route path="/" element={user?<Home />:<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} /> 
        <Route path="/createmoment" element={user?<CreateMoment/>:<Login />} /> 
        <Route path="/memories/memoryedit/:id" element={user?<MemoryEdit/>:<Login />}/>
        <Route path="/memories/:id" element={user?<Memory/>:<Login />}/>
        <Route path="*" element={<NotFound/>}/>
       </Routes>
      </Layout>
      
    </div>
    </Router>
  );
}

export default App;
