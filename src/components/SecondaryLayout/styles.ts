import styled from "styled-components";

interface IStyledProps {
  backgroundImage: string;
}

export const Section = styled.section`
  width: 100%;
  background-image: url(${(props: IStyledProps) => props.backgroundImage});
  background-position: center;
  background-size: cover;
`;

export const SectionBackground = styled.div`
  width: 100%;
  min-height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 30px 0px;

  @media only screen and (max-width: 530px) {
    padding: 0px;
  }
`;

export const FormContainer = styled.div`
  width: 100%;
  max-width: 530px;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 5px;
  padding: 40px 56px;

  @media only screen and (max-width: 530px) {
    border-radius: 0px;
    min-height: 100vh;
    align-items: flex-start;
  }
`;
