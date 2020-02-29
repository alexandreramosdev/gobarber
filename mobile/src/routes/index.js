import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { useSelector } from 'react-redux';

import AuthStack from './AuthStack';
import DashboardTabs from './DashboardTabs';

export default function Routes() {
  const signed = useSelector(state => state.auth.signed);

  return (
    <NavigationContainer>
      {signed ? <DashboardTabs /> : <AuthStack />}
    </NavigationContainer>
  );
}
