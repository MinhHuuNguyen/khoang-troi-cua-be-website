import React from 'react'
import { Container as MUIContainer } from "@mui/material";

export const Container = ({children}: {children: React.ReactElement}) => {
  return (
    <MUIContainer
      sx={{
        maxWidth: "1900px !important",
      }}
    >
        {children}
    </MUIContainer>
  )
}
