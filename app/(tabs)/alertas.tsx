import { View, Text, StyleSheet, TouchableOpacity, Image, FlatList, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useState, useEffect, useCallback } from 'react';
import { supabase } from '../../lib/supabase';
import { useFocusEffect } from '@react-navigation/native';

export default function AlertasScreen() {
    const router = useRouter();
    const [reports, setReports] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchReports = async () => {
        setLoading(true);
        const { data, error } = await supabase
            .from('reports')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) {
            console.error('Error fetching reports:', error);
            alert('Hubo un error al cargar las alertas.');
        } else {
            setReports(data);
        }
        setLoading(false);
    };

    const updateReportStatus = async (reportId, newStatus) => {
        const { error } = await supabase
            .from('reports')
            .update({ status: newStatus })
            .eq('id', reportId);

        if (error) {
            console.error('Error updating report status:', error);
            alert('Hubo un error al actualizar el estado del reporte.');
        } else {
            fetchReports(); // Refresh the list to show the updated status
        }
    };

    useFocusEffect(
        useCallback(() => {
            fetchReports();
        }, [])
    );

    const renderReport = ({ item }) => (
        <View style={styles.alertCard}>
            <Text style={styles.alertType}>{item.report_type}</Text>
            <Text style={styles.alertAddress}>{`Lat: ${item.latitude.toFixed(3)}, Lon: ${item.longitude.toFixed(3)}`}</Text>
            <View style={styles.alertDetails}>
                <Text style={styles.alertTimestamp}>Reportado a las {new Date(item.created_at).toLocaleTimeString()}</Text>
                <Text style={styles.alertDescription}>{item.description}</Text>
                <Text style={[styles.reportStatus, getStatusStyle(item.status)]}>Estado: {item.status}</Text>
            </View>
            {item.media_url && (
                <Image source={{ uri: item.media_url }} style={styles.reportImage} />
            )}

            <View style={styles.statusButtonGroup}>
                <TouchableOpacity
                    style={[styles.statusButton, { backgroundColor: '#2196F3' }]}
                    onPress={() => updateReportStatus(item.id, 'En camino')}
                >
                    <Text style={styles.statusButtonText}>En camino</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.statusButton, { backgroundColor: '#FF9800' }]}
                    onPress={() => updateReportStatus(item.id, 'En sitio')}
                >
                    <Text style={styles.statusButtonText}>En sitio</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.statusButton, { backgroundColor: '#4CAF50' }]}
                    onPress={() => updateReportStatus(item.id, 'Resuelto')}
                >
                    <Text style={styles.statusButtonText}>Resuelto</Text>
                </TouchableOpacity>
            </View>
        </View>
    );

    const getStatusStyle = (status) => {
        switch (status) {
            case 'En espera':
                return { color: '#FFA000' }; // Orange
            case 'En camino':
                return { color: '#2196F3' }; // Blue
            case 'En sitio':
                return { color: '#FF9800' }; // Amber
            case 'Resuelto':
                return { color: '#4CAF50' }; // Green
            default:
                return { color: '#FFFFFF' }; // White
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar style="light" />
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Alertas</Text>
            </View>
            <View style={styles.mainContent}>
                {loading ? (
                    <ActivityIndicator style={styles.loader} size="large" color="#ffffff" />
                ) : (
                    <FlatList
                        data={reports}
                        renderItem={renderReport}
                        keyExtractor={(item) => item.id.toString()}
                        contentContainerStyle={styles.listContent}
                        ListEmptyComponent={<Text style={styles.emptyText}>No hay alertas para mostrar.</Text>}
                    />
                )}
            </View>
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
        justifyContent: 'center', // Center the title
        backgroundColor: '#1A237E',
        padding: 16,
    },
    headerTitle: {
        color: '#ffffff',
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    mainContent: {
        flex: 1,
    },
    loader: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    listContent: {
        padding: 16,
        paddingBottom: 24, // Adjusted for tab bar
    },
    alertCard: {
        backgroundColor: 'rgba(26, 35, 126, 0.4)',
        borderRadius: 16,
        padding: 16,
        marginBottom: 16,
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
    reportStatus: {
        fontSize: 16,
        fontWeight: 'bold',
        marginTop: 8,
    },
    reportImage: {
        width: '100%',
        height: 200,
        borderRadius: 8,
        marginTop: 16,
    },
    statusButtonGroup: {
        flexDirection: 'row',
        marginTop: 16,
        justifyContent: 'space-between',
        gap: 10,
    },
    statusButton: {
        flex: 1,
        paddingVertical: 10,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
    },
    statusButtonText: {
        color: '#ffffff',
        fontSize: 14,
        fontWeight: 'bold',
    },
    emptyText: {
        color: '#92a4c9',
        textAlign: 'center',
        marginTop: 40,
        fontSize: 16,
    }
});
