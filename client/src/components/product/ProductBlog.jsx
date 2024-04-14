import React, { useState } from "react";

const ProductBlog = ({ productBlog }) => {
  const [showMoreBlog, setShowMoreBlog] = useState(false);
  const [styleBlog, setStyleBlog] = useState({
    height: "500px",
  });

  return (
    <section id="blog">
      {productBlog?.content && (
        <div className="blog-content" style={styleBlog}>
          <div dangerouslySetInnerHTML={{ __html: productBlog.content }} />

          {!showMoreBlog && (
            <div
              className="blog-showmore"
              onClick={() => {
                setStyleBlog({ height: "100%" });
                setShowMoreBlog(!showMoreBlog);
              }}
            >
              View More
            </div>
          )}
        </div>
      )}
    </section>
  );
};

export default ProductBlog;
