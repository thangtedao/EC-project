
import styled from "styled-components";

const Wrapper = styled.div`
  width: 50vw;
  /* height: 100vh; */
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;

  #blog{
    width: 100%;
    margin-top: 1rem;
    padding:20px;
    }
    .blog{
        width: 100%;
    }
    .blog-header{
        display: flex;
        width: 100%;
        margin:0 20px 20px 0;
    }
    .blog-header-right{
        display: flex;
        flex-direction: column;
       justify-content: space-between;
    }
    .blog-image{
        height: 135px;
        display: grid;
        place-items: center;
        margin-right: 20px;
        img {
            border-radius: 10px;
            height: inherit;
        }
    }
    .blog-title{
        font-size: 2rem;
        font-weight: bold;
        color: #444;
        margin-bottom: 10px;
    }
    .blog-lastupdated{
  color: rgb(100, 97, 97);
        
    }
    .blog-content{
        /* position: relative; */
        height: 100%;
        overflow:hidden;
    }
    .blog-content p{
        text-align: justify;
        font-size: 15px;
        line-height: 1.5;

        font-weight: 500;
        color: #444;
        margin-bottom: 10px;
    }
    .blog-content h2{
        font-weight: 500;
        font-size: 1.4rem;
    }
    .blog-content h3{
        text-align: left;
        font-size: 1.2rem;
        font-weight: 700;
        margin-top: .5rem;
    }
    .blog-content strong{
        font-weight: 700;
    }
    .blog-content img{
        width: 100%;
    }
    .blog-showmore{
        padding-top: 50px;

        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;

        color: #d70018;
        cursor: pointer;
        background: linear-gradient(to bottom,rgba(255,255,255,0) 0%,rgba(255,255,255,0.91) 50%,#fff 55%);
    }


    .comment-status{
        flex-grow: 1;
        text-align: end;
    }
    .comment-status-pin span{
        font-size: 25px;
        color: #333333;
        background: none;
        cursor: pointer;
    }
`

export default Wrapper;




