import * as React from 'react';
import {Button, Text, TextInput, View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Provider as PaperProvider} from 'react-native-paper';
import HomeScreen from './screens/home';
import CollectScreen from './screens/collect';
import HeatMapScreen from './screens/heatmap';
import LoginScreen from './screens/login';
import PlantingFormScreen from './screens/planting/form';
import RegisterScreen from './screens/register';
import UserToken from './service/sqlite/user_token';
import ApiService from "./service";
import PlantingListScreen from "./screens/planting/list";
import DataTableComponent from "./components/data-table";

const AuthContext = React.createContext();
const Tab = createBottomTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator
    // screenOptions={({ route }) => ({
    //   tabBarIcon: ({ focused, color, size }) => {
    //     let iconName;
    //
    //     if (route.name === 'Home') {
    //       iconName = focused
    //         ? 'ios-information-circle'
    //         : 'ios-information-circle-outline';
    //     } else if (route.name === 'Settings') {
    //       iconName = focused ? 'ios-list-box' : 'ios-list';
    //     }
    //
    //     // You can return any component that you like here!
    //     return <Ionicons name={iconName} size={size} color={color} />;
    //   },
    // })}
    // tabBarOptions={{
    //   activeTintColor: 'tomato',
    //   inactiveTintColor: 'gray',
    // }}
    >
      <Tab.Screen name="Home" component={MainScreen} />
      <Tab.Screen name="Collect" component={CollectScreen} />
      <Tab.Screen name="HeatMap" component={HeatMapScreen} />
    </Tab.Navigator>
  );
}

function SplashScreen() {
  return (
    <View>
      <Text>Loading...</Text>
    </View>
  );
}

function MainScreen(props) {
  const {signOut} = React.useContext(AuthContext);

  return <HomeScreen signOut={signOut} {...props}/>;
}

function SignInScreen({navigation}) {
  const {signIn} = React.useContext(AuthContext);
  return <LoginScreen signIn={signIn} navigation={navigation} />;
}
function Register({navigation}) {
  const {signIn} = React.useContext(AuthContext);
  return <RegisterScreen signIn={signIn} navigation={navigation} />;
}

const Stack = createStackNavigator();

export default function App({navigation}) {
  const [state, dispatch] = React.useReducer(
    (prevState, action) => {
      switch (action.type) {
        case 'RESTORE_TOKEN':
          return {
            ...prevState,
            userToken: action.token,
            isLoading: false,
          };
        case 'SIGN_IN':
          return {
            ...prevState,
            isSignout: false,
            userToken: action.token,
          };
        case 'SIGN_OUT':
          return {
            ...prevState,
            isSignout: true,
            userToken: null,
          };
      }
    },
    {
      isLoading: true,
      isSignout: false,
      userToken: null,
    },
  );

  React.useEffect(() => {
    const bootstrapAsync = async () => {
      try{
        let userToken = await UserToken.find( 1 );
        if(userToken?.id)
          dispatch({type: 'RESTORE_TOKEN', token: userToken?.token});
      }catch (e) {
        dispatch({type: 'RESTORE_TOKEN'});
      }

    };

    bootstrapAsync();
  }, []);

  const authContext = React.useMemo(
    () => ({
      signIn: async (data) => {
        try{
          let token = await ApiService.Post('token', data);
          console.log('toekn result', token)
          if(token.status == 200){
            let store = {
              token: token.data.access,
              refresh: token.data.refresh,
              username: data.username
            }
            let userToken;
            try {
              userToken = await UserToken.find( 1 );
            }catch (e) {
              userToken = await  UserToken.create(store);
            }
            if(userToken)
              UserToken.update(1, store)
            // else
            //   UserToken.create(store)
            dispatch({type: 'SIGN_IN', token: token.data.access});
          }
          else if(token.status == 401){
            return {status: 401}
          }
        }catch (e) {
          console.log(e)
        }

      },
      signOut: () => dispatch({type: 'SIGN_OUT'}),
      signUp: async (data) => {
        dispatch({type: 'SIGN_IN', token: 'dummy-auth-token'});
      },
    }),
    [],
  );

  return (
    <PaperProvider>
      <AuthContext.Provider value={authContext}>
        <NavigationContainer>
          <Stack.Navigator>
            {state.isLoading ? (
              // We haven't finished checking for the token yet
              <Stack.Screen name="Splash" component={SplashScreen} />
            ) : state.userToken == null ? (
              <>
                <Stack.Screen
                  name="SignIn"
                  component={SignInScreen}
                  options={{
                    headerShown: false,
                    title: 'Sign in',
                    animationTypeForReplace: state.isSignout ? 'pop' : 'push',
                  }}
                />
                <Stack.Screen
                  name="Register"
                  component={Register}
                  options={{
                    // headerShown: false,
                    title: 'Cadastre-se',
                  }}
                />
              </>
            ) : (
              <>
                <Stack.Screen
                    name="MAIN"
                    component={MyTabs}
                    options={{headerShown: false}}
                />
                <Stack.Screen
                    name="PlantingForm"
                    component={PlantingFormScreen}
                    // options={{headerShown: false}}
                />
                <Stack.Screen
                    name="Planting"
                    component={PlantingListScreen}
                    // options={{headerShown: false}}
                />
              </>
            )}
          </Stack.Navigator>
        </NavigationContainer>
      </AuthContext.Provider>
    </PaperProvider>
  );
}
