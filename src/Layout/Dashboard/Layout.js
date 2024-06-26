import {useContext, useState, useEffect} from "react";
import Header from "./Header";
import Sidebar from "./Sidebar/Sidebar";
import Modal from "../../components/UI/Modal";
// import AuthContext from "../../store/auth-context";
import {useDispatch, useSelector} from "react-redux";
import useHttp from "../../hooks/use-http";
import {useRef} from "react";
import Footer from "./Footer";
import CreateClientForm from "../../components/Clients/CreateClientForm";
import AuthContext from "../../store/auth-context";
import FirstTimeChangePasswordForm from "../../components/Forms/FirstTimeChangePasswordForm";
import UserActions from "../../components/UI/UserActions";
import AuthHeader from "../Auth/AuthHeader";
import {Link, useLocation} from "react-router-dom";
import Notif from "../../components/UI/Notif";
import {uiActions} from "../../store/ui-slice";
import {
    Box,
    Drawer,
    IconButton,
    LinearProgress,
    styled,
    useTheme,
    Divider, List, ListItem, ListItemButton, ListItemIcon, Container
} from "@mui/material";


const drawerWidth = 240;
const Main = styled('main', {shouldForwardProp: (prop) => prop !== 'open'})(
    ({theme, sidebarState}) => ({
        width: '100%',
        flexGrow: 1,
        // padding: theme.spacing(3),
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        // marginLeft: `-${drawerWidth}px`,
        ...(sidebarState && {
            transition: theme.transitions.create('margin', {
                easing: theme.transitions.easing.easeOut,
                duration: theme.transitions.duration.enteringScreen,
            }),
            marginLeft: 0,
        }),
    }),
);


const DrawerHeader = styled('div')(({theme}) => {
    console.log(theme.mixins.toolbar)
    return {
        display: 'flex',
        alignItems: 'center',
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
        justifyContent: 'flex-end',
    }
});

const Layout = (props) => {
    const {userInfo: user, userToken: token} = useSelector((state) => state.auth)
    const {sidebarState} = useSelector((state) => state.ui);
    const {isUploading, uploadFilePercentage} = useSelector((state) => state.portal);
    const [changeTempPassword, setChangeTempPasswordSate] = useState(user.tempPasswordNotChanged);
    const changePasswordStateHandler = () => {
        setChangeTempPasswordSate(false);
    }
    return (
        <Box sx={{display: 'flex', backgroundColor: 'background.default'}}>
            <Header toggleTheme={props.toggleTheme}/>

            {user.tempPasswordNotChanged && changeTempPassword &&
                <Modal title={'Change Password'}
                       open={changeTempPassword}>
                    <FirstTimeChangePasswordForm onConfirm={changePasswordStateHandler}/>
                </Modal>}
            {!user.tempPasswordNotChanged &&
                <>
                    <Sidebar/>
                    {/*{isUserActionsShown && user && token && <UserActions isSidebarShown={isSidebarShown}/>}*/}
                    <Main sidebarState={sidebarState}>
                        <DrawerHeader/>
                        {/*<div className={mainClasses}>*/}
                        {/*<div className="container mx-auto py-5 px-4">*/}
                        <Container sx={{paddingTop: '20px'}} maxWidth={'xl'}>
                            {props.children}
                        </Container>
                        {/*</div>*/}
                        {/*</div>*/}
                    </Main>
                </>
            }
            <Notif/>
            {isUploading &&
                <Box sx={{
                    position: 'fixed',
                    right: 0,
                    width: '40%',
                    backgroundColor: 'white',
                    borderRadius: 2,
                    boxShadow: 1,
                }} p={3}>
                    <LinearProgress variant="determinate" value={uploadFilePercentage}/>
                </Box>
            }
            {/*<Footer/>*/}
        </Box>
    );
};

export default Layout;
