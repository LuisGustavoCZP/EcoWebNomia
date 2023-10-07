import MUIButton from "@mui/material/Button";

interface ButtonProps 
{
    children: React.ReactNode
    type?: "button" | "submit" | "reset" | undefined,
    onClick?: () => void,
}

export function Button ({
    children,
    type="submit",
    onClick,
} : ButtonProps)
{
    return (
        <MUIButton type={type} onClick={onClick} variant="contained">
            {children}
        </MUIButton>
    )
}