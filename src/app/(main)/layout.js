import { Box } from "@mui/material";
import MainFooter from "@/app/(main)/_components/MainFooter";

export default function MainLayout({ children }) {
    return (
        <Box
            sx={{
                width: "100%",
                minHeight: "100dvh",
            }}
        >
            <Box
                component="main"
                sx={{
                    width: "100%",
                    maxWidth: "1280px",
                    mx: "auto",
                    px: { xs: 2, sm: 3, md: 4 },
                    pt: { xs: 3, md: 4 },
                }}
            >
                {children}
                <MainFooter />
            </Box>
        </Box>
    );
}
