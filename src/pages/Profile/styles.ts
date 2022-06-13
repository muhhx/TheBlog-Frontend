import styled from "styled-components";

interface IProps {
  selected?: boolean;
  image?: string;
  hover?: boolean;
}

export const Container = styled.div`
  width: 100%;
  min-height: 90vh;
  display: flex;
  gap: 30px;
  margin: 50px 0px;

  @media only screen and (max-width: 1200px) {
    flex-direction: column;
  }
`;

export const LoadingContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const AsideWrapper = styled.aside`
  width: 30%;
  position: relative;

  @media only screen and (max-width: 1200px) {
    height: auto;
    width: 100%;
  }
`;

export const Information = styled.div`
  width: 100%;
  position: sticky;
  top: 39px;
  background-color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 50px;
  border-radius: 10px;
  padding: 20px;

  @media only screen and (max-width: 1200px) {
    min-height: auto;
    background-color: transparent;
  }
`;

export const MainWrapper = styled.div`
  width: 70%;
  display: flex;
  flex-direction: column;
  gap: 10px;
  min-height: 80vh;

  @media only screen and (max-width: 1200px) {
    width: 100%;
  }
`;

export const OptionWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: start;
  gap: 10px;
`;

export const Option = styled.button`
  background-color: ${(props: IProps) =>
    props.selected === true ? "#191919" : "transparent"};
  border: none;
  border-radius: 100px;
  min-height: 32px;
  padding: 5px 20px;
  cursor: pointer;
  font-family: inherit;
  color: ${(props: IProps) => (props.selected === true ? "white" : "#191919")};
  font-weight: 600;
`;

export const Posts = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  justify-content: center;
  gap: 15px;

  @media only screen and (max-width: 740px) {
    grid-template-columns: repeat(1, 1fr);
  }
`;

export const ProfileHeader = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  max-width: 400px;
`;

export const Picture = styled.div`
  width: 110px;
  height: 110px;
  border-radius: 50%;
  background-image: url(${(props: IProps) => props.image});
  background-position: center;
  background-size: cover;
  background-color: grey;
`;

export const Name = styled.h1`
  color: #191919;
  font-weight: 600;
  font-size: 24px;
  word-break: break-word;
  text-align: center;
`;

export const SpanWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const DataWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  max-width: 400px;
`;

export const DataContainer = styled.div`
  width: 100%;
  display: flex;

  justify-content: space-between;
`;

export const Span = styled.span`
  color: dimgray;
  font-size: 12px;
  text-align: center;
`;

export const Button = styled.button`
  background-color: #0057ff;
  border: none;
  border-radius: 100px;
  min-height: 36px;
  font-family: inherit;
  color: white;
  font-weight: 600;
  padding: 5px 20px;
  text-align: center;
  cursor: pointer;
  width: 100%;
  max-width: 400px;
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
    background-color: #003ecb;
  }
`;

export const Unfollow = styled.button`
  background-color: ${(props: IProps) =>
    !props.hover ? "#e8e8e8" : "#cc1b1b"};
  border: none;
  border-radius: 100px;
  min-height: 36px;
  font-family: inherit;
  color: white;
  font-weight: 600;
  padding: 5px 20px;
  text-align: center;
  cursor: pointer;
  width: 100%;
  max-width: 400px;
`;

export const Icon = styled.div`
  height: 15px;
  aspect-ratio: 1;
  background-image: url(${(props: IProps) => props.image});
  background-position: center;
  background-size: cover;
`;
