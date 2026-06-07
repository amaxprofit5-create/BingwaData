import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { useWindowDimensions } from 'react-native';
import AppNavigator from './index';

const Drawer = createDrawerNavigator();

export default function Layout() {
  const { width } = useWindowDimensions();
  const isTablet = width > 768;

  return (
    <NavigationContainer>
      <Drawer.Navigator
        screenOptions={{
          headerShown: false,
          drawerType: isTablet ? 'permanent' : 'front',
          drawerWidth: 260,
        }}
      >
        <Drawer.Screen
          name="home"
          component={AppNavigator}
          options={{
            drawerLabel: 'Home',
          }}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
