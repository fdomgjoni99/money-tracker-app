import React, {useState, useContext} from 'react';
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
  Modal,
  ActivityIndicator,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';
import theme from '../theme';
import { ThemeContext } from '../contexts/theme';

import Text from '../components/Text';

const Transaction = ({navigation}) => {
  const {width, height} = useWindowDimensions();
  const [modalVisible, setModalVisible] = useState(false);
  const themeContext = useContext(ThemeContext);

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: themeContext.colors.background}}>
      <StatusBar />
      <View
        style={{
          height: '100%',
          width: '100%',
          backgroundColor: 'black',
          position: 'absolute',
          bottom: 1,
          zIndex: 2,
          opacity: 0.5,
          display: modalVisible ? 'flex' : 'none',
        }}></View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}>
        <View
          style={{
            backgroundColor: 'white',
            position: 'absolute',
            elevation: 100,
            width: '100%',
            bottom: 0,
            height: height / 2.2,
          }}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Hello World!</Text>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}>
              <Text style={styles.textStyle}>Hide Modal</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
      <Pressable
        style={[styles.button, styles.buttonOpen]}
        onPress={() => setModalVisible(!modalVisible)}>
        <Text style={styles.textStyle}>Show Modal</Text>
      </Pressable>
      <View
        style={{
          flex: 1,
          marginHorizontal: theme.margin.md,
          justifyContent: 'space-between',
        }}>
        <View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <Pressable onPress={() => navigation.goBack()}>
              <Icon
                name="arrow-back-outline"
                style={{
                  color: themeContext.colors.secondaryText,
                  fontSize: 18,
                  backgroundColor: themeContext.colors.raisedBackground,
                  padding: 6,
                  width: 30,
                  height: 30,
                  borderRadius: 8,
                }}></Icon>
            </Pressable>
            <Text
              style={{
                color: themeContext.colors.foreground,
                fontSize: 18,
                fontFamily: 'Poppins-Medium',
                textAlign: 'center',
                marginVertical: 24,
              }}>
              Add transaction
            </Text>
            <View style={{height: 30, width: 30}}></View>
          </View>
          <View
            style={{
              marginBottom: 16,
              padding: 6,
              backgroundColor: themeContext.colors.raisedBackground,
              flexDirection: 'row',
              borderRadius: 8,
            }}>
            <LinearGradient
              start={{x: 1, y: 0}}
              end={{x: 0, y: 1}}
              colors={['#4776E6', '#8E54E9']}
              style={{flex: 1, padding: 12, borderRadius: 8}}>
              <Text style={{textAlign: 'center', color: '#fff'}}>Expense</Text>
            </LinearGradient>
            <LinearGradient
              start={{x: 1, y: 0}}
              end={{x: 0, y: 1}}
              colors={[themeContext.colors.raisedBackground, themeContext.colors.raisedBackground]}
              style={{flex: 1, padding: 12, borderRadius: 8}}>
              <Text
                style={{
                  textAlign: 'center',
                  color: themeContext.colors.secondaryText,
                }}>
                Income
              </Text>
            </LinearGradient>
          </View>
          <View
            style={{
              flexDirection: 'row',
              backgroundColor: themeContext.colors.raisedBackground,
              borderRadius: 10,
              alignItems: 'center',
              justifyContent: 'center',
              elevation: 10,
              marginBottom: 20,
              shadowColor: themeContext.colors.shadowColor,
            }}>
            <Text style={{fontSize: 24, color: theme.colors.secondaryText}}>
              $
            </Text>
            <TextInput
              style={{fontSize: 32, color: themeContext.colors.foreground}}
              placeholder="0"
              keyboardType="numeric"></TextInput>
          </View>
          <Pressable
            android_ripple={{
              color: 'grey',
            }}
            onPress={() => navigation.navigate('select_category')}
            style={{
              paddingHorizontal: 16,
              paddingVertical: 10,
              backgroundColor: themeContext.colors.raisedBackground,
              borderRadius: 10,
            }}>
            <Text style={{color: themeContext.colors.text}}>Category</Text>
          </Pressable>
        </View>
        <View style={{borderRadius: 16, overflow: 'hidden', marginBottom: 16}}>
          <Pressable
            onPress={() => alert('dssds')}
            android_ripple={{
              color: '#fff',
              foreground: true,
            }}>
            <LinearGradient
              start={{x: 0, y: 1}}
              end={{x: 1, y: 1}}
              colors={['#4776E6', '#8E54E9']}
              style={{
                paddingHorizontal: 16,
                paddingTop: 18,
                paddingBottom: 16,
                borderRadius: 16,
                flexDirection: 'row',
                justifyContent: 'center',
              }}>
              <Text
                style={{
                  fontSize: 20,
                  color: '#fff',
                  textAlign: 'center',
                  fontFamily: 'Poppins-Medium',
                }}>
                Save
              </Text>
              {/* <ActivityIndicator size="small" color={'#fff'} style={{marginLeft: 10}} /> */}
            </LinearGradient>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({});

export default Transaction;
