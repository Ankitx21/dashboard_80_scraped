import React, { useEffect, useState, useRef, useCallback } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import '../table/table.scss';
import './articleCards.scss'; 

const ArticleDetails = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [hasMore, setHasMore] = useState(true);
  const [pageNumber, setPageNumber] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  
  const observer = useRef();
  const lastArticleElementRef = useCallback(node => {
    if (loading) return;
    if (observer.current) observer.current.disconnect();
    
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore) {
        // If the last element is visible and there are more articles
        setPageNumber(prevPageNumber => prevPageNumber + 1);
      }
    }, { threshold: 1.0 });
    
    if (node) observer.current.observe(node);
  }, [loading, hasMore]);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const response = await axios.get(`https://webscrapper.inside-ai.xyz/api/articles-list/?page=${pageNumber}&page_size=20`);
      const data = response.data;
      
      setTotalCount(data.count);
      
      // Check if there are more items to load
      setHasMore(data.next !== null);

      const formattedData = data.results.map((item, index) => ({
        id: (pageNumber - 1) * 20 + index + 1,
        url: item.url || "N/A",
        sourceName: item.source_name || "N/A",
        articleImage: item.article_image,
        category: item.category || "N/A",
        title: item.title || "N/A",
        publishedDate: item.published_date || "N/A",
        author: item.author || "N/A",
      }));

      // Append new articles to existing ones rather than replacing
      setArticles(prev => [...prev, ...formattedData]);
    } catch (error) {
      console.error("Error fetching articles:", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }, [pageNumber]);

  // Initial load and when page number changes
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Format the published date for display
  const formatDate = (dateString) => {
    if (!dateString || dateString === "N/A") return "N/A";
    
    try {
      const date = new Date(dateString);
      return new Intl.DateTimeFormat('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      }).format(date);
    } catch (e) {
      return dateString;
    }
  };

  // Truncate title to show only 5-6 words
  const truncateTitle = (title) => {
    if (!title) return "N/A";
    const words = title.split(' ');
    if (words.length <= 6) return title;
    return words.slice(0, 6).join(' ') + '...';
  };

  // Calculate relative time (e.g., "6 mins ago")
  const getRelativeTime = (dateString) => {
    if (!dateString || dateString === "N/A") return "N/A";
    
    try {
      const date = new Date(dateString);
      const now = new Date();
      const diffMs = now - date;
      
      const diffMins = Math.floor(diffMs / (1000 * 60));
      if (diffMins < 60) return `${diffMins} mins ago`;
      
      const diffHours = Math.floor(diffMins / 60);
      if (diffHours < 24) return `${diffHours} hours ago`;
      
      const diffDays = Math.floor(diffHours / 24);
      if (diffDays < 30) return `${diffDays} days ago`;
      
      const diffMonths = Math.floor(diffDays / 30);
      if (diffMonths < 12) return `${diffMonths} months ago`;
      
      return `${Math.floor(diffMonths / 12)} years ago`;
    } catch (e) {
      return dateString;
    }
  };

  return (
    <div className="list">
      <Sidebar />
      <div className="listContainer">
        <Navbar />
        <div style={{ width: "100%", padding: "20px" }}>
          <h2>Article Details</h2>
          <p>Showing {articles.length} of {totalCount} articles</p>
          
          <div className="articles-container">
            {articles.map((article, index) => {
              // Add ref only to the last article element
              const isLastElement = articles.length === index + 1;
              return (
                <div 
                  className="article-column" 
                  key={article.id}
                  ref={isLastElement ? lastArticleElementRef : null}
                >
                  <div className="post-module">
                    <div className="thumbnail">
                      {article.articleImage ? (
                        <img src={article.articleImage} alt={article.title} />
                      ) : (
                        <div className="no-image">No Image Available</div>
                      )}
                    </div>
                    <div className="post-content">
                      <div className="category">{article.category}</div>
                      <Link to={`/singlearticle/${encodeURIComponent(article.url)}`}>
                        <h1 className="title" title={article.title}>
                          {truncateTitle(article.title)}
                        </h1>
                      </Link>
                      <h2 className="sub_title">{article.sourceName}</h2>
                      <p className="description">
                        By {article.author} • {formatDate(article.publishedDate)}
                      </p>
                      <div className="post-meta">
                        <span className="timestamp">
                          <i className="fa fa-clock-o"></i> {getRelativeTime(article.publishedDate)}
                        </span>
                        <span className="source">
                          Source: {article.sourceName}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          
          {loading && (
            <div className="loading-indicator">
              <p>Loading more articles...</p>
            </div>
          )}
          
          {error && (
            <div className="error-message">
              <p>Error: {error}</p>
            </div>
          )}
          
          {!hasMore && articles.length > 0 && (
            <div className="end-message">
              <p>You've reached the end of the articles!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ArticleDetails;