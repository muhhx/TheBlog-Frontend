import styled from "styled-components";

export const Section = styled.section`
  width: 100%;
  height: 100vh;
  background-color: black;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Login = styled.form`
  background-color: white;
  max-width: 500px;
  width: 100%;
  padding: 50px;
  display: flex;
  flex-direction: column;
  border-radius: 5px;
  gap: 100px;

  @media only screen and (max-width: 500px) {
    width: 100%;
    height: 100%;
    border-radius: 0;
  }
`;

export const Title = styled.h1`
  font-size: 32px;
  color: #272727;
  margin-bottom: 0;
`;

export const FieldsContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const Span = styled.p`
  color: #505050;
`;

export const InputContainer = styled.div`
  width: 100%;
  padding: 5px 0px;
  border-bottom: solid 1px #eaeaea;
`;

export const Input = styled.input`
  width: 100%;
  outline: none;
  border: none;
  background-color: transparent;
  font-family: "Poppins", sans-serif;
  color: #272727;
`;

export const Button = styled.button`
  font-family: "Poppins", sans-serif;
  max-width: 150px;
  font-weight: 500;
  color: white;
  background-color: #1473e6;
  border: none;
  border-radius: 50px;
  padding: 7px 20px;
  flex-wrap: nowrap;
`;

export const HeaderContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 10px;
`;

export const OptionsContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0px;
`;
