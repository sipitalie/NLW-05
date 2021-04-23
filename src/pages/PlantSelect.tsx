import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    FlatList

} from 'react-native';


import { Header } from '../components/Header';
import { EnviromentButtom } from '../components/EnviromentButton';
import { PlantCardPrimary } from '../components/PlantCardPrimary';
import colors from '../styles/colors';
import fonts from '../styles/fonts';
import api from '../services/api';

interface EnviromentsProps {
    key: string;
    title: string;

}
interface PlantsProps {
    id: string;
    name: string;
    about: string;
    water_tips: string;
    photo: string;
    environments: [string];
    frequency: {
        times: number;
        repeat_every: string;
    }

}
export function Plantselect() {
    const [enviroment, setEnviroment] = useState<EnviromentsProps[]>();
    const [plants, setPlants] = useState<PlantsProps[]>();

    useEffect(() => {
        async function fetchEnviroment() {
            const { data } = await api
                .get('plants_environments?_sort=title&_order=asc');
            setEnviroment([
                {
                    key: 'all',
                    title: 'Todos',
                },
                ...data
            ]);
        }
        fetchEnviroment();
    }, [])
    useEffect(() => {
        async function fetchPlants() {
            const { data } = await api
                .get('plants?_sort=name&_order=asc');
            setPlants(data);
        }
        fetchPlants();
    }, [])
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Header />
                <Text style={styles.title}>
                    Em qual ambiente
                </Text>
                <Text style={styles.subtitle}>
                    você quer colocar sua planta
                </Text>
            </View>
            <View>
                <FlatList
                    data={enviroment}
                    renderItem={({ item }) => (
                        <EnviromentButtom
                            title={item.title}
                            active
                        />
                    )}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.enviromentsList}
                />

            </View>
            <View style={styles.plants}>
                <FlatList
                    data={plants}
                    renderItem={({ item }) => (
                        <PlantCardPrimary
                            data={item}
                        />
                    )}
                    showsVerticalScrollIndicator={false}
                    numColumns={2}
                />
            </View>
        </View>

    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,

    },
    header: {
        paddingHorizontal: 30

    },
    title: {
        fontSize: 17,
        fontFamily: fonts.heading,
        lineHeight: 20,
        color: colors.heading,
        marginTop: 15,
    },
    subtitle: {
        fontSize: 17,
        fontFamily: fonts.text,
        lineHeight: 20,
        color: colors.heading,
    }
    ,
    enviromentsList: {
        height: 50,
        paddingBottom: 5,
        justifyContent: 'center',
        marginLeft: 32,
        marginVertical: 32,

    },
    plants: {
        flex: 1,
        paddingHorizontal: 32,
        justifyContent: 'center'

    },
})