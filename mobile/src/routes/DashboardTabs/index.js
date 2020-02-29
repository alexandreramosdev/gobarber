import React from 'react';
import PropTypes from 'prop-types';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialIcons } from '@expo/vector-icons';

import NewStack from './NewStack';

import DashboardScreen from '~/screens/Dashboard';
import ProfileScreen from '~/screens/Profile';

const Tabs = createBottomTabNavigator();

const tabBarOptions = {
  keyboardHidesTabBar: true,
  activeTintColor: '#fff',
  inactiveTintColor: 'rgba(255,255,255,0.6)',
  style: { backgroundColor: '#663399', borderTopWidth: 0 },
};

const TabBarIcon = ({ color }, name) => (
  <MaterialIcons name={name} size={20} color={color} />
);

TabBarIcon.propTypes = {
  color: PropTypes.string.isRequired,
};

export default function DashboardTabs() {
  return (
    <Tabs.Navigator tabBarOptions={tabBarOptions} initialRouteName="Dashboard">
      <Tabs.Screen
        name="Dashboard"
        component={DashboardScreen}
        options={{
          tabBarLabel: 'Agendamento',
          tabBarIcon: props => TabBarIcon(props, 'event'),
        }}
      />

      <Tabs.Screen
        name="appointment"
        component={NewStack}
        options={{
          unmountOnBlur: true,
          tabBarVisible: false,
          tabBarLabel: 'Agendar',
          tabBarIcon: props => TabBarIcon(props, 'add-circle-outline'),
        }}
      />

      <Tabs.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarLabel: 'Meu perfil',
          tabBarIcon: props => TabBarIcon(props, 'person'),
        }}
      />
    </Tabs.Navigator>
  );
}
