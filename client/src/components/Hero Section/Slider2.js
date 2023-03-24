import React from 'react';
import styled from 'styled-components';
import { ArrowLeft, ArrowRight } from './icons/index';
import b1 from '../../assets/b1.jpg';

const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  position: relative;
`;

const Arrow = styled.div`
  width: 50px;
  height: 50px;
  background-color: #fff7f7;
  border-radius: 50%;
  display: flex;
  align-items: center;
  position: absolute;
  top: 0;
  bottom: 0;
  margin: auto;
  left: ${(props) => props.direction === 'left' && '10px'};
  right: ${(props) => props.direction === 'right' && '10px'};
  cursor: pointer;
`;

const Wrapper = styled.div`
  height: 100%;
`;

const Slide = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
`;

const Image = styled.img`
  height: 80%;
`;

const ImgContainer = styled.div`
  height: 100%;
  flex: 1;
  justify-content: center;
  background-color: red;
`;
const InfoContainer = styled.div`
  flex: 1;
  padding: 50px;
`;

const Title = styled.h1``;
const Description = styled.p``;
const Button = styled.button``;

const Slider2 = () => {
  return (
    <Container>
      <Arrow direction='left'>
        <a href='#'>
          <ArrowLeft />
        </a>
      </Arrow>
      <Wrapper>
        <Slide>
          <ImgContainer>
            <Image src={b1} />
          </ImgContainer>
          <InfoContainer>
            <Title>Summer Sale</Title>
            <Description>
              sdfasodihfasiodfasfahosidfoashidf asodhifa aoshidfasodg h
              oashidfasdiof
            </Description>
            <Button>Shop Now</Button>
          </InfoContainer>
          <ImgContainer></ImgContainer>
        </Slide>
      </Wrapper>
      <Arrow direction='right'>
        <a href='#'>
          <ArrowRight />
        </a>
      </Arrow>
    </Container>
  );
};

export default Slider2;
