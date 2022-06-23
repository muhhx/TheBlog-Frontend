import styled from "styled-components";

export const Form = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 30px;
`;

export const Button = styled.button`
  background-color: #1473e6;
  height: 32px;
  border: none;
  border-radius: 100px;
  min-height: 36px;
  font-family: inherit;
  color: white;
  font-weight: 600;
  padding: 5px 20px;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  cursor: pointer;
  width: 150px;

  &:disabled {
    background-color: #f4f4f4;
    color: #bcbcbc;
    cursor: initial;
  }

  &:hover:enabled {
    background-color: #0d66d0;
  }

  @media only screen and (max-width: 535px) {
    width: 100%;
  }
`;

export const Error = styled.div`
  margin-top: 20px;
  padding: 5px 10px;
  color: #f4f4f4;
  background-color: #e34850;
  font-size: 12px;
  font-weight: 500;
  border-radius: 5px;
  display: flex;
  justify-content: center;
  text-align: center;
`;

export const Span = styled.span`
  color: #959595;
  font-size: 14px;
  font-weight: 400;
  line-height: 27px;
`;

export const NavLink = styled.span`
  color: #1473e6;
  text-decoration: none;
  font-weight: 400;
  font-size: 14px;
  cursor: pointer;
`;
