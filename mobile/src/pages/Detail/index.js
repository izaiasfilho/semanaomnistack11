import React from 'react';
import { Feather } from '@expo/vector-icons';
import { Linking, View, Text, Image, TouchableOpacity } from 'react-native';
import styles from './styles';
import logoImg from '../../assets/logo.png';
import { useNavigation, useRoute } from '@react-navigation/native';
import * as MailComposer from 'expo-mail-composer';

export default function Detail() {
    const navigation = useNavigation();
    const route = useRoute();

    const incident = route.params.incident;

    const mensagem = `Ola ${incident.nome},estou entrando encontato para ajudar no caso "${incident.titlo}" com o valor ${incident.valor}`;

    function navigateBack() {
        navigation.goBack()
    }

    function sendMail() {
        MailComposer.composeAsync({
            subject: `Herói do caso: ${incident.titlo}`,
            recipients: [incident.email],
            body: mensagem,
        })
    }

    function sendWatsApp() {
        Linking.openURL(`Whatsapp://send?phone=${incident.watzap}text=${mensagem}`);

    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Image source={logoImg} />

                <TouchableOpacity onPress={navigateBack}>
                    <Feather name="arrow-left" size={28} color='#E82041' />
                </TouchableOpacity>
            </View>

            <View style={styles.incident}>
                <Text style={[styles.incidentProperty, {margin : 0}]}>ONG</Text>
    <Text style={styles.incidentValue}>{incident.nome} de {incident.cidade}</Text>

                <Text style={styles.incidentProperty}>CASO</Text>
                <Text style={styles.incidentValue}>{incident.titlo}</Text>

                <Text style={styles.incidentProperty}>VALOR</Text>
                <Text style={styles.incidentValue}>{Intl.NumberFormat('pt-BR', {
                    style: 'currency', currency: 'BRL'
                }).format(incident.valor)}</Text>
            </View>

            <View style={styles.contactBox}>
                <Text style={styles.heroTitle}>Salve o dia</Text>
                <Text style={styles.heroTitle}>Seja o Heroi desse caso</Text>

                <Text style={styles.heroDescription}>Entre em contato</Text>

                <View style={styles.actions}>
                    <TouchableOpacity style={styles.action} onPress={sendWatsApp}>
                        <Text style={styles.actionText}>WhatsApp</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.action} onPress={sendMail}>
                        <Text style={styles.actionText}>E-mail</Text>
                    </TouchableOpacity>
                </View>
            </View>

        </View>
    );
}