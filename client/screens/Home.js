/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useEffect, useCallback} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  Dimensions,
  useWindowDimensions,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import Pie from 'react-native-pie';
import theme from '../theme';

const Statistics = () => {
  const width = useWindowDimensions().width;
  useFocusEffect(useCallback(() => {
    console.log('focused')
    return () => {
      console.log('dssdsdsdsdd')
    }
  }, []))
  return (
    <SafeAreaView>
      <StatusBar />
      <ScrollView
        style={{
          backgroundColor: '#fff',
          height: '100%',
        }}
        contentInsetAdjustmentBehavior="automatic">
        <Text
          style={{
            textAlign: 'center',
            marginTop: 30,
            fontSize: theme.largeFontSize,
            color: theme.secondaryText,
          }}>
          Current balance
        </Text>
        <Text style={{textAlign: 'center', fontSize: 36, color: '#555'}}>
          $3600
        </Text>
        <View
          style={{
            paddingHorizontal: theme.defaultPadding,
          }}>
          <View
            style={{
              flexDirection: 'row',
              backgroundColor: '#eee',
              padding: 6,
              borderRadius: 12,
              marginVertical: 16,
            }}>
            <View
              style={{
                flex: 1,
                backgroundColor: 'white',
                borderRadius: 10,
                elevation: 2,
              }}>
              <Text
                style={{
                  color: theme.primaryText,
                  padding: 8,
                  textAlign: 'center',
                  fontWeight: '500',
                }}>
                Expenses
              </Text>
            </View>
            <View style={{flex: 1, backgroundColor: '#eee', borderRadius: 10}}>
              <Text
                style={{
                  color: theme.secondaryText,
                  padding: 8,
                  textAlign: 'center',
                  fontWeight: '500',
                }}>
                Income
              </Text>
            </View>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-around',
              marginVertical: 30,
            }}>
            <Pie
              radius={width / 3.5}
              innerRadius={70}
              dividerSize={2}
              style={{}}
              sections={[
                {percentage: 10, color: '#6A4C93'},
                {percentage: 20, color: '#1982C4'},
                {percentage: 30, color: '#8AC926'},
                {percentage: 10, color: '#FF595E'},
                {percentage: 30, color: '#FFCA3A'},
              ]}
            />
            {/* <View style={{position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center'}}>
               <View style={{backgroundColor: 'white', width: width / 2.2, height: width / 2.2, borderRadius: 100}}></View>
             </View> */}
            <View
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text
                style={{
                  fontSize: 24,
                  fontWeight: '500',
                  color: theme.primaryText,
                }}>
                June
              </Text>
              <Text
                style={{
                  fontSize: 24,
                  fontWeight: '500',
                  color: theme.primaryText,
                }}>
                2019
              </Text>
            </View>
          </View>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <View
              style={{
                height: 14,
                width: 14,
                backgroundColor: '#FFCA3A',
                borderRadius: 4,
                marginRight: 8,
              }}></View>
            <Text style={{fontSize: theme.defaultFontSize}}>Robert - 10%</Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginVertical: 2,
            }}>
            <View
              style={{
                height: 14,
                width: 14,
                backgroundColor: '#1982C4',
                borderRadius: 4,
                marginRight: 8,
              }}></View>
            <Text style={{fontSize: theme.defaultFontSize}}>Robert - 10%</Text>
          </View>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <View
              style={{
                height: 14,
                width: 14,
                backgroundColor: '#8AC926',
                borderRadius: 4,
                marginRight: 8,
              }}></View>
            <Text style={{fontSize: theme.defaultFontSize}}>Robert - 10%</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({});

export default Statistics;
