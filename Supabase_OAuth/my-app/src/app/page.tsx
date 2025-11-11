"use client";  

import { useRouter } from "next/navigation";

export default function Home() {
  const route = useRouter();

  const move_signup = () => {
    route.push("/signup");
  };

  const move_signin = () => {
    route.push("/signin");
  };

  return (
    <div
      style={{
        textAlign: "center",
        marginTop: "100px",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <h1 style={{ fontSize: "2rem", marginBottom: "50px" }}>
        Welcome To My First Next.js App
      </h1>

      <div>
        <button
          onClick={move_signup} style={{marginRight: "20px",padding: "15px 30px",fontSize: "1rem",backgroundColor: "#4CAF50",color: "white",
            border: "none",borderRadius: "8px",cursor: "pointer",transition: "all 0.3s ease"}}>
          Sign Up
        </button>

        <button onClick={move_signin} style={{padding: "15px 30px",fontSize: "1rem",backgroundColor: "#008CBA",color: "white",border: "none",borderRadius: "8px",
            cursor: "pointer",transition: "all 0.3s ease",}}>
          Sign In
        </button>
      </div>
    </div>
  );
}
