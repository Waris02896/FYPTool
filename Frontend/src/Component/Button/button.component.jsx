import React from 'react'
import { CustomButtonContainer } from './button.style'


export default function CustomButton({ children, ...props }) {
    return (
        <CustomButtonContainer {...props}>
            {children}
        </CustomButtonContainer>
    )
}
