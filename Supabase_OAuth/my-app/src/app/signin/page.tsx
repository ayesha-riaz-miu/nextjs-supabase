"use client";

import { useState } from "react";
import { supabase_client } from "../api/supabaseClinet";
import { useRouter } from "next/navigation";




export default function page() {
    const[email,setemail] = useState('')
    const[password,setpassword] = useState('')
    const[message,setmessage]= useState('')

    const routes = useRouter()
   
    const set_signin=async()=>{
        const{data,error}= await supabase_client.auth.signInWithPassword({email,password})
        console.log(data)
        if(data.user?.email==email){
            routes.push('/home')
        }
        else{
            setmessage('Incorrect E-mail or Password')
        }

    }
  return (
    <div style={{textAlign: "center",marginTop: "100px",fontFamily: "Arial, sans-serif",}}> 

    <h1  style={{fontSize: "2rem",marginBottom: "40px",color: "#333",}}>Sign In</h1>
        
    <input placeholder='E-mail' onChange={e=>setemail(e.target.value)} style={{display: "block",margin: "10px auto",padding: "10px",width: "280px",
        borderRadius: "5px",border: "1px solid #ccc",fontSize: "1rem",}}/>

    <input placeholder='Password' type='password' onChange={e=>setpassword(e.target.value)} style={{display: "block",margin: "10px auto",      padding:"10px",width: "280px",borderRadius: "5px",border: "1px solid #ccc",fontSize: "1rem"}}/>

    <button type='submit' onClick={set_signin} style={{marginTop: "20px",padding: "12px 30px",fontSize: "1rem",backgroundColor: "#4CAF50",color: "white",border: "none",borderRadius: "6px", cursor: "pointer",transition: "0.3s",}}>Submit</button>

    {message && <p style={{ marginTop: "20px", color: message.includes("Error") ? "red" : "green" }}>{message}</p>}
</div>
  )
}
