import React from 'react'
import "./PlanScreen.css"
import { useState } from 'react';
import { useEffect } from 'react';
import db from "./firebase";
import {collection} from 'firebase/firestore/lite';
import { collection as collectionlite } from 'firebase/firestore'; 
import {query,where,getDocs} from 'firebase/firestore/lite';
import { doc } from 'firebase/firestore';
import {onSnapshot} from 'firebase/firestore' ;
import { addDoc } from 'firebase/firestore';
import { useSelector } from 'react-redux';
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from "firebase/auth";

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

function PlanScreen() {
  const[products,setProducts]=useState({});
  const[sub,setSub]=useState({});
  const currentUser=useSelector(state=>state.user.user);
  const createCheckoutSession = async (priceId) => {
    try {
      console.log(db1);
      console.log(currentUser.id);
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
          alert(`An error occurred: ${error.message}`);
        }
        if (url) {
          window.location.href=url;
        }
        
      })
    } catch (error) {
      console.error('Error creating checkout session:', error.message);
    }
  };
  
  
  useEffect(()=>{
    
    const customerId = currentUser?.id; // Replace with the actual customer ID
    if(customerId==null){
      return;
    }
// Get a reference to the "payments" collection for the specified customer
    const paymentsCollectionRef = collection(db, "customers", customerId, "payments");

    getDocs(paymentsCollectionRef)
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          const paymentDetails = doc.data();
          const paymentId = paymentDetails.id;
          const created = paymentDetails.created;
          const role = paymentDetails.payment_method_options.card.mandate_options.description;
          // console.log("Payment Details:", paymentDetails);
          // console.log("Payment ID:", paymentId);
          // console.log("Created:", created);
          // console.log("Role:", role);
          setSub(
            {
              role:role,
              start:created

            }
          )
        });
      })
      .catch((error) => {
        console.error("Error getting payments:", error);
      });

  },[currentUser?.id]);

  console.log(sub);

  useEffect(()=>{
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
            productdetails[doc.id]=doc.data();
            const priceRef = collection(doc.ref, 'prices');
            const q = query(priceRef, where('active', '==', true));
            const priceSnapshot = await getDocs(q);
            priceSnapshot.docs.forEach((pricedoc)=>{
              productdetails[doc.id].prices=[];
              productdetails[doc.id].prices.push({id: pricedoc.id,...pricedoc.data()});
            })
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
        })
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
    getDB();
  },[]); 
   
  return (
    <div className="planScreen">
        {Object.entries(products).map(([id,data])=>{

          const isCurrentPackage=(data?.name?.includes(sub?.role));

          return (
          <div className="planScreen-plan" key={id}>
            <div className="planScreen-info">
              <h5>{data.name}</h5> 
              <h6>{data.description}</h6>
              
            </div>
            <button 

            className={isCurrentPackage?"current-package-button":"subscribe-button"}

            onClick={
              ()=>{
                console.log(products[id].prices[0].id);

                !isCurrentPackage && createCheckoutSession(products[id]?.prices[0]?.id);
              }
            }
            >
              {isCurrentPackage?"Current Package":"Subscribe"}
            </button> 
          </div>
          )
        })}
    </div>
  )
}

export default PlanScreen;