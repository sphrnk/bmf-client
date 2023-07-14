import {Button, Link, Typography} from "@mui/material";
import {Link as RouterLink} from "react-router-dom";

const NotFoundPage = () => {
    return (
        <>
            <div className={"grid place-items-center h-full"}>
                <div className={"flex flex-col gap-8"}>
                    <Typography component={'h1'} variant={'h1'}>
                        404
                    </Typography>
                    <div>
                        <Typography component={'h6'} variant={'h6'} fontWeight={'bold'}>
                            OOPS, Page Not Found!
                        </Typography>
                        <Typography component={'body1'} variant={'body1'}>
                            The page isn't available right now
                        </Typography>
                    </div>
                    <Link component={RouterLink} to={'/'}>
                        <Button variant={'contained'}>
                            Get back to Home page
                        </Button>
                    </Link>
                </div>
            </div>
        </>
    )
}
export default NotFoundPage;