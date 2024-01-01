import React, { useEffect } from 'react';
import "./Nav.css";
import { useState } from 'react';
import {auth} from "./firebase.js";
import { signOut } from 'firebase/auth';
import {useNavigate} from "react-router-dom"
function Nav() {
  const [show,setShow]=useState(false);
  // const [countscrolls,setCountScrolls]=useState(0);
  const navigate=useNavigate();

  const handleScroll=()=>{
    if(window.scrollY>50){
      setShow(true);
    }
    else{
      setShow(false);
    }
  }


  useEffect(()=>{
    window.addEventListener("scroll",handleScroll);
  },[])    

  return (
      <div className={`nav ${show? `nav-black`:``}`}>
        


        <div className="nav-content">
            

            <img onClick={()=>{
              navigate("/");
            }}
             className="nav-logo-1"
            src="https://upload.wikimedia.org/wikipedia/commons/7/7a/Logonetflix.png" 
            alt="logo for netflix">    
            </img>

            <img 
            
            onClick={()=>{
               navigate("/profile");
            }}

            // onClick={()=>{
            //   signOut(auth).then(() => {
            //     console.log("message from Nav.js sign out succesful");
            //     // Sign-out successful.
            //   }).catch((error) => {
            //     console.log("There was an error signing you out");
            //     // An error happened.
            //   });
            // }}
            
            className="nav-avatar-1"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRuuv_89dQV4F_8TqeGgd2YfxGlN3I5vllGxb3jfJu7cg&s" 
            alt="avatar">    
            </img>



        </div>

       
        

    </div>
  )
}
export default Nav