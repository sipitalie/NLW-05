import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    FlatList,

} from 'react-native'

import { Header } from '../components/Header';
import colors from '../styles/colors';
import waterdrop from '../assets/waterdrop.png';
import { formatDistance } from 'date-fns';
import { pt } from 'date-fns/locale';

import { loadPlant, PlantProps } from '../libs/Storage';
import fonts from '../styles/fonts';
import { PlantCardSecundary } from '../components/PlantCardSecundary';

export function MyPlants() {
    const [myPlants, setMyPlants] = useState<PlantProps[]>([]);
    const [loading, setLoading] = useState(true);
    const [nextWaterd, SetNextWaterd] = useState<String>();
    useEffect(() => {
        async function loadStoragedata() {
            const plantsStoraged = await loadPlant();
            const nextTime = formatDistance(
                new Date(plantsStoraged[0].dataTimeNotication).getTime(),
                new Date().getTime(),
                { locale: pt }
            );
            SetNextWaterd(
                `não esqueça de regar a ${plantsStoraged[0].name} daqui à ${nextTime} horas`
            )
            setMyPlants(plantsStoraged);

        }
        loadStoragedata();
    }, [])
    return (
        <View style={styles.container}>
            <Header />
            <View style={styles.spotligth}>
                <Image
                    style={styles.spotligthImg}
                    source={waterdrop}
                />
                <Text style={styles.spotligthText}>
                    {nextWaterd}
                </Text>
            </View>
            <View style={styles.plants}>
                <Text style={styles.plantsTitle}>
                    Próximas regadas
                    </Text>
                <FlatList
                    data={myPlants}
                    keyExtractor={(item) => String(item.id)}
                    renderItem={({ item }) => (
                        <PlantCardSecundary data={item} />

                    )}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ flex: 1, }}
                />


            </View>

        </View>
    )

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 30,
        paddingTop: 30,
        backgroundColor: colors.background,
    },
    spotligth: {
        backgroundColor: colors.blue_light,
        paddingHorizontal: 20,
        borderRadius: 20,
        height: 110,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',


    },
    spotligthImg: {
        width: 60,
        height: 60
    },
    spotligthText: {
        flex: 1,
        color: colors.blue,
        paddingHorizontal: 20,
        //textAlign: 'justify'

    },
    plants: {
        flex: 1,
        width: '100%'
    }
    ,
    plantsTitle: {
        fontSize: 24,
        fontFamily: fonts.heading,
    }

})