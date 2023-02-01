import styled from 'styled-components';
import * as colors from '../../config/colors';

export const Form = styled.form`
  margin-top: 10px;
  display: flex;
  flex-direction: column;

  input{
    height: 40px;
    font-size: 18px;
    border: 1px solid #ddd;
    padding: 0 10px;
    border-radius: 10px;
    margin-top: 15px;

    &:focus{
      border: 1px solid ${colors.primaryColor};
    }
  }

  button{
    margin-top: 20px;
  }
`;

export const ProfilePicture = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 0 20px;
  position: relative;
  margin-top: 30px;

  img{
    width: 180px;
    height: 180px;
    border-radius: 50%;
  }

  a{
    display: flex;
    align-items: center;
    justify-content: center;
    border: none;
    position: absolute;
    bottom: 0;
    color: #fff;
    background: ${colors.primaryColor};
    width: 36px;
    height: 36px;
    border-radius: 100%;
    margin-left: 25%;
    margin-bottom: 5%;

    transition: all 300ms;

    &:hover{
    filter: brightness(80%);
  }
  }
`;

export const Title = styled.h1`
  text-align: center;
  margin-bottom: 10px;
`;
