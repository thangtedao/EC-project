import styled from "styled-components";

const Wrapper = styled.div`
  width: 60vw;
  height: 25vh;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  background-color: var(--background-secondary-color);
  border: 0.5px solid lightgrey;
  border-radius: 10px;
  box-shadow: 0 1px 2px 0 rgba(60, 64, 67, 0.1),
    0 2px 6px 2px rgba(60, 64, 67, 0.15);
  padding: 0.5rem;
  margin: 15px;

  .blog-card-container {
    width: 100%;
    height: 100%;
    background-color: var(--background-secondary-color);
    display: flex;
    padding-top: 1.2rem;
    overflow: hidden;
    gap: 1rem;
  }
  .blog-card-header-right{
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  .blog-card-image {
    height: 135px;
    display: grid;
    place-items: center;
    img {
      border-radius: 10px;
      height: inherit;
    }
  }
  .blog-card-title {
    font-size: 1.5rem;
    font-weight: bold;
    color: #444;
    margin: 10px;
  }
  .blog-card-lastupdated{
    color: rgb(100, 97, 97);
        
  }
`;

export default Wrapper;
