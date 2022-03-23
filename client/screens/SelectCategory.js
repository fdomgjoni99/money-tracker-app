/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useEffect, useState, useContext} from 'react';
import {
  SafeAreaView,
  FlatList,
  ScrollView,
  StatusBar,
  StyleSheet,
  View,
  Dimensions,
  useWindowDimensions,
  TextInput,
  Pressable,
  ActivityIndicator,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';
import theme from '../theme';
import Text from '../components/Text';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {ThemeContext} from '../contexts/theme';
import CategoryService from '../services/category.service';

const SelectCategory = ({navigation}) => {
  const width = useWindowDimensions().width;
  const [categories, setCategories] = useState([]);
  const theme = useContext(ThemeContext);
  useEffect(() => {
    const getCategories = async () => {
      const token = await AsyncStorage.getItem('token');
      const res = await CategoryService.fetch();
      setCategories(res.data.data);
      console.log(res.data.data);
    };
    getCategories();
  }, []);
  const deleteCategory = async id => {
    try {
      const res = await CategoryService.delete(id);
      const newCategories = categories.filter(item => item.id != id);
      setCategories(newCategories);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: theme.colors.background}}>
      <StatusBar barStyle="dark-content" />
      <FlatList
        data={categories}
        renderItem={({item}) => (
          <Pressable
            onLongPress={() => console.log('batmn')}
            style={{
              paddingVertical: 10,
              paddingHorizontal: theme.spacing.md,
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}
            android_ripple={{color: 'grey'}}>
            <Text>{item.name}</Text>
            <Pressable onPress={() => deleteCategory()}>
              <Icon name="trash" size={20} color={theme.colors.danger}></Icon>
            </Pressable>
          </Pressable>
        )}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({});

export default SelectCategory;
