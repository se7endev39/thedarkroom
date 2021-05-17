/*import { Appearance } from 'react-native-appearance'*/

/*const osTheme = Appearance.getColorScheme();*/

export const hitSlop = {top: 20, bottom: 20, left: 20, right: 20};

export const ThemeColors = {
    primaryText: {
        light: 'black',
        dark: 'white',
    },
    backgroundColor: {
        light: '#fff',
        dark: '#403a3b',
    },
    interfaceColor: {
        light: 'black',
        dark: 'black',
    },
};

export const getTheme = (mode) => {
    let Theme = {};
    for (let key in ThemeColors) {
        Theme[key] = ThemeColors[key][mode];
    }
    return Theme;
};
