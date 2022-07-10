import { createDrawerNavigator } from '@react-navigation/drawer';

import Home from '../screens/HomeScreen';
import NoLibraries from '../screens/NoLibrariesScreen';
import Opacity from '../screens/OpacityScreen';
import InOutCircle from '../screens/InOutCircleScreen'
import WhatsUp from '../screens/WhatsUpScreen';
import ThemeAnimation from '../screens/ThemeAnimationScreen'
import ZoomMatters from '../screens/ZoomMattersScreen'

const Drawer = createDrawerNavigator();

const Router = () => {
  return (
      <Drawer.Navigator initialRouteName="ZoomMatters">
        <Drawer.Screen name="Home" component={Home} />
        <Drawer.Screen name="Raw animation" component={NoLibraries} />
        <Drawer.Screen name="Opacity" component={Opacity} />
        <Drawer.Screen name='In/Out the Circle' component={InOutCircle} />
        <Drawer.Screen name="What's up?" component={WhatsUp} />
        <Drawer.Screen name="Theme animation" component={ThemeAnimation} />
        <Drawer.Screen name="Zoom matters(?)" component={ZoomMatters} />
      </Drawer.Navigator>
  );
}

export default Router