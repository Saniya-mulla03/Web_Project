import {BrowserRouter, Routes, Route} from "react-router-dom";
import { Home } from "./pages/Home";
import {About} from "./pages/About";
import { Contact } from "./pages/Contact";
import { CampusInfo } from "./pages/CampusInfo";
import { Register } from "./pages/Register";
import { Login } from "./pages/Login";
import { Navbar } from "./components/Navbar";
import {Error} from "./pages/Error";
import { Footer } from "./components/Footer/Footer";
import { Logout } from "./pages/Logout";
import { AdminLayout } from "./components/layouts/Admin-Layout";
import { AdminUsers } from "./pages/Admin-Users";
import { AdminContacts } from "./pages/Admin-Contacts";
import { AdminUpdate } from "./pages/Admin-update";
import { CampusInfoUpdate } from "./pages/CampusInfo-update";
import { CampusInfoEdit } from "./pages/CampusInfo-Edit";
const App = () => {

  return <>
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/about" element={<About />}/>
        <Route path="/contact" element={<Contact />}/>
        <Route path="/campusInfo" element={<CampusInfo />}/>
        <Route path="/register" element={<Register />}/>
        <Route path="/login" element={<Login />}/>
        <Route path="*" element={<Error/>}/>
        <Route path="/logout" element={<Logout/>}/>
        <Route path="/admin" element={<AdminLayout/>}>
          <Route path="users" element={<AdminUsers/>}/>
          <Route path="contacts" element={<AdminContacts/>}/>
        </Route>
        <Route path="/admin/users/:id/edit" element={<AdminUpdate/>}/>
        <Route path="/admin/campusInfo/add" element={<CampusInfoUpdate/>}/>
        <Route path="/admin/campusInfo/:id/edit" element={<CampusInfoEdit/>}/>
      </Routes>
      <Footer/>
    </BrowserRouter>
  </>
};

export default App;
