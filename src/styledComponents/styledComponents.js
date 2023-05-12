import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
     

     ${'' /* #ECF9FF,#ECF2FF, #FFF4D2, #FFE7CC, #F8CBA6, #bf4e00, #8f2800, #662100  */}


     * {
          box-sizing: border-box;
     }

     *::-webkit-scrollbar {
          width: 6px;
          height: 6px;
     }
 

     *::-webkit-scrollbar-thumb {
          background-color: #aaa;
          border-radius: 12px;
     }

     body {
          font-family: 'Montserrat', sans-serif;
          background-color: #ECF9FF;
     }

     .centered{
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content:center;
     }
     
     .centered-center{
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          margin: auto;
     }

     .home-div{
          display:flex;
          text-align:center;
          padding: 20px;  
     }

     .home-div img{
          border-radius: 2%;
     }


     .footer-custom {
          box-shadow: 0 14px 28px rgba(0, 0, 0, .2), 0 10px 10px rgba(0, 0, 0, .2);
          border-radius: 20px;
          background-color:#FFF4D2;
          margin-top: 1%;
          padding-top: 10px;
          display:flex;
          text-align:center;
          gap:20px;
     }

     .footer-custom div{
          width: 20%;
     }

     .footer-custom svg{
          font-size: 35px;
          color:#bf4e00;
     }

     .footer-custom svg:hover{
          color:#8f2800;
     }

     .social-media {
          display: flex;
          flex-direction: row;
          justify-content: space-evenly;
     }

     .input-custom{
          border: none;
          padding: 12px 15px;
          width: auto;
          border-radius: 8px;
     }

     .div-form-container{
          box-shadow: 0 14px 28px rgba(0, 0, 0, .2), 0 10px 10px rgba(0, 0, 0, .2);
          border-radius: 20px;
          background-color: #ECF2FF;
          padding: 50px;
          width: 40%;
     }

     .div-container{
          box-shadow: 0 14px 28px rgba(0, 0, 0, .2), 0 10px 10px rgba(0, 0, 0, .2);
          border-radius: 20px;
          background-color: #FFF4D2;
          padding: 20px;
     }

     .form-container{
          width: 100%;
          text-align:center;
     } 

     .form-input-div{
          display: flex;
          flex-direction: column;
          width: 65%;
     } 

     .form-input-div input{
          border: none;
          padding: 12px 15px;
          width: 100%;
          border-radius: 8px;
     }

     .submit-form {
          margin-top: 10px;
          background-color: #FFE7CC;
          border-radius: 20px;
          border: 1px solid #ffca8d;
          font-size: 12px;
          font-weight: bold;
          padding: 12px 45px;
          letter-spacing: 1px;
          text-transform: uppercase;
          user-select: none;
     }

     .submit-form:active {
          transform: scale(.95);
     }

     .submit-form:focus {
          outline: none;
     }

     .button-custom {
          margin-top: 10px;
          background-color: #F8CBA6;
          border-radius: 20px;
          border: 1px solid #ffca8d;
          font-size: 12px;
          font-weight: bold;
          padding: 12px 45px;
          letter-spacing: 1px;
          text-transform: uppercase;
          user-select: none;
     }

     .button-custom:hover{
          background-color: #FFE7CC;
     }

     .button-custom:active {
          transform: scale(.95);
     }

     .button-custom:focus {
          outline: none;
     }

     .div-profile{
          width:50%
     }

     @media screen and (max-width: 600px) {
          .div-form-container{
               width:90%
          }
          .form-input-div {
               width: 90%;
          }
          .form-container {
               width: 100%;
          }
     }

     @media screen and (max-width: 1000px) and (min-width: 600px) {
          .div-form-container{
               width:60%
          }
          .form-input-div {
               width: 80%;
          }
          .form-container {
               width: 100%;
          }
     }
`
