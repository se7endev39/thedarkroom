import React, {useState} from 'react';
import { Appearance } from 'react-native-appearance'
import { getTheme } from './theme'
import {setTheme} from './ducks/main';
import {shallowEqual, useSelector} from 'react-redux';

// set default colour scheme from OS
const osTheme = Appearance.getColorScheme();

// initiate context
export const ManageThemeContext: React.Context<any> = React.createContext({
    mode: osTheme,
    theme: getTheme(osTheme),
    toggle: () => { }
});

// define useTheme hook for functional components
export const useTheme = () => React.useContext(ManageThemeContext);

// initiate context provider
function ThemeManager ({children})
{
    const theme = useSelector(state => state.main.theme, shallowEqual);
    const [mode, setMode] = useState(theme || osTheme);


    const toggleTheme = async () =>
    {
        let newMode = mode === 'light' ? 'dark' : 'light';
        setMode(newMode);
        setTheme(newMode);
    };

    return (
        <ManageThemeContext.Provider value={{
            mode: mode,
            theme: getTheme(mode),
            toggle: toggleTheme
        }}>
            {children}
        </ManageThemeContext.Provider>
    )
}

export default ThemeManager;
