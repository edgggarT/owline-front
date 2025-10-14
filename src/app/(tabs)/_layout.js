
import {createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import {createStackNavigator} from "@react-navigation/stack"

import {UserMenu} from "../../components/UserMenu/UserMenu";
import { styles } from "../../styles/tabs.style";
import { MyTabBar } from "../../components/TabBar/TabBar";

import Index from './index'
import Create from "./create";
import Read from './read'
import Update from "./update";
import Delete from "./delete";

const Tab = createBottomTabNavigator()
const Stack = createStackNavigator()

const SlideFadeTransition = ({ current, layouts }) => {
  const width = layouts.screen.width;
  return {
    cardStyle: {
      transform: [
        {
          translateX: current.progress.interpolate({
            inputRange: [0, 1],
            outputRange: [width, 0],
          }),
        },
      ],
      opacity: current.progress,
    },
  };
};

const fadeTransition = {
    cardStyleInterpolator: ({ current }) => ({
        cardStyle: {
            opacity: current.progress,
        },
    }),
};


function IndexScreenTab() {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
                cardStyleInterpolator: SlideFadeTransition,
            }}>
            <Stack.Screen 
                name="IndexMain" 
                component={Index} 
                options={{ 
                    title: 'Documentacion',
                    headerShown: true,
                    headerTitle: 'Registros (Logs)',
                    headerTitleAlign: "left",
                    headerTitleStyle: styles.headText,
                    headerStyle: styles.header,
                    headerRight: () => <UserMenu />,
                }}
            />
        </Stack.Navigator>
    );
}
function CreateScreenTab() {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false, cardStyleInterpolator: SlideFadeTransition, }}>
            <Stack.Screen 
                name="CreateMain" 
                component={Create}
                options={{ 
                    title: 'Crear cliente',
                    headerShown: true,
                    headerTitle: 'Crear cliente',
                    headerTitleAlign: "left",
                    headerTitleStyle: styles.headText,
                    headerStyle: styles.header,
                }}
            />
        </Stack.Navigator>
    );
}
function ReadScreenTab() {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false, cardStyleInterpolator: SlideFadeTransition, }}>
            <Stack.Screen 
                name="ReadMain" 
                component={Read}
                options={{ 
                    title: 'Obtener cliente',
                    headerShown: true,
                    headerTitle: 'Obtener cliente',
                    headerTitleAlign: "left",
                    headerTitleStyle: styles.headText,
                    headerStyle: styles.header,
                }}
            />
        </Stack.Navigator>
    );
}
function UpdateScreenTab() {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false, cardStyleInterpolator: SlideFadeTransition, }}>
            <Stack.Screen 
                name="UpdateMain" 
                component={Update}
                options={{ 
                    title: 'Actualizar cliente',
                    headerShown: true,
                    headerTitle: 'Actualizar cliente',
                    headerTitleAlign: "left",
                    headerTitleStyle: styles.headText,
                    headerStyle: styles.header,
                }}
            />
        </Stack.Navigator>
    );
}
function DeleteScreenTab() {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false, cardStyleInterpolator: SlideFadeTransition, }}>
            <Stack.Screen 
                name="DeleteMain" 
                component={Delete}
                options={{ 
                    title: 'Eliminar cliente',
                    headerShown: true,
                    headerTitle: 'Eliminar cliente',
                    headerTitleAlign: "left",
                    headerTitleStyle: styles.headText,
                    headerStyle: styles.header,
                }}
            />
        </Stack.Navigator>
    );
}


export default function TabLayout() {

    return (
        <Tab.Navigator tabBar={props => <MyTabBar {...props}/>}>
            <Tab.Screen name='create'
                        component={CreateScreenTab}
                        options={{ title: 'Crear',
                                    tabBarShowLabel: false,
                                    headerShown: false
                        }}/>
            <Tab.Screen name='read'
                        component={ReadScreenTab}
                        options={{ title: 'Obtener',
                                    tabBarShowLabel: false,
                                    headerShown: false
                        }}/>
            <Tab.Screen name='index'
                        component={IndexScreenTab}
                        options={{ title: 'Inicio',
                                    tabBarShowLabel: false,
                                    headerShown: false
                        }}/>
            <Tab.Screen name='update'
                        component={UpdateScreenTab}
                        options={{ title: 'Actualizar',
                                    tabBarShowLabel: false,
                                    headerShown: false
                        }}/>
            <Tab.Screen name='delete'
                        component={DeleteScreenTab}
                        options={{ title: 'Eliminar',
                                    tabBarShowLabel: false,
                                    headerShown: false
                        }}/>
        </Tab.Navigator>
    )
}