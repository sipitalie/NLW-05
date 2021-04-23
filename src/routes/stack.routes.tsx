import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';


import { Welcome } from '../pages/welcome'
import { UserIdentification } from '../pages/Useridentitication'
import { Confirmation } from '../pages/Confirmaton';
import { Plantselect } from '../pages/PlantSelect';


import colors from "../styles/colors";

const stackRoutes = createStackNavigator();
const AppRoutes: React.FC = () => (
    <stackRoutes.Navigator
        headerMode='none'
        screenOptions={{
            cardStyle: {
                backgroundColor: colors.white
            }
        }}>
        <stackRoutes.Screen
            name='Welcome'
            component={Welcome}

        />
        <stackRoutes.Screen
            name='UserIdentification'
            component={UserIdentification}

        />
        <stackRoutes.Screen
            name='Confirmation'
            component={Confirmation}

        />
        <stackRoutes.Screen
            name='Plantselect'
            component={Plantselect}

        />



    </stackRoutes.Navigator>
)

export default AppRoutes;