import { View, Animated } from 'react-native';
import React, {useRef, useEffect} from 'react';
import {Feather} from '@expo/vector-icons'
import { PlatformPressable } from '@react-navigation/elements';
import {BottomTabBarProps} from '@react-navigation/bottom-tabs'
import { colors } from '../../styles/globalStyle';
import {styles} from './TabBar.style';

export function MyTabBar({ state, descriptors, navigation } : BottomTabBarProps) {
  
  const icon = {
    index: (props: any) => <Feather name='clipboard' size={24} color={colors.thirdColor} {...props}/>,
    create: (props: any) => <Feather name='user-plus' size={24} color={colors.thirdColor} {...props}/>,
    read: (props: any) => <Feather name='user-check' size={24} color={colors.thirdColor} {...props}/>,
    update: (props: any) => <Feather name='users' size={24} color={colors.thirdColor} {...props}/>,
    delete: (props: any) => <Feather name='user-minus' size={24} color={colors.thirdColor} {...props}/>,
  }

  return (
    <View style={styles.tabBar}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
              ? options.title
              : route.name;

        const isFocused = state.index === index;


        const Animation = useRef(new Animated.Value(isFocused ? 1 : 0)).current

        useEffect(() => {
          Animated.timing(Animation, {
            toValue: isFocused ? 1 : 0,
            duration: 140, 
            useNativeDriver: true,
          }).start()
        }, [isFocused, Animation])


        const animatedBackground = Animation.interpolate({
          inputRange: [-1, 0],
          outputRange: ['white', colors.backgroundColor]
        })
        
        const animatedScale = Animation.interpolate({
          inputRange: [0, 1],
          outputRange: [1.20, 1.30]
        })

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        return (
          <PlatformPressable
            key={route.key}
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarButtonTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={[styles.item, {borderRadius: 10,
                                  padding: 5,
            }]}
          >
            <Animated.View style={[ 
              
              { transform: [{scale: animatedScale}], 
                backgroundColor: animatedBackground,
                borderRadius: 10,
                padding: 5}
          
            ]}>
              {icon[route.name] ({
                color: isFocused ? colors.primaryColor : colors.thirdColor,
                size: isFocused ? 30 : 24, 
              })}
            </Animated.View>
          </PlatformPressable>
        );
      })}
    </View>
  );
}