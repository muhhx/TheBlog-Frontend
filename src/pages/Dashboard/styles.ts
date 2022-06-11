import styled from "styled-components";

export const PostsContainer = styled.div`
  width: 100%;
  gap: 15px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  justify-content: center;
  gap: 15px;
  margin: 100px 0px;

  @media only screen and (max-width: 1280px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media only screen and (max-width: 740px) {
    grid-template-columns: repeat(1, 1fr);
  }
`;
