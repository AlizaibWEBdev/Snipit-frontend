import "./header.css";
import { useContext, useState } from "react";
import AuthContext from "../../context/auth/AuthContext";
import { Link } from "react-router-dom";

interface Proptypes {
    username: string;
}

const Header = ({ username }: Proptypes) => {
    const data = useContext(AuthContext);
    const [showPopup, setShowPopup] = useState(false);

    function generateAvatar(fullName: string): string {
        const nameParts = fullName.trim().split(" ");
        return nameParts.length === 1
            ? nameParts[0].charAt(0).toUpperCase()
            : nameParts[0].charAt(0).toUpperCase() +
                  nameParts[nameParts.length - 1].charAt(0).toUpperCase();
    }

    const login = data.user !== null;

    const togglePopup = () => {
        setShowPopup(!showPopup);
    };

    const closePopup = () => {
        setShowPopup(false);
    };

    return (
        <header>
            <Link to={"/"}><div className="logo">&lt;Snippet/&gt;</div></Link>
            {login ? (
                <div className="profile">
                    <Link to={"/write"} className="write">
                        <i className="fa-solid fa-pen-to-square"></i> write
                    </Link>

                    <div className="img" onClick={togglePopup}>
                        {generateAvatar(username)}
                    </div>

                    {showPopup && (
                        <div className="popup" onMouseLeave={()=>{
                           
                                closePopup()
                                
                        }}>
                            <ul>
                                <li>
                                  <span>Dashboard</span> <i className="fa fa-user"></i>
                                </li>
                                <li onClick={() => {
                                    fetch("http://localhost:3000/api/auth/logout",{method:"POST",
                                        credentials:"include",

                                    }).then((res)=>{
                                        if (res.ok) {
                                            setTimeout(() => {
                                                
                                                data.SetUser(null);
                                                
                                            }, 1000);
                                        }
                                    })
                                }}>
                                    <span>Logout</span>
                                     <i className="fa fa-sign-out"></i></li>
                            </ul>
                        </div>
                    )}
                </div>
            ) : (
                <Link to="/login" className="sign-in-btn">Sign in</Link>
            )}
        </header>
    );
};

export default Header;