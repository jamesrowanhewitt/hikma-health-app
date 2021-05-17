import React, { useState, useEffect } from 'react';
import {
    View, Text, TextInput, ScrollView, Button
} from 'react-native';

import { database } from "../storage/Database";
import styles from './Style';
import LinearGradient from 'react-native-linear-gradient';
import { LocalizedStrings } from '../enums/LocalizedStrings';
import { MedicineType } from './Medicine';

const EditMedicine = (props) => {
    const event = props.navigation.getParam('event');
    const language = props.navigation.getParam('language', 'en')
    const userName = props.navigation.getParam('userName');

    const [medication, setMedication] = useState(null);
    const [type, setType] = useState(null);
    const [dosage, setDosage] = useState(null);
    const [days, setDays] = useState(null);

    useEffect(() => {
        if (!!event.event_metadata) {
            const metadataObj = JSON.parse(event.event_metadata)
            setMedication(metadataObj.medication)
            setType(metadataObj.type)
            setDosage(metadataObj.dosage)
            setDays(metadataObj.days)
        }
    }, [props])

    const submit = async () => {
        database.editEvent(
            event.id,
            JSON.stringify({
                doctor: userName,
                medication,
                type,
                dosage,
                days,
            })
        ).then((response) => props.navigation.navigate('EventList', { events: response, language }))
    };

    return (
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <LinearGradient colors={['#31BBF3', '#4D7FFF']} style={styles.containerLeft}>
            <View style={[styles.inputsContainer, { alignItems: 'flex-start' }]}>

                <View style={{ flexDirection: 'row', justifyContent: 'center', alignSelf: 'stretch', }}>
                    <Text style={[styles.text, { fontSize: 16, fontWeight: 'bold' }]}>{LocalizedStrings[language].medicine}</Text>
                </View>
                <View style={[styles.responseRow, { paddingBottom: 0 }]}>
                    <Text style={{ color: '#FFFFFF' }}>{LocalizedStrings[language].medication}</Text>
                </View>
                <View style={[styles.responseRow, { padding: 0 }]}>
                    <TextInput
                        style={styles.inputs}
                        onChangeText={(text) => setMedication(text)}
                        value={medication}
                    />
                </View>
                {MedicineType(type, setType, language)}
                <View style={[styles.responseRow, { paddingVertical: 0 }]}>
                    <Text style={{ color: '#FFFFFF' }}>{LocalizedStrings[language].dosage}</Text>
                </View>
                <View style={[styles.responseRow, { padding: 0 }]}>
                    <TextInput
                        style={styles.inputs}
                        onChangeText={(text) => setDosage(text)}
                        value={dosage}
                    />
                </View>
                <View style={[styles.responseRow, { paddingVertical: 0 }]}>
                    <Text style={{ color: '#FFFFFF' }}>{LocalizedStrings[language].days}</Text>
                </View>
                <View style={[styles.responseRow, { padding: 0 }]}>
                    <TextInput
                        style={styles.inputs}
                        onChangeText={(text) => setDays(text)}
                        value={days}
                        keyboardType='numeric'
                    />
                </View>
            </View>
            <View style={{ alignItems: 'center' }}>
                <Button
                    title={LocalizedStrings[language].save}
                    color={'#F77824'}
                    onPress={() => submit()} />
            </View>
        </LinearGradient>
    </ScrollView>
    );
};

export default EditMedicine;