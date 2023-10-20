import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Header } from "../components/partials/Header";
import { Footer } from "../components/partials/Footer";
import { API } from "../context/API";
export const ArticleDetails = () => {
  const [articles, setArticles] = useState("");
  const { articleId } = useParams();
  useEffect(() => {
    API.getDetailOneArticles(articleId).then((data) => {
      setArticles(data);
    });
  }, [articleId]);
  return (
    <>  
      <Header />
      {articles ? (
        <div className="w-full min-h-screen">
          <div className="w-5/6 px-6 py-16 mx-auto space-y-12">
            <article className="space-y-8 text-center">
              <div className="space-y-6">
                <h1 className="text-4xl font-bold md:tracking-wider md:text-5xl">
                  {articles.articleTitle}
                </h1>
                <div className="flex flex-col items-start justify-between w-full md:flex-row md:items-center font-semibold">
                  <div className="flex items-center md:space-x-2">
                    <img
                      src={`http://localhost:5000/images/article/${articles.articlePicture}`}
                      alt="author picture"
                      className="w-4 h-4 border rounded-full"
                    />
                    <p className="text-sm">
                      {articles.articleAuthor}
                      <span className="text-xl mx-1">•</span>
                      <span>
                        {new Date(articles.createdAt).toLocaleDateString(
                          "en-US",
                          {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                          }
                        )}
                      </span>
                    </p>
                  </div>
                  <p className="flex-shrink-0 mt-3 text-sm md:mt-0 tracking-wider uppercase items-center gap-2">
                    <Link
                      to={`/articles/type/${articles.articleType}`}
                      className="hover:underline"
                    >
                      {articles.articleType}
                    </Link>
                    <span className="text-lg"> • </span>
                    <Link
                      to={`/articles/topic/${articles.articleTopic}`}
                      className="hover:underline"
                    >
                      {articles.articleTopic}
                    </Link>
                  </p>
                </div>
                <img
                  src={`http://localhost:5000/images/article/${articles.articlePicture}`}
                  className="w-full object-cover lg:rounded h-[28em]"
                />
              </div>
              <div className="text-justify font-medium text-lg">
                <p>{articles.articleContent}</p>
              </div>
            </article>
            <section className="py-6 sm:py-12">
              <div className="container mx-auto space-y-8">
                <div className="space-y-2">
                  <h2 className="text-3xl font-bold">Related post</h2>
                  <p className="font-serif text-sm dark:text-gray-400">
                    Qualisque erroribus usu at, duo te agam soluta mucius.
                  </p>
                </div>
                <div className="grid grid-cols-1 gap-x-4 gap-y-8 md:grid-cols-2 lg:grid-cols-4">
                  <article className="flex flex-col bg-white shadow-xl border-2">
                    <Link
                      to={`/article-details`}
                      aria-label="Te nulla oportere reprimique his dolorum"
                    >
                      <img
                        alt=""
                        className="object-cover w-full h-52 dark:bg-gray-500"
                        src="https://source.unsplash.com/200x200/?fashion?1"
                      />
                    </Link>
                    <div className="flex flex-col flex-1 p-4">
                      <Link
                        to={`/article-all-genre`}
                        className="text-xs tracki uppercase hover:underline dark:text-violet-400"
                      >
                        Convenire
                      </Link>
                      <Link to={`/article-details`}>
                        <h3 className="flex-1 py-2 text-lg font-semibold leadi">
                          Te nulla oportere reprimique his dolorum
                        </h3>
                      </Link>
                      <div className="flex flex-wrap items-center justify-between pt-3 space-x-2 text-xs font-medium">
                        <span className="flex items-center">
                          <img
                            src="https://source.unsplash.com/75x75/?portrait"
                            alt=""
                            className="w-4 h-4 border rounded-full mr-2"
                          />
                          <p className="text-sm">Leroy Jenkins</p>
                        </span>
                        <span>June 1, 2020</span>
                      </div>
                    </div>
                  </article>
                </div>
              </div>
            </section>
          </div>
        </div>
      ) : (
        <div>loading...</div>
      )}
      <Footer />
    </>
  );
};
