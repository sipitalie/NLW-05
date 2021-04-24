
import React, { useState } from 'react';
import {
    StyleSheet,
    SafeAreaView,
    View,
    Text,
    TextInput,
    KeyboardAvoidingView,
    TouchableWithoutFeedback,
    Platform,
    Keyboard,
    Alert
} from 'react-native';
import { useNavigation } from '@react-navigation/core';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Button } from '../components/Button';

import colors from "../styles/colors"
import fonts from '../styles/fonts';

export function UserIdentification() {
    const navegation = useNavigation();
    const [isFocused, setIsFocused] = useState(false);
    const [isFilled, setIsFilled] = useState(false);
    const [name, setName] = useState<string>();

    function handleInputBlur() {
        //função para setar um valor se o input  não estiver activado  
        setIsFocused(false);
        setIsFilled(!!name);
    }

    function hendleInputFocus() {
        //função para setar um valor se o input estiver activado
        setIsFocused(true);
    }
    function handleInputChange(value: string) {
        setIsFilled(!!value);
        setName(value);
    }

    async function handleSubmit() {

        if (!name)
            return Alert.alert('Me diz como chamar você 🤔');
        try {
            await AsyncStorage.setItem('@plantmanager:user', name);
            navegation.navigate('Confirmation', {
                title: 'Pronto!',
                subtitle: `Agora vamos começar a cuidar das suas\nplantinhas com muito cuidado.`,
                buttonTitle: 'comecar',
                icon: 'smile',
                nextScreen: 'Plantselect'

            });
        } catch {
            Alert.alert('não foi possível salvar o seu nome. 😭')

        }

    }

    return (

        <SafeAreaView style={styles.container}>
            <KeyboardAvoidingView
                style={styles.content}
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            >
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <View style={styles.content}>
                        <View style={styles.form}>
                            <View style={styles.header}>
                                <Text style={styles.emoji}>
                                    {isFilled ? '🙂' : '🙁'}
                                </Text>
                                <Text style={styles.text}>
                                    Como podemos {'\n'}
                            chamar você?
                        </Text>
                            </View>
                            <TextInput
                                style={[
                                    styles.textInput,
                                    (isFocused || isFilled) &&
                                    { borderColor: colors.green }
                                ]}
                                placeholder="Digite um nome"
                                onBlur={handleInputBlur}
                                onFocus={hendleInputFocus}
                                onChangeText={handleInputChange}
                            />
                            <View style={styles.footer}>
                                <Button
                                    title="Confirmar"
                                    onPress={handleSubmit}
                                />
                            </View>
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>

        </SafeAreaView >
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'space-around',

    },
    content: {
        flex: 1,
        width: '100%',

    },
    form: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 54
    },
    header: {
        alignItems: 'center',

    },
    emoji: {
        fontSize: 44,

    },
    text: {
        width: '100%',
        fontSize: 24,
        lineHeight: 32,
        textAlign: 'center',
        fontFamily: fonts.heading,
        color: colors.heading,
        marginTop: 20

    },
    textInput: {
        borderBottomWidth: 1,
        borderColor: colors.gray,
        width: '100%',
        fontSize: 18,
        marginTop: 50,
        padding: 10,
        textAlign: 'center'
    },
    footer: {
        marginTop: 40,
        width: '100%',
        paddingHorizontal: 20,

    }

});