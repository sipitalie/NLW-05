
import React from 'react';
import {
    SafeAreaView,
    View,
    Text,
    StyleSheet
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/core';

import { Button } from '../components/Button';

import colors from "../styles/colors"
import fonts from '../styles/fonts';

interface Params {
    title: string;
    subtitle: string;
    buttonTitle: string;
    icon: 'smile' | 'hug';
    nextScreen: string;

}
const emojis = {
    smile: '😉',
    hug: '🤗'

}
export function Confirmation() {
    const navegation = useNavigation();
    const routes = useRoute();

    const {
        title,
        buttonTitle,
        subtitle,
        icon,
        nextScreen
    } = routes.params as Params;
    function handleMoveOn() {
        navegation.navigate(nextScreen);

    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.content}>
                <Text style={styles.emoji}>
                    {emojis[icon]}
                </Text>
                <Text style={styles.title}>
                    {title}
                </Text>
                <Text style={styles.subtitle}>
                    {subtitle}
                </Text>
                <View style={styles.footer}>
                    <Button title={buttonTitle} onPress={handleMoveOn} />
                </View>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-around',
    },
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        padding: 30

    },
    emoji: {
        fontSize: 78,
    },
    title: {
        fontSize: 22,
        fontFamily: fonts.heading,
        lineHeight: 38,
        textAlign: 'center',
        color: colors.heading,
        marginTop: 15
    },
    subtitle: {
        fontSize: 17,
        paddingVertical: 10,
        textAlign: 'center',
        fontFamily: fonts.text,
        color: colors.heading,
    },
    footer: {
        width: '100%',
        paddingHorizontal: 50,
        marginTop: 20

    }
})