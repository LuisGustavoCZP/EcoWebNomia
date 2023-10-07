import { PropsWithChildren } from "react";
import { ThemeProvider, createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
      primary: {
        main: "hsl(195, 50%, 20%)"
      },
    },
  });

export function Theme ({children} : PropsWithChildren)
{
    return (
        <ThemeProvider theme={theme}>
            {children}
        </ThemeProvider>
    )
}