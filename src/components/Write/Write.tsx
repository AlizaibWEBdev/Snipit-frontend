import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate for redirection
import "./Write.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";

const Write: React.FC = () => {
    const [title, setTitle] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [titleHeight, setTitleHeight] = useState<number>(50); // Default height
    const [descriptionHeight, setDescriptionHeight] = useState<number>(50); // Default height for description
    const [textHeight, setTextHeight] = useState<number>(50); // Default height for text
    const [code, setCode] = useState<string>("");
    const navigate = useNavigate(); // Initialize navigate for redirection

    // Adjust height based on input content
    const adjustHeight = (e: React.FormEvent<HTMLTextAreaElement>, setHeight: React.Dispatch<React.SetStateAction<number>>) => {
        const textarea = e.target as HTMLTextAreaElement;
        if (textarea.value.length < 5) {
            setHeight(50);
        } else {
            setHeight(textarea.scrollHeight); // Set the height based on the scrollHeight
        }
    };

    const languageIcons: { [key: string]: string } = {
        javascript: "fa-brands fa-js",
        typescript: "fa-brands fa-js",
        python: "fa-brands fa-python",
        java: "fa-brands fa-java",
        c: "fa-solid fa-c",
        cpp: "fa-solid fa-cube",
        csharp: "fa-brands fa-microsoft",
        html: "fa-brands fa-html5",
        css: "fa-brands fa-css3-alt",
        php: "fa-brands fa-php",
        ruby: "fa-brands fa-gem",
        go: "fa-brands fa-google",
        rust: "fa-brands fa-r-project",
        kotlin: "fa-brands fa-java",
        swift: "fa-brands fa-apple",
        dart: "fa-solid fa-d",
        r: "fa-brands fa-r-project",
        shell: "fa-solid fa-terminal",
        sql: "fa-solid fa-database",
        scala: "fa-brands fa-scala",
        perl: "fa-solid fa-code",
        lua: "fa-solid fa-moon",
        matlab: "fa-solid fa-chart-line",
        vb: "fa-solid fa-code",
        json: "fa-solid fa-brackets-curly",
        yaml: "fa-solid fa-brackets-curly",
        xml: "fa-solid fa-file-code",
        markdown: "fa-solid fa-file-alt",
        powershell: "fa-solid fa-terminal",
        default: "fa-solid fa-code",
    };

    const languageColors: { [key: string]: string } = {
        javascript: "#f7df1e", // Yellow
        typescript: "#3178c6", // Blue
        python: "#3572A5", // Python Blue
        java: "#b07219", // Brown
        c: "#555555", // Gray
        cpp: "#00599C", // Blue
        csharp: "#9A4993", // Purple
        html: "#e34c26", // Orange
        css: "#264de4", // Blue
        php: "#8993be", // Purple
        ruby: "#701516", // Red
        go: "#00ADD8", // Turquoise
        rust: "#dea584", // Copper
        kotlin: "#7f52ff", // Violet
        swift: "#f05138", // Orange
        dart: "#00c4b3", // Greenish Blue
        r: "#198CE7", // Blue
        shell: "#89e051", // Light Green
        sql: "#0064a5", // Blue
        scala: "#DC322F", // Red
        perl: "#0298c3", // Blue
        lua: "#000080", // Navy Blue
        matlab: "#e37322", // Orange
        vb: "#2b91af", // Blue
        json: "#f0d8f0", // Light Purple
        yaml: "#cb171e", // Red
        xml: "#00688B", // Blue
        markdown: "#083fa1", // Blue
        powershell: "#012456", // Dark Blue
        default: "#555555", // Default Gray
    };

    const [languageSelected, setLanguageSelected] = useState("javascript");
    const [tags, setTags] = useState<string[]>([]);
    const [inputValue, setInputValue] = useState("");
    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if ((event.key === "Enter" || event.key === ",") && inputValue.trim() !== "") {
            event.preventDefault();
            if (tags.length < 8) {
                setTags((prevTags) => [...prevTags, inputValue.trim()]);
                setInputValue("");
            } else {
                alert("no more then 8 tags are allowed")
            }
        } else if (event.key === "Backspace" && inputValue.length === 0 && tags.length > 0) {
            setTags((prevTags) => prevTags.slice(0, -1));
        }
    };

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value);
    };
    const handlePublish = () => {
        let hasError = false;

        if (!title.trim()) {
            toast.error("Title is required.", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
            
            return
        } else if (title.length < 10) {
            toast.error("please enter valid title", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
            
            return
        }

        if (tags.length < 2) {
            toast.error("At least 2 tags are required.", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
            
            return
        }

        if (!description.trim()) {
            toast.error("Description is required.", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
            
            return
        }

        if (!code.trim()) {
            toast.error("Code is required.", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
            
            return
        } 
        

        if (!hasError) {
            const data = {
                "title": title,
                "code":`
                ${code}
                `,
                "language":languageSelected,
                "description": description,
                "tags": tags,
                "draft": false,
              }
              
            fetch("http://localhost:3000/api/snippets/add",{
                method:"POST",
                headers: { "Content-Type": "application/json" },
                credentials:"include",
                body:JSON.stringify(data)
            }).then((responce)=>{
                if (responce.status == 401) {
                    navigate("/login");
                }
                if (responce.ok) {
                    
                    toast.success("Snippet published successfully!",{
                     theme: "dark"
                     });
                   setTimeout(() => {
                     navigate("/");
                   }, 1500);
                }else{
                    toast.error("somehitng went wrong", {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "dark",
                    });
                }
            }).catch(err=>{
                toast.error(`somehitng went wrong ${err}`, {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                });
            })
            // Add publishing logic here (e.g., send data to API)
        }
    };
    return (
        <>
            <ToastContainer />
            <div className="form">
                <div className="header">
                <Link to={"/"}><div className="logo">&lt;Snippet/&gt;</div></Link>
                    <div className="close">
                        <button onClick={() => navigate("/")}> {/* Redirect to home on click */}
                            <i className="fa fa-close"></i>
                        </button>
                    </div>
                </div>

                <div className="canvas">
                    <textarea
                        className="title"
                        value={title}
                        onInput={(e) => {
                            setTitle(e.currentTarget.value);
                            adjustHeight(e, setTitleHeight);
                        }}
                        style={{ height: `${titleHeight}px` }} // Apply dynamic height
                        autoFocus
                        placeholder="New snippet title here ..."
                    ></textarea>
                    <div className="tags-row">
                        <div className="tags">
                            {tags.map((tag, index) => (
                                tag.includes("#")
                                    ? <span key={index} className="tag">{tag}</span>
                                    : <span key={index} className="tag">#{tag}</span>
                            ))}
                        </div>
                        <input
                            type="text"
                            placeholder="enter tags"
                            value={inputValue}
                            onChange={handleInputChange}
                            onKeyDown={handleKeyDown}
                        />
                    </div>
                    <textarea
                        value={description}
                        className="text"
                        placeholder="This code can print hello world"
                        style={{ height: `${textHeight}px` }}
                        onInput={(e) => adjustHeight(e, setTextHeight)}
                        onChange={(e) => setDescription(e.target.value)}
                    ></textarea>

                    <div className="code">
                        <div className="header-code">
                            <select
                                onChange={(e) => {
                                    setLanguageSelected(Object.keys(languageIcons)[e.target.selectedIndex]);
                                }}
                            >
                                {Object.keys(languageIcons).map((key) => (
                                    <option value={key} key={key}>
                                        {key}
                                    </option>
                                ))}
                            </select>
                            <div className="lang">
                                <i
                                    style={{ color: languageColors[languageSelected] }}
                                    className={languageIcons[languageSelected]}
                                ></i>
                            </div>
                        </div>
                        <textarea
                            className="description"
                            value={code}
                            onInput={(e) => {
                                setCode(e.currentTarget.value);
                                adjustHeight(e, setDescriptionHeight);
                            }}
                            style={{ height: `${descriptionHeight}px`, color: languageColors[languageSelected] }}
                        ></textarea>
                    </div>


                </div>
                <div className="bottom">
                    <button className="publish" onClick={handlePublish}>Publish</button>
                    <button className="darft">Draft</button>

                </div>

            </div>
        </>
    );
};

export default Write;
