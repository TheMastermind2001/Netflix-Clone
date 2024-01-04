import React from 'react'
import "./PlanScreen.css"
import { useState } from 'react';
import { useEffect } from 'react';
import db from "./firebase";
import {collection} from 'firebase/firestore/lite';
import { collection as collectionlite } from 'firebase/firestore'; 
import {query,where,getDocs} from 'firebase/firestore/lite';
import { doc } from 'firebase/firestore';
// import { doc } from 'firebase/firestore/lite';
import {onSnapshot} from 'firebase/firestore' ;
import { addDoc } from 'firebase/firestore';
// import { addDoc } from 'firebase/firestore/lite';
// import { collection } from 'firebase/firestore';
import { useSelector } from 'react-redux';

// import redirectToCheckout
// import { loadStripe } from '@stripe/stripe-js';

import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from "firebase/auth";

// var firebase = require('firebase');
// console.log("Hi");

const firebaseConfig = {
    apiKey: "AIzaSyAWVHtDoE_N46GR2nSypOOkj4uRUumBzKs",
    authDomain: "netflix-clone-e93d2.firebaseapp.com",
    projectId: "netflix-clone-e93d2",
    storageBucket: "netflix-clone-e93d2.appspot.com",
    messagingSenderId: "230073108046",
    appId: "1:230073108046:web:bae2907e979aaa0847e51f"
  };

  const app = initializeApp(firebaseConfig);
  const db1 = getFirestore(app);
  const auth = getAuth(app);
  // const auth2=firebase.auth();
  // console.log(auth===auth2);

 
  





function PlanScreen() {
  // const[products,setProducts]=useState([]);
  const[products,setProducts]=useState({});
  const currentUser=useSelector(state=>state.user.user);
  
  
  const createCheckoutSession = async (priceId) => {
    try {
      console.log(db1);
      console.log(currentUser.id);
      // const temp1=collection(db, 'customers', currentUser.id, 'checkout_sessions');
      // console.log(temp1);
      const customerRef=collectionlite(db1, 'customers');
      const customerdocRef = doc(customerRef, currentUser.id);
      console.log(customerdocRef);
      const checkoutSessionsRef = collectionlite(customerdocRef, 'checkout_sessions');
      const checkoutSessionData = {
      price: priceId,
      success_url: window.location.origin,
      cancel_url: window.location.origin,
      };  
      const docRef = await addDoc(checkoutSessionsRef, checkoutSessionData);
      console.log(docRef);
      onSnapshot((docRef), async (snap) => {
        const { error, url } = snap.data();
        if (error) {
          // Show an error to your customer and
          // inspect your Cloud Function logs in the Firebase console.
          alert(`An error occurred: ${error.message}`);
        }
        if (url) {

          /*const stripe=await loadStripe("pk_test_51OTbNBSB8iKaafDy5pQgM1drdUrXbghSy9t377Ujv3biqYKVI9gf9Izp15FlY3o4AlULk7khqkfuqsL6t1mNXirG00fqK8a7Wl");
          stripe.redirectToCheckout({url});
          */

          // We have a Stripe Checkout URL, let's redirect.
          // window.location.assign(url);
          window.location.href=url;
        }
        
      })

      /*
      const docRef = await addDoc(collection(db, 'customers', currentUser.id, 'checkout_sessions'), {
        price: priceId,
        success_url: window.location.origin,
        cancel_url: window.location.origin,
      });
  
      // Wait for the CheckoutSession to get attached by the extension
      onSnapshot(doc(docRef), (snap) => {
        const { error, url } = snap.data();
        if (error) {
          // Show an error to your customer and
          // inspect your Cloud Function logs in the Firebase console.
          alert(`An error occurred: ${error.message}`);
        }
        if (url) {
          // We have a Stripe Checkout URL, let's redirect.
          window.location.assign(url);
        }
        
      });*/
    } catch (error) {
      console.error('Error creating checkout session:', error.message);
    }
  };
  
  // Call the function to create the checkout session
  

  useEffect(()=>{
    // const temp=db.collection('customers').get;
    // console.log(db);

    const getDB=async()=>{
      try {
        const productRef = collection(db, 'products');
        console.log(productRef);
        const q = query(productRef, where('active', '==', true));
        console.log(q);
        const snapshot = await getDocs(q);
        console.log(snapshot);
        if (snapshot.empty) {
          console.log('No matching documents.');
          return;
        }
        
        const func2=async()=>{
          const productdetails={};
          snapshot.docs.forEach(async (doc,index) => {
            // const productData = { id: doc.id, ...doc.data() };
            productdetails[doc.id]=doc.data();
            const priceRef = collection(doc.ref, 'prices');
            const q = query(priceRef, where('active', '==', true));
            const priceSnapshot = await getDocs(q);
            priceSnapshot.docs.forEach((pricedoc)=>{
              productdetails[doc.id].prices=[];
              productdetails[doc.id].prices.push({id: pricedoc.id,...pricedoc.data()});
            })
            // console.log(index,productdetails);
          } ); 
          return productdetails;
        }
        
        const ans=await func2();
        console.log(ans);
        const arr=Object.entries(ans);
        console.log(arr);
        setProducts(ans);
        (Object.entries(products)).map(([id,data])=>{
          console.log(data);
          // return <div>{data.name}</div>
        })
        // console.log(productdetails.entries);

      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
    getDB();
  },[]); 
   
  return (
    <div className="planScreen">
        {Object.entries(products).map(([id,data])=>{
          return (
          <div className="planScreen-plan" key={id}>
            <div className="planScreen-info">
              <h5>{data.name}</h5> 
              <h6>{data.description}</h6>
              
            </div>
            <button 
            onClick={
              ()=>{
                console.log(products[id].prices[0].id);
                createCheckoutSession(products[id].prices[0].id);
                // loadCheckout(productData.prices[0].id);
              }
            }
            
            
            >Subscribe</button> 
          </div>
          )
        })}
    </div>
  )
}

export default PlanScreen;