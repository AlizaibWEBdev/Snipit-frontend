import React, { useContext, useEffect, useState } from "react";
import Snippet from "../Snippet/Snippet";
import "./Coder.css";
import AuthContext from "../../context/auth/AuthContext";

interface User {
  profilePicture: string;
  name: string;
  bio: string;
  joinDate: string;
  totalSnippetsCreated: number;
  totalLikes: number;
  interests: string[];
}

interface Snippet {
  _id: string;
  title: string;
  code: string;
  description: string;
  tags: string[];
  createdAt: string;
  language:string,
  createdBy:string,
  likes:string[],



}

interface UserData {
  user: User;
  snippets: Snippet[];
}

const Coder: React.FC = () => {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);
  const userId = window.location.href.split("/").pop() || ""; // Get the user ID from the URL
  const localuser = useContext(AuthContext);

  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/users/${userId}`);
        if (!response.ok) {
          throw new Error("Failed to fetch user data");
        }
        const data: UserData = await response.json();
        setUserData(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [userId]);

  if (loading) {
    return <div className="loader">Loading...</div>;
  }

  if (!userData) {
    return <div className="error">Unable to fetch data. Please try again later.</div>;
  }
  function generateAvatar(fullName: string): string {
    const nameParts = fullName.trim().split(" ");
    return nameParts.length === 1
      ? nameParts[0].charAt(0).toUpperCase()
      : nameParts[0].charAt(0).toUpperCase() +
          nameParts[nameParts.length - 1].charAt(0).toUpperCase();
  }

  
  return (
   <>
   <div className="coder-profile">

    <div className="card">
      <div className="info">
        
      <p className="logo">&lt;Snippet/&gt;</p>
      </div>
      <div className="user-data">
      <div className="profile-img">
          {generateAvatar(userData.user.name)}
        </div>
        <h1>{userData.user.name}</h1>
        <p>{userData.user.bio || "I'm coder i Write Code"}</p>
        
      </div>
    
     
    </div>
      {userData.snippets.map((e)=>{
        const createdAt = new Date(e.createdAt).toISOString().split('T')[0];

        return <Snippet 
        title={e.title} 
        code={e.code} 
        description={e.description} 
        language={e.language} 
        tags={e.tags} 
        createdBy={userData.user.name} 
        userid={e.createdBy} 
        liked={localuser.user?.userId ? e.likes.includes(localuser.user?.userId) : false} 
        createdAt={createdAt}
        likes={e.likes.length} />
      })}
   </div>
   </>
  );
};

export default Coder;