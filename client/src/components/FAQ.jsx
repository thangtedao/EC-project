import styled from "styled-components";

const Wrapper = styled.div`
  width: 100%;
  border-radius: 10px;
  border: 1px solid lightgray;
  padding: 1rem;

  .title {
    font-size: large;
    font-weight: 500;
    text-transform: uppercase;
    color: red;
  }
`;

const FAQ = () => {
  return (
    <Wrapper>
      <div className="title">Câu hỏi thường gặp</div>
      <div className="faq-list">Nothing</div>
    </Wrapper>
  );
};

export default FAQ;
