import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { RectButton, RectButtonProps } from 'react-native-gesture-handler';
import { SvgFromUri } from 'react-native-svg'
import colors from '../styles/colors';
import fonts from '../styles/fonts';

interface PlantProps extends RectButtonProps {
    data: {
        name: string,
        photo: string,
        hour: string;
    }
}
export const PlantCardSecundary = ({ data, ...rest }: PlantProps) => {
    return (
        <RectButton
            style={styles.container}
            {...rest}
        >
            <SvgFromUri
                uri={data.photo}
                width={50}
                height={50}

            />

            <Text style={styles.title}>
                {data.name}
            </Text>
            <View style={styles.detail}>
                <Text style={styles.timeLabel}>
                    Regar às
                </Text>
                <Text style={styles.time}>
                    {data.hour}
                </Text>

            </View>
        </RectButton>
    )
}

const styles = StyleSheet.create({
    container: {
        maxWidth: '100%',
        alignItems: 'center',
        flexDirection: 'row',
        borderRadius: 20,
        paddingVertical: 5,
        paddingHorizontal: 10,
        backgroundColor: colors.shape,
        marginVertical: 5,
    },
    title: {
        flex: 1,
        marginLeft: 10,
        fontSize: 17,
        fontFamily: fonts.heading,

    },
    detail: {
        alignItems: 'flex-end',

    },
    timeLabel: {
        marginTop: 5,
        fontSize: 16,
        fontFamily: fonts.text,
        color: colors.body_light,

    },
    time: {
        marginTop: 5,
        fontSize: 16,
        fontFamily: fonts.heading,
        color: colors.body_dark,

    }

})