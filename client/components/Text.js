 import React, {useContext} from 'react';
 import {Text as Txt} from 'react-native';
import { ThemeContext } from '../contexts/theme';

 const Text = ({style, children}) => {
   const theme = useContext(ThemeContext)
   return (
     <Txt style={[{fontFamily: 'Poppins-Regular', fontSize: 14, color: theme.colors.foreground}, style]}>
         {children}
     </Txt>
   );
 };
 
 export default Text;