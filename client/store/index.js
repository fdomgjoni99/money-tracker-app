import { action, createStore, persist } from "easy-peasy";
import AsyncStorage from "@react-native-async-storage/async-storage";

const store = createStore(
    persist({
        darkThemeMode: false,
        toggleThemeMode: action((state) => {
            state.darkThemeMode = !state.darkThemeMode
        }),
        user: {},
        login: action((state, payload) => {
            state.user.token = payload
        })
    }, {
        storage: {
          getItem: async key => {
            const data = await AsyncStorage.getItem(key);
            return JSON.parse(data)
          },
          setItem: async(key, value) => {
            const data = await AsyncStorage.setItem(key, JSON.stringify(value));
          },
          removeItem: key => {
            console.log("REMOVE_ITEM", key);
          }
        }
      })
);

store.subscribe(() => console.log(store.getState()))

export default store;