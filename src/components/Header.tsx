import React, { useEffect, useState } from 'react';
import {
    SafeAreaView,
    View,
    Text,
    Image,
    StyleSheet
} from 'react-native';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { Button } from '../components/Button';
import colors from '../styles/colors';
import ImageUser from '../assets/cloud.png';
import fonts from '../styles/fonts';


export function Header() {
    const [userName, setUserName] = useState<string>();
    useEffect(() => {
        async function loadStoragetUserName() {
            const user = await AsyncStorage.getItem('@plantmanager:user')
            setUserName(user || '')
        }
        loadStoragetUserName()


    }, [])
    return (
        <View style={styles.container}>
            <View>
                <Text style={styles.greeting}>Olá,</Text>
                <Text style={styles.UserName}>{userName}</Text>
            </View>
            <Image style={styles.img} source={ImageUser} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 20,
        marginTop: getStatusBarHeight(),

    },
    greeting: {
        fontSize: 32,
        color: colors.heading,
        fontFamily: fonts.text

    },
    UserName: {
        fontSize: 32,
        color: colors.heading,
        fontFamily: fonts.heading

    },
    img: {
        width: 70,
        height: 70,
        borderRadius: 35,

    }
})