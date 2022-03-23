/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useContext, useState, useEffect} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  View,
  Dimensions,
  useWindowDimensions,
  TextInput,
  Pressable,
  ActivityIndicator,
  KeyboardAvoidingView,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';

import Text from '../components/Text';
import {useStoreState, useStoreActions} from 'easy-peasy';
import {ThemeContext} from '../contexts/theme';
import AuthService from '../services/auth.service';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Login = ({navigation}) => {
  const theme = useContext(ThemeContext);
  const width = useWindowDimensions().width;
  const msg = useStoreState(state => state.message);
  const loginUser = useStoreActions(state => state.login);
  const userdata = useStoreState(state => state.user);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() =>{
    console.log(userdata.token)
    const checkUserIsAuthenticated = async() =>{
      const token = await AsyncStorage.getItem('token')
      if(token)
        navigation.navigate('Home', {screen: 'Home2'})
    }

    // checkUserIsAuthenticated()
  }, [])
  const login = async () => {
    try {
      setLoading(true);
      const res = await AuthService.login('admin@gmail.com', 'password');
      await AsyncStorage.setItem('token', res.token);
      setLoading(false);
      loginUser(res.token);
      navigation.navigate('Home');
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        paddingVertical: 20,
        justifyContent: 'space-evenly',
        backgroundColor: theme.colors.background,
      }}>
      <StatusBar
        backgroundColor={theme.colors.background}
        barStyle="dark-content"
      />
      <KeyboardAvoidingView
        behavior="padding"
        style={{
          flex: 1,
          justifyContent: 'center',
          marginBottom: 80,
        }}>
        <View
          style={{
            marginVertical: theme.spacing.xl,
            marginHorizontal: theme.spacing.md,
          }}>
          <Text style={{fontSize: 32, fontFamily: 'Poppins-Bold'}}>Login</Text>
          <Text
            style={{
              ...theme.textVariants.secondary,
              color: theme.colors.subtitle,
            }}>
            Please login to get started
          </Text>
        </View>
        <TextInput
          style={{
            ...styles.textInput,
            marginHorizontal: theme.spacing.md,
            elevation: 10,
            shadowColor: theme.colors.shadow,
            backgroundColor: theme.colors.raisedBackground,
            color: theme.colors.foreground,
            marginBottom: theme.spacing.lg,
          }}
          onChangeText={text => setEmail(text)}
          value={email}
          placeholderTextColor={theme.colors.secondaryText}
          placeholder="Enter email..."
        />
        <TextInput
          style={{
            ...styles.textInput,
            marginHorizontal: theme.spacing.md,
            elevation: 10,
            shadowColor: theme.colors.shadow,
            backgroundColor: theme.colors.raisedBackground,
            color: theme.colors.foreground,
            marginBottom: theme.spacing.lg,
          }}
          onChangeText={text => setPassword(text)}
          value={password}
          placeholder="Enter password..."
          placeholderTextColor={theme.colors.secondaryText}
        />
        <View style={{flexDirection: 'row', justifyContent: 'flex-end'}}>
          <Pressable
            onPress={() => login()}
            android_ripple={{
              color: '#fff',
              foreground: true,
            }}
            style={{marginHorizontal: theme.spacing.md, flex: 1}}>
            <LinearGradient
              start={{x: 0, y: 1}}
              end={{x: 1, y: 1}}
              colors={['#4776E6', '#8E54E9']}
              style={{
                paddingHorizontal: 38,
                paddingTop: 18,
                paddingBottom: 16,
                borderRadius: 16,
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              {!loading ? (
                <Text
                  style={{
                    fontSize: 20,
                    color: '#fff',
                    textAlign: 'center',
                    fontFamily: 'Poppins-Medium',
                    marginRight: 8,
                  }}>
                  Login
                </Text>
              ) : (
                <View style={{flexDirection: 'row'}}>
                  <Text
                    style={{
                      fontSize: 20,
                      color: '#fff',
                      textAlign: 'center',
                      fontFamily: 'Poppins-Medium',
                      marginRight: 8,
                    }}>
                    Logging in
                  </Text>
                  <ActivityIndicator
                    color={'white'}
                    size={20}></ActivityIndicator>
                </View>
              )}
            </LinearGradient>
          </Pressable>
        </View>
      </KeyboardAvoidingView>
      <Text>Or continue without an account</Text>
      <View>
        <Text style={{textAlign: 'center'}}>
          Don't have an account? Sign up
        </Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  textInput: {
    padding: 16,
    borderRadius: 10,
    fontFamily: 'Poppins-Regular',
  },
});

export default Login;
