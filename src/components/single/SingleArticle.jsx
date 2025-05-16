import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Sidebar from "../sidebar/Sidebar";
import Navbar from "../navbar/Navbar";
import "./SingleArticle.css"; // Import external CSS here

function SingleArticle() {
  const { encodedUrl } = useParams();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchArticle() {
      try {
        const decodedUrl = decodeURIComponent(encodedUrl);
        const response = await axios.get(`https://webscrapper.inside-ai.xyz/api/article/${decodedUrl}/`);
        setArticle(response.data);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch article details.");
      } finally {
        setLoading(false);
      }
    }

    fetchArticle();
  }, [encodedUrl]);

  if (loading) return <div className="center-text mt-10">Loading...</div>;
  if (error) return <div className="center-text error-text mt-10">{error}</div>;

  return (
    <div className="page-container">
      <Navbar />

      <div className="content-container">
        <div className="sidebar-container">
          <Sidebar />
        </div>

        <div className="article-container">
          {article && (
            <div className="article-card">
              <h1 className="article-title">{article.title}</h1>

              <div className="author-info">
                {article.author_img && (
                  <img
                    src={article.author_img}
                    alt={article.author}
                    className="author-img"
                  />
                )}
                <div>
                  <p className="author-name">{article.author}</p>
                  <p className="publish-date">{article.published}</p>
                </div>
              </div>

              {article.article_image && (
                <div className="article-image-container">
                  <img
                    src={article.article_image}
                    alt="Article"
                    className="article-image"
                  />
                </div>
              )}

              <div className="article-body">
                {article.body}
              </div>

              {article.source_name && (
                <p className="article-source">
                  Source: {article.source_name}
                </p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default SingleArticle;
