import { useEffect, useState, useCallback } from "react";

import NewsItem from "./NewsItem";
import Spinner from "./spinner";
import PropTypes from 'prop-types';
import InfiniteScroll from "react-infinite-scroll-component";

const News1 = (props) => {
    const [articles, setArticles] = useState([])
    const [loading, setLoading] = useState(true)
    const [page, setPage] = useState(1)
    const [totalResults, setTotalResults] = useState(0)

    const capitalizeFirstLetter = (string) => {
        return string.charAt().toUpperCase() + string.slice(1)
    }


    const updateNews = useCallback(async () => {
        props.setProgress(10)
        const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;
        setLoading(true)
        let data = await fetch(url);
        props.setProgress(30);
        let parsedData = await data.json();
        props.setProgress(70);
        setArticles(parsedData.articles)
        setTotalResults(parsedData.totalResults)
        setLoading(false)
        props.setProgress(100);
    }, [props, page]);

    // useEffect(() => {
    //     document.title = `${capitalizeFirstLetter(props.category)} - Quick Pulse`;
    //     updateNews();
    // }, []);
    useEffect(() => {
        document.title = `${capitalizeFirstLetter(props.category)} - Quick Pulse`;
        updateNews();
    }, [props.category, updateNews]);


    const fetchMoreData = async () => {
        const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page + 1}&pageSize=${props.pageSize}`;
        setPage(page + 1)
        let data = await fetch(url);
        let parsedData = await data.json();
        setArticles(articles.concat(parsedData.articles))
        setTotalResults(parsedData.totalResults)
    };

    return (
        <>
            <h1 className="text-center" style={{ margin: "35px 0px", marginTop: "90px" }}>Quick Pulse ${capitalizeFirstLetter(props.category)} headlines</h1>
            {loading && <Spinner />}
            <InfiniteScroll
                dataLength={articles?.length || 0}
                next={fetchMoreData}
                hasMore={articles?.length !== totalResults}
                loader={<Spinner />}
            >
                <div className="container">
                    <div className="row">
                        {articles && articles.length > 0 ? (
                            articles.map((element) => (
                                <div className="col-md-4" key={element.url}>
                                    <NewsItem
                                        title={element.title || ""}
                                        description={element.description || ""}
                                        imageUrl={element.urlToImage}
                                        newsUrl={element.url}
                                        author={element.author}
                                        date={element.publishedAt}
                                        source={element.source.name}
                                    />
                                </div>
                            ))
                        ) : (
                            <p>No articles available.</p> // Optional: display message if no articles are found
                        )}
                    </div>

                </div>

            </InfiniteScroll>
        </>
    )
}

// News1.defaultProps = {
//     country: "us",
//     page: 8,
//     category: "general"
// }
News1.propTypes = {
    country: PropTypes.string,
    page: PropTypes.number,
    category: PropTypes.string
}
export default News1 