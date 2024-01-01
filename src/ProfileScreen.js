import React from 'react';
import "./ProfileScreen.css";
import Nav from './Nav';
import { UseSelector, useSelector } from 'react-redux/es/hooks/useSelector';
import {auth} from "./firebase";
import { signOut } from 'firebase/auth';
function ProfileScreen() {
    const user=useSelector(state=>state.user.user?.email);
    return (
    <div className="profileScreen">

        {/* <h1>This is the profile</h1> */}
        <Nav/>

        <div className="profileScreen-body">

            <h1>Edit Profile</h1>
            <div className="profileScreen-info">
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRuuv_89dQV4F_8TqeGgd2YfxGlN3I5vllGxb3jfJu7cg&s" alt="avatar1"></img>

                <div className="profileScreen-details">

                    <h2>
                        {user}
                    </h2>

                    <div className="profileScreen-plans">
                    <h3>Plans</h3>

                        <button 
                            onClick={()=>{
                            signOut(auth).then(() => {
                                console.log("message from ProfileScreen.js sign out succesful");
                                // Sign-out successful.
                            }).catch((error) => {
                                console.log("There was an error signing you out");
                                // An error happened.
                            });
                            }}
                        className="profileScreen-signout">Sign Out</button>
                    </div>

                </div>
            </div>


        </div>

    </div>
  )
}

export default ProfileScreen;