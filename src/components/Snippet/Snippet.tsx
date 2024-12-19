import "./snippet.css";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
interface SnippetPropTypes {
  title: string;
  code: string;
  language: string;
  description: string;
  tags: string[];
  createdBy: string;
  likes: number;
  createdAt: string;
  liked: boolean;
  userid:string
}

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
}
const Snippet = ({
  title,
  code,
  language,
  description,
  tags,
  createdBy,
  likes,
  createdAt,
  liked,
  userid
}: SnippetPropTypes) => {
  function generateAvatar(fullName: string): string {
    const nameParts = fullName.trim().split(" ");
    return nameParts.length === 1
      ? nameParts[0].charAt(0).toUpperCase()
      : nameParts[0].charAt(0).toUpperCase() +
          nameParts[nameParts.length - 1].charAt(0).toUpperCase();
  }

  const [isExpanded, setIsExpanded] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  function toggleExpand() {
    setIsExpanded((prev) => !prev);
  }

  useEffect(() => {
    if (isExpanded) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isExpanded]);

  const handleCopy = () => {
    navigator.clipboard.writeText(code).then(() => {
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    });
  };
  const iconStyle = {
    color: languageColors[language.toLowerCase()] || languageColors.default,

  };
  return (
    <div className={`snippet-card ${isExpanded}`}>
      <div className="snippet-header">
        <div className="profile-info">
          <Link to={`coder/${userid}`}><div className="avatar">{generateAvatar(createdBy)}</div></Link>
          <div className="info-text">
            <span className="username">{createdBy}</span>
            <span className="date">{createdAt}</span>
          </div>
        </div>
        <div className="language-badge">
          <i
            className={`fa-solid ${isExpanded ? "fa-compress" : "fa-expand"} expand-screen-view`}
            onClick={toggleExpand}
            style={{ marginLeft: "10px" }}
          ></i>
        </div>
      </div>

      <h2 className="snippet-title">{title}</h2>
      {isExpanded ? (
        <p className="snippet-description">{description}</p>
      ) : (
        <p className="snippet-description">{description.slice(0, 120)}...</p>
      )}

      <div className="code--">
        <div className="row" style={{padding:"10px"}}>
        <i
            className={languageIcons[language.toLowerCase()] || languageIcons.default}
            style={iconStyle}
          ></i>
          <button onClick={handleCopy}>
            <i className={`fa ${isCopied ? "fa-check" : "fa-copy"}`}></i> {isCopied ? "Copied" : "Copy"}
          </button>
        </div>

        <pre className="snippet-code">
          <code className={`language-${language.toLowerCase()}`} style={iconStyle}>
            {isExpanded ? code : `${code.slice(0, 100)}${code.length > 100 ? "..." : ""}`}
          </code>
        </pre>
      </div>

      <div className="snippet-footer">
        <div className="likes">
          <i
            className={
              liked ? "fa-solid fa-heart liked" : "fa-regular fa-heart unliked"
            }
          ></i>
          <span>{likes}</span>
        </div>
        <div className="tags">
          {tags.map((tag) => (
            <span key={tag} className="tag">
              #{tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Snippet;
