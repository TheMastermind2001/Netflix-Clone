import React from 'react'
import "./PlanScreen.css"
import { useState } from 'react';
import { useEffect } from 'react';
import db from "./firebase";
import {collection, query,where,getDocs} from 'firebase/firestore/lite';
// import { collection } from 'firebase/firestore/lite';

function PlanScreen() {
  // const[products,setProducts]=useState([]);
  const[products,setProducts]=useState({});
  
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
            // onClick={
            //   ()=>{
            //     // loadCheckout(productData.prices[0].id);
            //   }
            // }
            
            
            >Subscribe</button> 
          </div>
          )
        })}
    </div>
  )
}

export default PlanScreen;