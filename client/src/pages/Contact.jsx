import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  width: 1100px;
  display: flex;
  justify-content: center;
`;

const Contact = () => {
  return (
    <Wrapper>
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3916.8009638322715!2d106.84874842302786!3d10.97839086814657!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3174dc47f6659bd5%3A0xa2c44292a700e0c3!2zQ8OieSBYxINuZyAyNg!5e0!3m2!1svi!2s!4v1698992758204!5m2!1svi!2s"
        width="800"
        height="800"
        className="map"
        allowFullScreen=""
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      ></iframe>
    </Wrapper>
  );
};

export default Contact;
