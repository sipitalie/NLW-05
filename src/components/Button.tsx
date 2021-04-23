import React from 'react';
import { Text, StyleSheet, TouchableOpacity, TouchableOpacityProps } from 'react-native';

import colors from "../styles/colors"
import fonts from '../styles/fonts';

interface ButtonProps extends TouchableOpacityProps {
    title: string;

}


export function Button({ title, ...rest }: ButtonProps) {
    return (
        <TouchableOpacity
            style={styles.button}
            activeOpacity={0.7}
            {...rest}
        >
            <Text style={styles.buttonText}> {title} </Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    button: {
        height: 56,
        backgroundColor: colors.green,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 16,
        marginBottom: 10,

    },
    buttonText: {
        color: colors.white,
        fontSize: 16,
        fontFamily: fonts.heading
    }
});