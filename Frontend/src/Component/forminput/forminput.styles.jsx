import styled, { css } from 'styled-components';


const subcolor = 'skyblue';
const maincolor = 'black';

const shrinKabelStyles = css `
    top: -19px;
    font-size: 12px;
    color: ${maincolor};
`;

export const GroupContainer = styled.div`
    position: relative;
    margin: 45px 0;
    input[type='password] {
        letter-spacing: 0.3em;
    }
`;

export const FormInputContainer = styled.input`
    background: none;
    background-color: white;
    color: ${subcolor};
    font-size: 12px;
    padding: 10px 10px 10px 5px;
    display: none;
    border-radius: 0;
    border-bottom: 1px solid ${subcolor};
    margin: 25px 0;
    &: focus {
        outline: none;
    }
    &:focus ~ label {
        ${shrinKabelStyles}
    }
`;

// export const FormInputLabel = styled.label`
//     color: ${subcolor};
//     font-size: 20px;
//     font-weight: normal;
//     position: realtive;
//     pointer-events: none;
//     left:spx;
//     top: 10px;
//     transition: 300ms ease all;
//     &.shrink {
//         ${shrinKabelStyles}
//     }
// `;