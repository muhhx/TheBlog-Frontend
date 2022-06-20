import styled from "styled-components";

interface IProps {
  show?: boolean;
  selected?: boolean;
  backgroundUrl?: string;
}

export const Form = styled.form`
  width: 100%;
  min-height: 90vh;
  padding: 50px 0px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 30px;
`;

export const Wrapper = styled.div`
  width: 100%;
  display: flex;
  gap: 50px;
  @media only screen and (max-width: 800px) {
    flex-direction: column;
  }
`;

export const Header = styled.h1`
  color: #323232;
  font-size: 36px;
  font-weight: 600;
  line-height: 1.3;
  letter-spacing: 0;
`;

export const Editor = styled.textarea`
  width: 100%;
  min-height: 400px;
  resize: vertical;
  height: auto;
  display: ${(props: IProps) => (!props.show ? "none" : "initial")};
  background-color: white;
  border: none;
  border-bottom: solid 2px #d3d3d3;
  font-size: 14px;
  font-family: "Poppins", sans-serif;
  outline: none;
  color: #191919;
  padding: 5px 10px;
  border-radius: 5px;

  &:focus {
    border-bottom: solid 2px #1473e6;
  }
`;

export const Preview = styled.div`
  width: 100%;
  min-height: 400px;
  display: ${(props: IProps) => (!props.show ? "none" : "initial")};
  padding: 5px 10px;
  border-bottom: solid 1px #d3d3d3;
`;

export const OptionWrapper = styled.div`
  display: flex;
  justify-content: start;
  gap: 10px;

  @media only screen and (max-width: 530px) {
    flex-direction: column;
  }
`;

export const Option = styled.div`
  background-color: ${(props: IProps) =>
    props.selected === true ? "#191919" : "#f1f1f1"};
  border: none;
  border-radius: 100px;
  min-height: 32px;
  padding: 5px 20px;
  min-width: 110px;
  cursor: pointer;
  font-family: inherit;
  color: ${(props: IProps) => (props.selected === true ? "white" : "#191919")};
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const InputContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  position: relative;
`;

export const Label = styled.label`
  color: #747474;
  font-size: 10px;
  font-weight: 500;
`;

export const Input = styled.input`
  width: 100%;
  border: none;
  outline: none;
  border-bottom: solid 2px #d3d3d3;
  font-size: 24px;
  font-family: inherit;
  color: #323232;
  background-color: white;
  padding: 5px 10px;
  border-radius: 5px;

  &:focus {
    border-bottom: solid 2px #1473e6;
  }
`;

export const ContentContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 10px;
`;

export const ButtonContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  gap: 10px;

  @media only screen and (max-width: 530px) {
    flex-direction: column;
  }
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
  cursor: pointer;

  &:disabled {
    background-color: #f4f4f4;
    color: #bcbcbc;
    cursor: initial;
  }

  &:hover:enabled {
    background-color: #0d66d0;
  }

  @media only screen and (max-width: 530px) {
    width: 100%;
  }
`;

export const HeaderContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 5px;
`;

export const SpanHeader = styled.div`
  font-size: 12px;
  color: #323232;
`;
