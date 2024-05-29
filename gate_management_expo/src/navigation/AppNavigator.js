import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomePage from '../components/HomePage';
import GateManagement from '../components/GateManagement';
import GuardAssignment from '../components/GuardAssignment';
import AddGateForm from '../screens/AddGateForm';
import EditGateForm from '../screens/EditGateForm';
import AssignGuardForm from '../screens/AssignGuardForm';
import GateList from '../screens/GateList';
import GuardAssignmentList from '../screens/GuardAssignmentList';
import EditGuardAssignment from '../screens/EditGuardAssignment';

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomePage} />
        <Stack.Screen name="GateManagement" component={GateManagement} />
        <Stack.Screen name="GuardAssignment" component={GuardAssignment} />
        <Stack.Screen name="AddGateForm" component={AddGateForm} />
        <Stack.Screen name="EditGateForm" component={EditGateForm} />
        <Stack.Screen name="AssignGuardForm" component={AssignGuardForm} />
        <Stack.Screen name="GateList" component={GateList} />
        <Stack.Screen name="GuardAssignmentList" component={GuardAssignmentList} />
        <Stack.Screen name="EditGuardAssignment" component={EditGuardAssignment} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
