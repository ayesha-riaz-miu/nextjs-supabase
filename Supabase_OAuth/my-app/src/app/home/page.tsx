"use client"

import React, { useEffect, useState } from 'react'

type details={
  id: number
  title: string
  url?: string
  by: string
  time: number

}

export default function page() {
  const [id,setid] = useState<number[]>([])
  const [storydetials,setstorydetials] = useState<details[]>([])
  const [infinitescroll,setinfinitescroll] = useState<number>(10)

  useEffect(()=>{
    const fetch_data = async()=>
    {
      const response = await fetch("https://hacker-news.firebaseio.com/v0/newstories.json")
      
       const data:number[] = await response.json()
       setid(data)

       const first_tenid = data.slice(0,100)
       console.log(first_tenid)

       const storyDetails: details[] = await Promise.all(
        first_tenid.map(async (id) => {
          const res = await fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json`)
          const story: details = await res.json()
          return story
        })
      )

        const get_aistories = storyDetails.filter((item)=>item.title.toLowerCase().includes('ai'))
          setstorydetials(get_aistories)
    }
   
    fetch_data()

  },[])

  useEffect(()=>{
    const handle_scrole=()=>{
      if(window.innerHeight + window.scrollY >= document.body.offsetHeight-200){
        setinfinitescroll(old=>old+10)
      }
    }
    window.addEventListener('scroll',handle_scrole)
    return()=>window.removeEventListener('scroll',handle_scrole)

   },[])
  return (
    <div style={{
      textAlign: "center",
      marginTop: "50px",
      fontFamily: "Arial, sans-serif",
      padding: "0 20px"
    }}>
      <h1 style={{
        fontSize: "2.5rem",
        letterSpacing: "1px",
        marginBottom: "40px"
      }}>
        Recent Stories In AI
      </h1>
  
      <div style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "20px"
      }}>
        {storydetials.slice(0,infinitescroll).map((story) => (
          <div key={story.id} style={{
            width: "100%",
            maxWidth: "600px",
            padding: "20px",
            border: "1px solid #ddd",
            borderRadius: "10px",
            boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
            backgroundColor: "#f9f9f9",
            textAlign: "left"
          }}>
            <h2 style={{ fontSize: "1.2rem", marginBottom: "8px" }}>
              <a href={story.url} target="_blank" style={{ textDecoration: "none", color: "#1a0dab" }}>
                {story.title}
              </a>
            </h2>
            <p style={{ margin: "4px 0", color: "#555" }}>
              By: {story.by}
            </p>
            <p style={{ margin: "4px 0", color: "#888", fontSize: "0.9rem" }}>
              ID: {story.id} | Time: {new Date(story.time * 1000).toLocaleString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}
