import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from './components/Homescreen'; 

const Stack = createStackNavigator();

/**
 * The App component serves as the root of the application, setting up the navigation container
 * and managing the stack navigator. It includes the HomeScreen component as the main screen of 
 * the application, with the header hidden by default.
 * 
 * This enables extensibility and scalability for future features or screens, as well as
 * smooth navigation between screens.
 */
export default function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen 
                    name="Home" 
                    component={HomeScreen} 
                    options={{ headerShown: false }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
}