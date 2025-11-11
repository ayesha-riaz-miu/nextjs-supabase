"use client";


import React, { useState } from 'react'
import { supabase_client } from '../api/supabaseClinet';
import { useRouter } from 'next/navigation';

export default function page() {
    const[email,setemail] = useState("")
    const[password,setpassword] = useState("")
    const[message,setmessage] = useState("")

    const route = useRouter()

    const set_signUp = async()=>{
        const{data,error} = await supabase_client.auth.signUp({email,password})
        console.log(data)

        if(data.user?.role==''){
            setmessage('This email is already Registered')
        }
        else{
            if(error){
                setmessage(`Error:${error}`)
            }
            else{

                route.push('/signin')

            }
            
        }
        


    }
  return (
    <div style={{textAlign: "center",marginTop: "100px",fontFamily: "Arial, sans-serif",}}> 

        <h1  style={{fontSize: "2rem",marginBottom: "40px",color: "#333",}}>Sign Up</h1>
            
        <input placeholder='E-mail' onChange={e=>setemail(e.target.value)} style={{display: "block",margin: "10px auto",padding: "10px",width: "280px",
            borderRadius: "5px",border: "1px solid #ccc",fontSize: "1rem",}}/>

        <input placeholder='Password' type='password' onChange={e=>setpassword(e.target.value)} style={{display: "block",margin: "10px auto",      padding:"10px",width: "280px",borderRadius: "5px",border: "1px solid #ccc",fontSize: "1rem"}}/>

        <button type='submit' onClick={set_signUp} style={{marginTop: "20px",padding: "12px 30px",fontSize: "1rem",backgroundColor: "#4CAF50",color: "white",border: "none",borderRadius: "6px", cursor: "pointer",transition: "0.3s",}}>Submit</button>

        {message && <p style={{ marginTop: "20px", color: message.includes("Error") ? "red" : "green" }}>{message}</p>}
    </div>
  )
}
