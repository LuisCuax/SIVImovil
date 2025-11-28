import { View, Text, StyleSheet, TouchableOpacity, ImageBackground, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import * as ImagePicker from 'expo-image-picker';

export default function AlertasScreen() {
    const router = useRouter();
    const [image, setImage] = useState(null);

    const takePhoto = async () => {
        const { status } = await ImagePicker.requestCameraPermissionsAsync();
        if (status !== 'granted') {
            alert('Sorry, we need camera permissions to make this work!');
            return;
        }

        let result = await ImagePicker.launchCameraAsync({
            quality: 1,
        });

        if (!result.canceled) {
            setImage(result.assets[0].uri);
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar style="light" />
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
                    <MaterialIcons name="arrow-back" size={24} color="#fff" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Ronda Activa</Text>
                <View style={styles.headerStatus}>
                    <Text style={styles.headerStatusText}>En Ronda Activa</Text>
                </View>
            </View>
            <View style={styles.mainContent}>
                <View style={styles.mapContainer}>
                    {image ? (
                        <Image source={{ uri: image }} style={styles.map} />
                    ) : (
                        <ImageBackground
                            source={{ uri: 'https://firebasestorage.googleapis.com/v0/b/app-chat-video-call.appspot.com/o/map-dark.png?alt=media&token=8e27a92c-8b20-4df2-9b2f-7b027054ac42' }}
                            style={styles.map}
                        />
                    )}
                </View>

                <View style={styles.alertCard}>
                    <Text style={styles.alertType}>Alarma de Intrusión</Text>
                    <Text style={styles.alertAddress}>Calle Falsa 123, Colonia Centro</Text>
                    <View style={styles.alertDetails}>
                        <Text style={styles.alertTimestamp}>Reportado a las 02:15 AM</Text>
                        <Text style={styles.alertDescription}>Posible intruso detectado en el perímetro norte. Proceder con cautela.</Text>
                    </View>
                </View>

                <View style={styles.buttonGroup}>
                    <TouchableOpacity style={[styles.actionButton, { backgroundColor: '#2196F3' }]}>
                        <Text style={styles.actionButtonText}>En Camino</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.actionButton, { backgroundColor: '#FF9800' }]}>
                        <Text style={styles.actionButtonText}>En Sitio</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.actionButton, { backgroundColor: '#4CAF50' }]}>
                        <Text style={styles.actionButtonText}>Resuelto</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <TouchableOpacity style={styles.fab} onPress={takePhoto}>
                <MaterialIcons name="photo-camera" size={30} color="#ffffff" />
            </TouchableOpacity>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#101622',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#1A237E',
        padding: 16,
    },
    backButton: {
        position: 'absolute',
        left: 16,
        top: 16,
        zIndex: 1,
        padding: 5
    },
    headerTitle: {
        color: '#ffffff',
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
        flex: 1,
        marginLeft: 40
    },
    headerStatus: {
        backgroundColor: '#4CAF50',
        borderRadius: 999,
        paddingHorizontal: 16,
        paddingVertical: 8,
    },
    headerStatusText: {
        color: '#ffffff',
        fontSize: 14,
        fontWeight: '500',
    },
    mainContent: {
        flex: 1,
    },
    mapContainer: {
        flex: 1,
        paddingHorizontal: 16,
        paddingVertical: 12,
    },
    map: {
        flex: 1,
        borderRadius: 16,
        overflow: 'hidden',
        minHeight: 256,
    },
    alertCard: {
        backgroundColor: 'rgba(26, 35, 126, 0.4)',
        borderRadius: 16,
        padding: 16,
        marginHorizontal: 16,
    },
    alertType: {
        color: '#92a4c9',
        fontSize: 14,
    },
    alertAddress: {
        color: '#ffffff',
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 4,
    },
    alertDetails: {
        marginTop: 8,
        gap: 4,
    },
    alertTimestamp: {
        color: '#92a4c9',
        fontSize: 16,
    },
    alertDescription: {
        color: '#92a4c9',
        fontSize: 16,
    },
    buttonGroup: {
        flexDirection: 'row',
        gap: 12,
        padding: 16,
        paddingBottom: 80, // FAB space
    },
    actionButton: {
        flex: 1,
        height: 56,
        borderRadius: 999,
        alignItems: 'center',
        justifyContent: 'center',
    },
    actionButtonText: {
        color: '#ffffff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    fab: {
        position: 'absolute',
        bottom: 100,
        right: 16,
        width: 64,
        height: 64,
        borderRadius: 32,
        backgroundColor: '#0f49bd',
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 8, // for Android shadow
        shadowColor: '#000', // for iOS shadow
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
    },
});
