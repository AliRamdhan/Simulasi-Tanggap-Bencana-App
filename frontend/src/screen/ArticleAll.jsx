import React, { useEffect, useState } from "react";
import { Header } from "../components/partials/Header";
import { Footer } from "../components/partials/Footer";
import { API } from "../context/API";
import { Link } from "react-router-dom";
import Default from '../images/user.png'
export const ArticleAll = () => {
  const [articles, setArticles] = useState([]);
  useEffect(() => {
    API.getArticles().then((data) => {
      setArticles(data);
    });
  }, []);
  return (
    <div>
      <Header />
      <div className="w-full min-h-screen px-8 py-4">
        <div className="grid grid-cols-1 gap-x-4 gap-y-8 md:grid-cols-2 lg:grid-cols-4">
          {articles
            .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
            .map((article, index) => (
              <article
                className="flex flex-col bg-white shadow-xl border-2"
                key={index}
              >
                <Link to={`/articles/${article._id}`}>
                  <img
                    alt=""
                    className="object-cover w-full h-52 dark:bg-gray-500"
                    src={`http://localhost:5000/images/article/${article.articlePicture}`}
                  />
                </Link>
                <div className="flex flex-col flex-1 p-4">
                  {article.articleType && article.articleTopic && (
                    <div
                      to={`/article-all-genre`}
                      className="text-xs tracking-wider uppercase dark:text-violet-400 flex items-center gap-2"
                    >
                      <Link
                        to={`/articles/type/${article.articleType}`}
                        className="hover:underline"
                      >
                        {article.articleType}
                      </Link>
                      <span className="text-lg"> • </span>
                      <Link
                        to={`/articles/topic/${article.articleTopic}`}
                        className="hover:underline"
                      >
                        {article.articleTopic}
                      </Link>
                    </div>
                  )}
                  <h3 className="flex-1 py-2 text-xl font-semibold leading-normal">
                    <Link to={`/articles/${article._id}`} key={index}>
                      {article.articleTitle}
                    </Link>
                  </h3>
                  <div className="flex flex-wrap items-center justify-between pt-3 space-x-2 text-xs font-medium">
                    <span className="flex items-center">
                      <img
                        src={Default}
                        alt="profile tanggap lab"
                        className="w-4 h-4 border rounded-full mr-2"
                      />
                      <p className="text-sm">{article.articleAuthor}</p>
                    </span>
                    <span>
                      {new Date(article.createdAt).toLocaleDateString("id-ID", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </span>
                  </div>
                </div>
              </article>
            ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};
