import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Profile from "../screens/Profile";
import Account from "../screens/Account";
import Fund from "../screens/Fund";
import Transctions from "../screens/Transctions";
import Transfer from "../screens/Transfer";
import { MaterialCommunityIcons, FontAwesome } from "@expo/vector-icons";

const Tab = createBottomTabNavigator();

export default () => {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons color={color} size={size} name="account" />
          ),
          tabBarLabelStyle: { fontSize: 13 },
        }}
        name="Profile"
        component={Profile}
      />
      <Tab.Screen
        options={{
          tabBarIcon: ({ size, color }) => (
            <FontAwesome size={size} color={color} name="dollar" />
          ),
          tabBarLabelStyle: { fontSize: 13 },
        }}
        name="Fund"
        component={Fund}
      />
      <Tab.Screen
        options={{
          tabBarIcon: ({ color, size }) => (
            <FontAwesome size={size} color={color} name="credit-card" />
          ),
          tabBarLabelStyle: { fontSize: 13 },
        }}
        name="Account"
        component={Account}
      />
      <Tab.Screen
        options={{
          tabBarIcon: ({ size, color }) => (
            <FontAwesome color={color} size={size} name="history" />
          ),
          tabBarLabelStyle: { fontSize: 13 },
          headerShown: true,
        }}
        name="Transctions"
        component={Transctions}
      />
      <Tab.Screen
        options={{
          tabBarIcon: ({ color, size }) => (
            <FontAwesome color={color} size={size} name="paper-plane" />
          ),
          tabBarLabelStyle: { fontSize: 13 },
        }}
        name="Transfer"
        component={Transfer}
      />
    </Tab.Navigator>
  );
};
