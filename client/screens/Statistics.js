import React, {
  useEffect,
  useState,
  useRef,
  useCallback,
  useContext,
} from 'react';
import {
  ScrollView,
  StatusBar,
  ActivityIndicator,
  StyleSheet,
  View,
  Dimensions,
  useWindowDimensions,
  SectionList,
  FlatList,
  Pressable,
} from 'react-native';
import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';
import Pie from 'react-native-pie';
import theme, {padding} from '../theme';
import Text from '../components/Text';
import Icon from 'react-native-vector-icons/Ionicons';
import {ThemeContext} from '../contexts/theme';
import {useStoreState, useStoreActions} from 'easy-peasy';
import {theme as themeContext} from '../contexts/theme';
import TransactionService from '../services/transaction.service';

const Header = () => {
  const {width, height} = useWindowDimensions();
  const [lastMonth, setLastMonth] = useState(null);
  const toggleThemeMode = useStoreActions(actions => actions.toggleThemeMode);
  const darkThemeMode = useStoreState(state => state.darkThemeMode);
  const themeContext = useContext(ThemeContext);

  useEffect(() => {
    const months = [
      'JAN',
      'FEB',
      'MAR',
      'APR',
      'MAY',
      'JUN',
      'JUL',
      'AUG',
      'SEP',
      'OCT',
      'NOV',
      'DEC',
    ];
    let days = new Date(2022, 2, 0).getDate();
    let daysOfMonth = [];
    for (let i = 0; i < 30; i++) {
      var priorDate = new Date(new Date().setDate(new Date().getDate() - i));
      daysOfMonth.push({
        day: priorDate.getDate(),
        month: months[priorDate.getMonth()],
        date: priorDate.toDateString(),
      });
    }
    setLastMonth(daysOfMonth);
  }, []);
  // const daysRef = useCallback(node => {
  //   if (node !== null) {
  //     console.log(node.scrollToEnd())
  //   }
  // }, []);

  const filterByDay = async date => {};

  return (
    <View style={{marginTop: 20}}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginVertical: 20,
          marginHorizontal: theme.margin.md,
        }}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Icon
            name="person"
            style={{
              color: themeContext.colors.secondaryText,
              fontSize: 36,
              backgroundColor: themeContext.colors.raisedBackground,
              padding: 8,
              borderRadius: 10,
              marginRight: 10,
            }}></Icon>
          <View>
            <Text
              style={{
                fontFamily: 'Poppins-Medium',
                color: theme.colors.secondaryText,
              }}>
              Welcome!
            </Text>
            <Text style={{fontFamily: 'Poppins-SemiBold', fontSize: 18}}>
              John Doe
            </Text>
          </View>
        </View>
        <Pressable onPress={() => toggleThemeMode()}>
          <Icon
            name={darkThemeMode ? 'sunny' : 'moon'}
            style={{
              color: theme.colors.secondaryText,
              fontSize: 24,
              backgroundColor: themeContext.colors.raisedBackground,
              padding: 6,
              borderRadius: 8,
            }}></Icon>
        </Pressable>
      </View>

      <LinearGradient
        start={{x: 0, y: 1}}
        end={{x: 1, y: 0}}
        colors={['#4776E6', '#8E54E9']}
        style={{
          justifyContent: 'space-around',
          padding: 20,
          borderRadius: 20,
          marginBottom: 20,
          height: height / 3.5,
          marginHorizontal: theme.margin.md,
        }}>
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'space-between',
            marginHorizontal: padding.default,
          }}>
          <View style={{alignItems: 'center', justifyContent: 'center'}}>
            <Text
              style={{
                color: themeContext.colors.background,
                fontFamily: 'Poppins-Medium',
                fontSize: 16,
              }}>
              Current Balance
            </Text>
            <Text
              style={{
                color: 'white',
                fontFamily: 'Poppins-SemiBold',
                fontSize: 36,
              }}>
              $14506
            </Text>
          </View>
        </View>

        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <View
              style={{
                backgroundColor: 'white',
                width: 28,
                height: 28,
                borderRadius: 100,
                justifyContent: 'center',
                alignItems: 'center',
                marginRight: 10,
              }}>
              <Icon
                name="arrow-down"
                style={{color: theme.colors.success[500], fontSize: 18}}></Icon>
            </View>
            <View>
              <Text style={{color: '#fff'}}>Income</Text>
              <Text style={{color: '#fff'}}>2500.00</Text>
            </View>
          </View>

          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <View
              style={{
                backgroundColor: 'white',
                width: 28,
                height: 28,
                borderRadius: 100,
                justifyContent: 'center',
                alignItems: 'center',
                marginRight: 10,
              }}>
              <Icon
                name="arrow-up"
                style={{color: theme.colors.danger[500], fontSize: 18}}></Icon>
            </View>
            <View>
              <Text style={{color: '#fff'}}>Expenses</Text>
              <Text style={{color: '#fff'}}>2500.00</Text>
            </View>
          </View>
        </View>
      </LinearGradient>

      <View
        style={{
          backgroundColor: themeContext.colors.raisedBackground,
          padding: 14,
          borderRadius: 20,
          marginHorizontal: theme.margin.md,
        }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-around',
            marginBottom: 14,
          }}>
          <View style={{alignItems: 'center'}}>
            <Text style={{color: theme.colors.secondaryText}}>Remaining</Text>
            <Text
              style={{
                fontFamily: 'Poppins-SemiBold',
                fontSize: 20,
                color: theme.colors.secondaryText,
              }}>
              $9022
            </Text>
          </View>
          <View style={{alignItems: 'center'}}>
            <Text style={{color: theme.colors.secondaryText}}>Budget</Text>
            <Text style={{fontFamily: 'Poppins-SemiBold', fontSize: 20}}>
              $12000
            </Text>
          </View>
          <View style={{alignItems: 'center'}}>
            <Text style={{color: theme.colors.secondaryText}}>Spent</Text>
            <Text
              style={{
                fontFamily: 'Poppins-SemiBold',
                fontSize: 20,
                color: theme.colors.secondaryText,
              }}>
              $9022
            </Text>
          </View>
        </View>
        <View>
          <View
            style={{
              height: 12,
              width: '100%',
              backgroundColor: themeContext.colors.background,
              borderRadius: 10,
              position: 'absolute',
            }}></View>
          <LinearGradient
            start={{x: 1, y: 0}}
            end={{x: 0, y: 1}}
            colors={['#4776E6', '#8E54E9']}
            style={{
              height: 12,
              width: '68%',
              borderRadius: 10,
            }}></LinearGradient>
        </View>
      </View>
      <View
        style={{
          marginTop: 30,
          marginBottom: 10,
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginHorizontal: theme.margin.md,
        }}>
        <Text
          style={{
            fontFamily: 'Poppins-Medium',
            fontSize: 20,
            color: themeContext.colors.foreground,
          }}>
          Transactions
        </Text>
        <Text
          style={{
            fontFamily: 'Poppins-Medium',
            fontSize: 16,
            color: theme.colors.secondaryText,
          }}>
          View all
        </Text>
      </View>

      {(
        <FlatList
          data={lastMonth}
          horizontal
          showsHorizontalScrollIndicator={false}
          // ListFooterComponent={<View style={{width: width / 2.5 + 8}}></View>}
          ListHeaderComponent={
          <LinearGradient start={{x: 0, y: 1}}
          end={{x: 1, y: 0}}
          colors={['#4776E6', '#8E54E9']} style={{marginLeft: themeContext.spacing.md, borderRadius: 10}}>
            <Pressable>
                <View style={{alignItems: 'center', justifyContent: 'center'}}>
                  <View
                    style={{
                      // transform: [{scale: item == 28 ? 1.15 : 1}],
                      height: 60,
                      width: 112 - themeContext.spacing.md,
                      // backgroundColor: themeContext.colors.raisedBackground,
                      justifyContent: 'center',
                      alignItems: 'center',
                      borderRadius: 8,
                      // elevation: 4,
                      // shadowColor: themeContext.colors.shadow,
                    }}>
                    <Text
                      style={{
                        textAlign: 'center',
                        fontSize: 18,
                        color: 'white'
                      }}>
                      Latest
                    </Text>
                  </View>
                </View>
              </Pressable>
          </LinearGradient>
          }
          // inverted
          snapToInterval={60}
          renderItem={({item}) =>
            item && (
              <Pressable onPress={() => filterByDay(item.date)}>
                <View style={{alignItems: 'center'}}>
                  <View
                    style={{
                      // transform: [{scale: item == 28 ? 1.15 : 1}],
                      width: 50,
                      height: 60,
                      backgroundColor: themeContext.colors.raisedBackground,
                      marginHorizontal: 10,
                      justifyContent: 'center',
                      borderRadius: 16,
                      // elevation: 4,
                      // shadowColor: themeContext.colors.shadow,
                    }}>
                      <Text
                      style={{
                        textAlign: 'center',
                        marginBottom: -6,
                        fontSize: 14,
                        color:
                          item == 28
                            ? themeContext.colors.text
                            : themeContext.colors.secondaryText,
                      }}>
                      {item.month}
                    </Text>
                    <Text
                      style={{
                        textAlign: 'center',
                        marginBottom: -6,
                        fontSize: 18,
                        color:
                          item == 28
                            ? themeContext.colors.text
                            : themeContext.colors.secondaryText,
                      }}>
                      {item.day}
                    </Text>
                  </View>
                  <View
                    style={{
                      height: 4,
                      width: 4,
                      backgroundColor:
                        item == 28 ? themeContext.colors.text : 'transparent',
                      marginTop: 12,
                      borderRadius: 4,
                    }}></View>
                </View>
              </Pressable>
            )
          }
          keyExtractor={(item, index) => index}
        />
      ) ?? null}
    </View>
  );
};

const Item = ({amount, date, category, color, type}) => {
  const themeContext = useContext(ThemeContext);
  return (
    <View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginHorizontal: 20,
          padding: 14,
          backgroundColor: themeContext.colors.raisedBackground,
          marginVertical: 8,
          borderRadius: 12,
        }}>
        <View>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <View
              style={{
                backgroundColor: color,
                height: 32,
                width: 32,
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 100,
              }}>
              <Icon name="person" style={{color: 'white', fontSize: 20}}></Icon>
            </View>
            <Text
              style={{
                marginLeft: 10,
                fontSize: 16,
                fontFamily: 'Poppins-SemiBold',
              }}>
              {category}
            </Text>
          </View>
        </View>
        <Text
          style={{
            fontFamily: 'Poppins-Medium',
            color:
              type === 'income'
                ? themeContext.colors.success
                : themeContext.colors.danger,
          }}>
          {`${type === 'income' ? '+' : '-'}$` + amount}
        </Text>
      </View>
    </View>
  );
};

const Statistics = () => {
  const [flex, setFlex] = useState(1);
  const width = useWindowDimensions().width;
  const themeContext = useContext(ThemeContext);
  const darkThemeMode = useStoreState(state => state.darkThemeMode);
  const [transactions, setTransactions] = useState([]);
  useEffect(() => {
    const getTransactions = async () => {
      try{
        const res = await TransactionService.fetch();
        // console.log(res.data);
        // for(const [key, value] in res.data)
        // console.log(res.data)
        let arr = []
        console.log(res.data)
        for(const key in res.data){
          arr.push({
            date: key,
            data: res.data[key]
          })
        }
        // console.log(arr)
        // Object.entries(res.data).map(([key, value]) => console.log(value))
        setTransactions(arr);
      }catch(err){
        console.log(err)
      }
    };
    getTransactions();
  }, []);
  const calculatePercentage = (value, total) => {
    let result = (value / total) * 100;
    return result;
  };
  const DATA = [
    {
      id: 1,
      date: 'Feb 17, 2022',
      expense: '-800',
      income: '1250',
      data: [
        {
          id: 1,
          category: 'Rental',
          description: 'I bought 20 kilos of cotton candy',
          value: '+500',
        },
        {
          id: 2,
          category: 'Grants',
          description: 'I bought 20 kilos of cotton candy',
          value: '+50',
        },
        {
          id: 3,
          category: 'Grants',
          description: 'I bought 20 kilos of cotton candy',
          value: '+50',
        },
      ],
    },
  ];

  return (
    <SafeAreaView
      style={{flex: 1, backgroundColor: themeContext.colors.background}}>
      <StatusBar
        barStyle={darkThemeMode ? 'light-content' : 'dark-content'}
        backgroundColor={themeContext.colors.background}
        animated
        showHideTransition="fade"></StatusBar>
      <View
        style={{
          flex: 1,
        }}>
        {transactions ? <SectionList
          ListHeaderComponent={<Header></Header>}
          ListFooterComponent={
            <View
              style={{
                flex: 1,
                margin: padding.default,
                borderRadius: 10,
                overflow: 'hidden',
              }}></View>
          }

          sections={transactions}
          keyExtractor={(item, index) => item.id}
          renderSectionHeader={({ section: { date } }) => (
            <Text>{new Date(date * 1000).toLocaleDateString()}</Text>
          )}
          renderItem={({item}) => (
            <Item
              date={item.created_at}
              amount={item.amount}
              category={item.category?.name}
              color={item.category?.color}
              type={item.type}></Item>
          )}
        /> : <ActivityIndicator></ActivityIndicator>}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({});

export default Statistics;
