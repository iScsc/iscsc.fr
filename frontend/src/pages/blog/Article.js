const Article = ({ title, author, summary, body, createdAt }) => {
    return (
        <article>
            <h2>{title}</h2>
            {summary && <h3>{summary}</h3>}
            <small>{author} - {createdAt}</small>
            <p>{body}</p>
        </article>
    )
};

export default Article;
