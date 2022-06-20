import styled from "styled-components";

interface IProps {
  image: string;
}

export const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: start;
  gap: 20px;
  padding-top: 15px;
  border-top: solid 1px #f2f2f2;
`;

export const Picture = styled.div`
  height: 100%;
  aspect-ratio: 1;
  background-image: url(${(props: IProps) => props.image});
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  border-radius: 100px;
`;

export const Information = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 5px 0px;
  position: relative;
`;

export const Name = styled.h1`
  color: #323232;
  font-size: 18px;
  font-weight: 600;
  line-height: 1.3;
  letter-spacing: 0;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }

  @media only screen and (max-width: 530px) {
    font-size: 14px;
  }
`;

export const Username = styled.p`
  color: #959595;
  font-size: 12px;
  font-weight: 400;
  max-width: 100px;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const Unfollow = styled.button`
  background-color: #e8e8e8;
  border: none;
  border-radius: 100px;
  min-width: 110px;
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
  position: absolute;
  right: 0;
  top: 5px;

  &:hover {
    background-color: #cc1b1b;
  }

  &:after {
    visibility: visible;
    content: "Seguindo";
  }

  &:hover::after {
    visibility: visible;
    content: "Unfollow";
  }
`;
