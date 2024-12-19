import React, { useState, useEffect } from "react";
import Snippet from "../Snippet/Snippet";
import "./snippets.css";

// Define types for snippets, tags, and user
interface CreatedByType {
  _id: string;
  name: string;
}

interface SnippetType {
  _id: string;
  title: string;
  code: string;
  language: string;
  description: string;
  tags: string[];
  createdBy: CreatedByType;
  likes: string[];
  createdAt: string;
  updatedAt: string;
}

interface SnippetsResponse {
  snippets: SnippetType[];
  totalSnippets: number;
  currentPage: number;
  totalPages: number;
}

const Snippets: React.FC = () => {
  const [snippetsData, setSnippetsData] = useState<SnippetType[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTag, setSelectedTag] = useState("");
  const [hashtags, setHashtags] = useState<string[]>([]);

  // Fetch data from the API
  useEffect(() => {
    const fetchSnippets = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/snippets");
        const data: SnippetsResponse = await response.json();
        setSnippetsData(data.snippets);

        // Extract unique tags
        const tagsSet = new Set<string>();
        data.snippets.forEach((snippet) =>
          snippet.tags.forEach((tag) => tagsSet.add(tag))
        );
        setHashtags([...tagsSet]);
      } catch (error) {
        console.error("Error fetching snippets:", error);
      }
    };

    fetchSnippets();
  }, []);

  // Filter snippets based on search query and selected tag
  const filteredSnippets = snippetsData.filter((snippet) => {
    return (
      snippet.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
      (selectedTag === "" || snippet.tags.includes(selectedTag))
    );
  });

  return (
    <>
      {/* Search Box */}
      <div className="top-header--">
        <div className="search-container">
          <input
            type="text"
            placeholder="Search for snippets..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="modern-search"
          />
        </div>

        <div className="hashtags-container">
          {hashtags.map((tag,index) => (
            <span
              key={index}
              className={`hashtag ${selectedTag === tag ? "active" : ""}`}
              onClick={() => setSelectedTag(selectedTag === tag ? "" : tag)}
            >
              #{tag}
            </span>
          ))}
        </div>
      </div>

      {/* Render Filtered Snippets */}
      <div className="cards">
        {filteredSnippets.length > 0 ? (
          filteredSnippets.map((snippet) => (
            <Snippet
              key={snippet._id}
              userid={snippet.createdBy._id}
              title={snippet.title}
              description={snippet.description}
              createdAt={new Date(snippet.createdAt).toLocaleDateString()}
              createdBy={snippet.createdBy.name} // Updated to use createdBy.name
              code={snippet.code}
              language={snippet.language}
              liked={snippet.likes.length > 0}
              tags={snippet.tags}
              likes={snippet.likes.length}
            />
          ))
        ) : (
          <p>No snippets found!</p>
        )}
      </div>
    </>
  );
};

export default Snippets;
