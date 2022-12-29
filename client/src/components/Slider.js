import React from 'react';
import styled from 'styled-components';
import { ArrowLeft, ArrowRight } from './icons/index';
import banner1 from '../assets/banner1.jpg';

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
  display: flex;
  align-items: center;
`;

const Image = styled.img``;

const ImgContainer = styled.div`
  flex: 1;
`;
const InfoContainer = styled.div`
  flex: 1;
`;

const Slider = () => {
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
            <Image src={banner1} />
          </ImgContainer>
          <InfoContainer></InfoContainer>
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

export default Slider;
