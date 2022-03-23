import {createContext} from 'react';

const palette = {
  purple: '#5A31F4',
  green: '#0ECD9D',
  red: '#CD0E61',
  dark: '#2c3d7a',
  light: '#f3f4f6',
  text: '#2c3d7a',
  secondaryText: '#828cb0'
};

export const theme = {
  colors: {
    background: palette.light,
    foreground: palette.dark,
    primary: palette.purple,
    success: palette.green,
    danger: palette.red,
    failure: palette.red,
    text: palette.text,
    raisedBackground: '#ffffff',
    secondaryText: palette.secondaryText,
    subtitle: '#828cb0',
    shadow: '#aaaaaa'
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 18,
    lg: 24,
    xl: 40,
    '2xl': 64
  },
  textVariants: {
    header: {
      fontFamily: 'Poppins-Medium',
      fontSize: 20,
    },
    body: {
      fontFamily: 'Poppins-Regular',
      fontSize: 16,
    },
    secondary: {
      fontFamily: 'Poppins-Regular',
      fontSize: 16,
      color: palette.secondaryText
    },
  },
};

export const darkTheme = {
  ...theme,
  colors: {
    ...theme.colors,
    background: '#141c3b',
    foreground: '#eeeeee',
    raisedBackground: '#1c2754',
    secondaryText: '#6b728f',
    text: '#eeeeee',
    shadow: 'black'
  },
};

export const ThemeContext = createContext()