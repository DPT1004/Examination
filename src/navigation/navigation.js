import React from 'react';
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Button, Text, View } from 'react-native';

const Stack = createNativeStackNavigator();

function HomeScreen() {
    const navigation = useNavigation()
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>Home Screen</Text>
            <Button
                title="Go to User"
                onPress={() => navigation.navigate('user')}
            />
        </View>
    );
}

function UserScreen() {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>User Screen</Text>
        </View>
    );
}

const MainNavigation = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator >
                <Stack.Screen
                    name="home"
                    component={HomeScreen}
                />
                <Stack.Screen
                    name="user"
                    component={UserScreen}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default MainNavigation;