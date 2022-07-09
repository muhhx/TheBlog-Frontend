import styled from "styled-components";
import { Link } from "react-router-dom";

interface IProps {
  image: string;
}

export const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const Wrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 20px;
  justify-content: space-between;
`;

export const User = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 20px;
`;

export const UserWrapper = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

export const Picture = styled.div`
  min-height: 50px;
  aspect-ratio: 1;
  background-image: url(${(props: IProps) => props.image});
  background-position: center;
  background-size: cover;
  border-radius: 100px;
`;

export const Name = styled.h3`
  color: #323232;
  font-size: 14px;
  display: flex;
  align-items: center;
  gap: 5px;
  flex-wrap: wrap;
`;

export const Information = styled.span`
  color: #323232;
  font-size: 12px;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const NameLink = styled(Link)`
  color: inherit;
  text-decoration: inherit;
  font-weight: 600;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;

export const Data = styled.span`
  font-size: 10px;
  color: #c5c5c5;
  font-weight: 400;

  @media only screen and (max-width: 400px) {
    display: none;
  }
`;

export const Edit = styled.button`
  background-color: transparent;
  border: none;
  cursor: pointer;
  min-width: 15px;
  min-height: 15px;
  background-image: url(${(props: IProps) => props.image});
  background-position: center;
  background-size: contain;
  background-repeat: no-repeat;
`;

export const Box = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 15px;
`;

export const TextArea = styled.textarea`
  width: 100%;
  min-height: 150px;
  border: solid 1px #dfdfdf;
  border-radius: 2px;
  outline: none;
  resize: vertical;
  padding: 10px;
  font-family: inherit;
  font-size: 12px;
  color: #323232;
  font-weight: 500;
`;

export const ButtonWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: end;
  gap: 15px;
  flex-wrap: wrap;
`;

export const DeleteButton = styled.button`
  background-color: #191919;
  border: solid 1px #e8e8e8;
  border-radius: 100px;
  min-height: 36px;
  font-family: inherit;
  color: white;
  font-weight: 600;
  padding: 5px 20px;
  text-align: center;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;

  &:disabled {
    background-color: #f4f4f4;
    color: #bcbcbc;
    cursor: initial;
  }

  &:hover:enabled {
    background-color: black;
  }

  @media only screen and (max-width: 400px) {
    width: 100%;
  }
`;

export const SubmitButton = styled.button`
  background-color: #fff;
  border: solid 1px #e8e8e8;
  border-radius: 100px;
  min-height: 36px;
  font-family: inherit;
  color: #191919;
  font-weight: 600;
  padding: 5px 20px;
  text-align: center;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;

  &:disabled {
    background-color: #f4f4f4;
    color: #bcbcbc;
    cursor: initial;
  }

  &:hover:enabled {
    background-color: #f1f1f1;
    border-color: #e8e8e8;
  }

  @media only screen and (max-width: 400px) {
    width: 100%;
  }
`;
