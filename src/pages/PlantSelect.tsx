import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    ActivityIndicator,
} from 'react-native';
import { useNavigation } from '@react-navigation/core';


import { Header } from '../components/Header';
import { EnviromentButtom } from '../components/EnviromentButton';
import { PlantCardPrimary } from '../components/PlantCardPrimary';
import { Load } from '../components/Load';

import colors from '../styles/colors';
import fonts from '../styles/fonts';
import api from '../services/api';
import { PlantProps } from '../libs/Storage';

interface EnviromentsProps {
    key: string;
    title: string;

}

export function Plantselect() {

    const [enviroment, setEnviroment] = useState<EnviromentsProps[]>([]);
    const [plants, setPlants] = useState<PlantProps[]>([]);
    const [filteredPlants, setFilteredPlants] = useState<PlantProps[]>([]);
    const [enviromentSelected, setEnviromentSelected] = useState('all');
    const [loanding, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [loadingMore, setloadingMore] = useState(true);
    const navegation = useNavigation();


    async function fetchPlants() {
        const { data } = await api
            .get(`plants?_sort=name&_order=asc&_page=${page}&_limit=8`);

        if (!data)
            return setLoading(true);

        if (page > 1) {
            setPlants(oldvalue => [...oldvalue, ...data])
            setFilteredPlants(oldvalue => [...oldvalue, ...data])
        } else {
            setPlants(data);
            setFilteredPlants(data);

        }
        setLoading(false);
        setloadingMore(false);
    }


    function handleEnviromentSelected(enviroment: string) {
        setEnviromentSelected(enviroment);

        if (enviroment == 'all')
            return setFilteredPlants(plants);
        const filtered = plants.filter(plant =>
            plant.environments.includes(enviroment)
        )
        setFilteredPlants(filtered);


    }
    function handleFatchMore(distance: number) {
        //função para carregar +dados da api por meio de page
        if (distance < 1)
            return;
        setloadingMore(true);
        setPage(oldValue => oldValue + 1);
        fetchPlants()
    }
    function handlePlantSelect(plant: PlantProps) {
        navegation.navigate('PlantSave', { plant })

    }
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
        fetchPlants();
    }, [])

    if (loanding)
        return <Load />
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
                    keyExtractor={(item) => String(item.key)}
                    renderItem={({ item }) => (
                        <EnviromentButtom
                            title={item.title}
                            active={item.key === enviromentSelected}
                            onPress={() => handleEnviromentSelected(item.key)}
                        />
                    )}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.enviromentsList}
                />

            </View>
            <View style={styles.plants}>
                <FlatList
                    data={filteredPlants}
                    keyExtractor={(item) => String(item.id)}
                    renderItem={({ item }) => (
                        <PlantCardPrimary
                            data={item}
                            onPress={() => handlePlantSelect(item)}
                        />
                    )}
                    showsVerticalScrollIndicator={false}
                    numColumns={2}
                    onEndReachedThreshold={0.1}
                    onEndReached={({ distanceFromEnd }) =>
                        handleFatchMore(distanceFromEnd)
                    }
                    ListFooterComponent={
                        loadingMore
                            ? <ActivityIndicator color={colors.green} />
                            : <></>
                    }
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