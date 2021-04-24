import React, { useEffect, useState } from 'react';
import {
    SafeAreaView,
    View,
    Text,
    StyleSheet,
    ScrollView,
    Platform,
    TouchableOpacity,
    Alert,
    Image
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/core';
import { getBottomSpace } from 'react-native-iphone-x-helper';
import { SvgFromUri } from 'react-native-svg';
import DataTimePiker, { Event } from '@react-native-community/datetimepicker';
import { format, isBefore } from 'date-fns';

import { PlantProps, savePlant } from '../libs/Storage';
import waterdrop from '../assets/waterdrop.png';
import { Button } from '../components/Button';
import colors from '../styles/colors';
import fonts from '../styles/fonts';



interface Params {
    plant: PlantProps
}
export function PlantSave() {
    const [selectedDateTime, setSelectedDateTime] = useState(new Date());
    const [showDatePicker, setShowDatePicker] = useState(Platform.OS == 'ios');
    const route = useRoute();
    const navegation = useNavigation();
    const { plant } = route.params as Params

    function hanleChangetime(event: Event, dateTime: Date | undefined) {

        if (Platform.OS === 'android') {
            setShowDatePicker(oldState => !oldState);
        }
        if (dateTime && isBefore(dateTime, new Date())) {
            setSelectedDateTime(new Date());
            return Alert.alert('Escolha uma hora no futuro! ⏰')
        }
        if (dateTime)
            setSelectedDateTime(dateTime)
    }
    function handleOpendatetimePickerForAndroide() {
        setShowDatePicker(oldState => !oldState);

    }
    async function handleSave() {

        try {
            await savePlant({
                ...plant,
                dataTimeNotication: selectedDateTime
            });
            navegation.navigate('Confirmation', {
                title: 'Tudo certo!',
                subtitle: 'Fique tranquilo que sempre vamos lembrar você de cuidar de suas plantas.',
                buttonTitle: 'Muito obrigado :D',
                icon: 'hug',
                nextScreen: 'MyPlants'

            });

        } catch {
            Alert.alert('não foi possível salvar. 😭')
        }



    }
    return (
        <View style={styles.container}>
            <View style={styles.plantInfo}>
                <SvgFromUri
                    uri={plant.photo}
                    height={150}
                    width={150}
                />
                <Text style={styles.plantName}>
                    {plant.name}
                </Text>
                <Text style={styles.plantAbaut}>
                    {plant.about}
                </Text>
            </View>
            <View style={styles.controller}>
                <View style={styles.tipContainer}>
                    <Image
                        source={waterdrop}
                        style={styles.tipImage}
                    />
                    <Text style={styles.tipText}>
                        {plant.water_tips}
                    </Text>

                </View>
                <Text style={styles.alertLabel}>
                    Escolha o melhor horário para ser lembrado:
                </Text>
                {showDatePicker &&
                    <DataTimePiker
                        value={selectedDateTime}
                        mode='time'
                        display='spinner'
                        onChange={hanleChangetime}
                    />
                }
                {
                    Platform.OS === 'android' && (
                        <TouchableOpacity
                            style={styles.dataTimePickerButton}
                            onPress={handleOpendatetimePickerForAndroide}
                        >
                            <Text style={styles.dataTimePickerText}>
                                {`Mudar ${format(selectedDateTime, 'HH:mm')}`} Mudar horário
                            </Text>

                        </TouchableOpacity>
                    )
                }

                <Button
                    title='Cadastrar planta'
                    onPress={handleSave}
                />

            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between',
        backgroundColor: colors.shape,
    },
    plantInfo: {
        flex: 1,
        paddingHorizontal: 30,
        paddingVertical: 50,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.shape


    },
    plantName: {
        fontSize: 24,
        fontFamily: fonts.heading,
        textAlign: 'center',
        color: colors.heading,
        marginTop: 15,

    },
    plantAbaut: {
        fontSize: 17,
        fontFamily: fonts.text,
        textAlign: 'center',
        color: colors.heading,
        marginTop: 10,

    },
    controller: {
        backgroundColor: colors.white,
        paddingHorizontal: 20,
        paddingTop: 20,
        paddingBottom: getBottomSpace() || 20,

    },
    tipContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: colors.blue_light,
        padding: 20,
        borderRadius: 20,
        position: 'relative',
        bottom: 60
    },
    tipImage: {
        width: 56,
        height: 56,
    },
    tipText: {
        flex: 1,
        marginLeft: 20,
        fontFamily: fonts.text,
        color: colors.blue,
        fontSize: 17,
        textAlign: 'justify'

    },
    alertLabel: {
        textAlign: 'center',
        fontFamily: fonts.conplement,
        color: colors.heading,
        fontSize: 12,
        marginBottom: 5,
    },
    dataTimePickerButton: {
        width: '100%',
        alignItems: 'center',
        paddingVertical: 40,

    },
    dataTimePickerText: {
        fontSize: 24,
        fontFamily: fonts.heading,
        color: colors.heading,

    }
})