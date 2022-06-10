import styled from "styled-components";
import { Link } from "react-router-dom";

interface IStyledProps {
  backgroundUrl?: string;
}

export const Form = styled.form`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 50px;
  align-items: flex-start;
  background-color: white;
`;

export const HeaderWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

export const Header = styled.h1`
  color: #323232;
  font-size: 36px;
  font-weight: 600;
  line-height: 1.3;
  letter-spacing: 0;
`;

export const Span = styled.span`
  color: #959595;
  font-size: 14px;
  font-weight: 400;
  line-height: 27px;
`;

export const NavLink = styled(Link)`
  color: #1473e6;
  text-decoration: none;
  font-weight: 400;
  font-size: 14px;
`;

export const Error = styled.label`
  color: #e34850;
  font-size: 12px;
  font-weight: 500;
  padding-top: 5px;
`;

export const ApiError = styled.div`
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

export const InputWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 30px;
`;

export const InputContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  height: 60px;
  position: relative;
`;

export const Label = styled.label`
  color: #747474;
  font-size: 10px;
  font-weight: 500;
`;

export const InputHolder = styled.div`
  width: 100%;
  position: relative;
`;

export const Input = styled.input`
  width: 100%;
  padding-right: 50px;
  border: none;
  outline: none;
  border-bottom: solid 1px #d3d3d3;
  font-size: 14px;
  font-family: inherit;
  color: #323232;
  height: 28px;

  &:focus {
    border-bottom: solid 2px #1473e6;
  }
`;

export const Icon = styled.div`
  position: absolute;
  right: 0px;
  bottom: 6px;
  height: 15px;
  aspect-ratio: 1;
  background-image: url(${(props: IStyledProps) => props.backgroundUrl});
  background-position: center;
  background-size: cover;
`;

export const ShowPwd = styled.div`
  position: absolute;
  right: 20px;
  bottom: 6px;
  height: 15px;
  aspect-ratio: 1;
  background-image: url(${(props: IStyledProps) => props.backgroundUrl});
  background-position: center;
  background-size: cover;
  cursor: pointer;
`;

export const PwdInfo = styled.div`
  position: absolute;
  top: 1px;
  left: 55px;
  height: 12px;
  aspect-ratio: 1;
  background-image: url(${(props: IStyledProps) => props.backgroundUrl});
  background-position: center;
  background-size: cover;
  cursor: pointer;
`;

export const Panel = styled.div`
  position: absolute;
  top: -100px;
  background-color: #0d66d0;
  border-radius: 5px;
  color: white;
  padding: 10px 15px;
  font-size: 10px;
  max-width: 400px;
`;

export const ButtonContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: end;
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
  gap: 10px;
  align-items: center;
  cursor: pointer;

  &:disabled {
    background-color: #f4f4f4;
    color: #bcbcbc;
    cursor: initial;
  }

  &:hover:enabled {
    background-color: #0d66d0;
  }
`;
