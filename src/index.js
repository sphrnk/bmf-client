import {useEffect, useState} from "react";
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
const lightTheme = createTheme({
    palette: {
        mode: "light",
        primary: {
            light: "#8d7e6d",
            main: "#5f5242",
            dark: "#352a1b",
        },
        background: {
            default: '#fcfcfc',
            paper: '#e3e3e3',
        }
    },
    shadows: Array(25).fill('none'),
    // typography: {
    //
    // }
    mixins: {
        toolbar: {
            minHeight: 56,
            height: 86,
        }
    },
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
        },
    }
});
const darkTheme = createTheme({
    palette: {
        mode: "dark",
        primary: {
            light: "#8d7e6d",
            main: "#5f5242",
            dark: "#352a1b",
        },
        background: {
            default: '#121212',
            paper: '#212121',
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
        },
    }
});
const responsiveLightTheme = responsiveFontSizes(lightTheme);
const responsiveDarkTheme = responsiveFontSizes(darkTheme);

function Root() {
    const [currentTheme, setCurrentTheme] = useState('light');

    // Function to toggle theme based on time
    const toggleThemeBasedOnTime = () => {
        const currentTime = new Date();
        const currentHour = currentTime.getHours();

        let themeMode = 'light';

        if (currentHour >= 18 || currentHour < 6) {
            // Use dark theme during nighttime (6 PM to 6 AM)
            themeMode = 'dark';
        }


        setCurrentTheme(themeMode);
    };
    const toggleTheme = () => {
        setCurrentTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
    };

    // Periodically check and update the theme every minute
    // useEffect(() => {
    //     toggleThemeBasedOnTime(); // Initial check
    //     const intervalId = setInterval(toggleThemeBasedOnTime, 60000); // Check every minute
    //
    //     return () => {
    //         clearInterval(intervalId); // Clean up the interval
    //     };
    // }, []);

    // Render your application once initialization is complete
    const backgroundColor = currentTheme === 'dark' ? responsiveDarkTheme.palette.background.default : responsiveLightTheme.palette.background.default;

    document.documentElement.style.backgroundColor = backgroundColor;
    return (
        <Provider store={store}>
            <AuthContextProvider>
                <BrowserRouter>
                    {/*<StyledEngineProvider injectFirst>*/}
                    <ThemeProvider theme={currentTheme === 'light' ? responsiveLightTheme : responsiveDarkTheme}>
                        <App toggleTheme={toggleTheme}/>
                    </ThemeProvider>
                    {/*</StyledEngineProvider>*/}
                </BrowserRouter>
            </AuthContextProvider>
        </Provider>
    )
}

root.render(
    <Root/>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
