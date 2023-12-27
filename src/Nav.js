import React, { useEffect } from 'react'
import "./Nav.css"
import { useState } from 'react'
function Nav() {

  const [show,setShow]=useState(false);
  // const [countscrolls,setCountScrolls]=useState(0);

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
            

            <img className="nav-logo-1"
            src="https://upload.wikimedia.org/wikipedia/commons/7/7a/Logonetflix.png" 
            alt="logo for netflix">    
            </img>

            <img className="nav-avatar-1"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRuuv_89dQV4F_8TqeGgd2YfxGlN3I5vllGxb3jfJu7cg&s" 
            alt="avatar">    
            </img>



        </div>

       
        

    </div>
  )
}
export default Nav