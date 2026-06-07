import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from './index';

const Tab = createBottomTabNavigator();

export default function Layout() {
  return (
    <NavigationContainer>
      <AppNavigator />
    </NavigationContainer>
  );
}
