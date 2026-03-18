import { createDrawerNavigator } from '@react-navigation/drawer';
import { BottomTabs } from './tabs-layout/bottom-tabs';
import { CustomDrawerContent } from './tabs-layout/custom-drawer-content';

const Drawer = createDrawerNavigator();

export function TabsLayoutScreen() {
  return (
    <Drawer.Navigator screenOptions={{ headerShown: false }} drawerContent={() => <CustomDrawerContent />}>
      <Drawer.Screen name="Main" component={BottomTabs} />
    </Drawer.Navigator>
  );
}
