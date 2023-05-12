import { Backdrop, CircularProgress } from '@mui/material'
import React from 'react'

export const CustomBackdrop = ({ open, onClose }) => {
    return (
        <Backdrop
            open={open}
            onClick={onClose}
            sx={{ backgroundColor: 'rgba(50, 50, 50, 0.5)', color: '#F8CBA6', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        >
            <CircularProgress color="inherit" />
        </Backdrop>
    )
}

