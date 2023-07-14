import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import {Provider} from 'react-redux';
import store from './store/index';
import reportWebVitals from "./reportWebVitals";
import {AuthContextProvider} from "./store/auth-context";
import {BrowserRouter} from "react-router-dom";
import {createTheme, StyledEngineProvider, ThemeProvider, responsiveFontSizes} from "@mui/material";

const root = ReactDOM.createRoot(document.getElementById("root"));
let theme = createTheme({
    palette: {
        mode: "light",
        primary: {
            light: "#8d7e6d",
            main: "#5f5242",
            dark: "#352a1b",
        }
    },
    shadows: Array(25).fill('none'),
    // typography: {
    //
    // }
    components: {
        MuiIcon: {
            styleOverrides: {
                root: {
                    width: 'auto'
                }
            }
        },
        MuiDialogTitle: {
            styleOverrides: {
                root: {
                    '&+.MuiDialogContent-root': {
                        padding: '20px 24px !important'
                    }
                }
            }
        },
        MuiDialogActions: {
            styleOverrides: {
                root: {
                    padding: '20px 24px'
                }
            }
        }
    }
});
theme = responsiveFontSizes(theme);
root.render(
    <Provider store={store}>
        <AuthContextProvider>
            <BrowserRouter>
                {/*<StyledEngineProvider injectFirst>*/}
                <ThemeProvider theme={theme}>
                    <App/>
                </ThemeProvider>
                {/*</StyledEngineProvider>*/}
            </BrowserRouter>
        </AuthContextProvider>
    </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
