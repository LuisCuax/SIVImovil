import { View, Text, StyleSheet, Image, ActivityIndicator } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

import RondinForm from './RondinForm';
import RondinList from './RondinList';

export default function HomeHeader({ userName, activeRound, remainingTime, pendingAlertsCount, loadingAlerts }) {
    return (
        <View>
            {/* Header */}
            <View style={styles.header}>
                <View style={styles.profilePicContainer}>
                    <Image
                        style={styles.profilePic}
                        source={{ uri: "https://lh3.googleusercontent.com/aida-public/AB6AXuCEv_Kqaz6dr9QDmDlD1FxqRBsg8Q6Kd_2zVkvF7u-x0bvlYYymYjziEc5VZjaDVAscWZeXhrxfT_mc226IcqIjk31JGbwNKdVH4kXuLODEZde9asLkSoaK6IelCxVIYHP0xxbqw6cpKdPy1n3h7GOhQ-UPqXN79aQiJtakKCxsPwvyXvNSTGuPe5ytQIMfmBO955lSFDHTcSrqgI4oNJJW_aBO2W76u4iR8s_U1_8LDnx28DOqQLQDI-DZP9PE3ZvoKYtfGVoLPHmp" }}
                    />
                </View>
                <Text style={styles.headerTitle}>Bienvenido, {userName}</Text>
            </View>

            <View style={styles.metricsGrid}>
                {/* Time Remaining Card */}
                {activeRound && (
                    <View style={styles.metricCard}>
                        <View>
                            <Text style={styles.metricLabel}>Tiempo Restante de Ronda</Text>
                            <Text style={styles.metricValue}>{remainingTime}</Text>
                        </View>
                        <View style={styles.metricIconWrapper}>
                            <View style={[styles.metricIconContainer, { backgroundColor: 'rgba(19, 124, 236, 0.2)' }]}>
                                <MaterialIcons name="hourglass-top" size={28} color="#137cec" />
                            </View>
                        </View>
                    </View>
                )}

                {/* Pending Alerts Card */}
                <View style={styles.metricCard}>
                    <View>
                        <Text style={styles.metricLabel}>Alertas Pendientes</Text>
                        {loadingAlerts ? (
                            <ActivityIndicator size="small" color="#ffc107" />
                        ) : (
                            <Text style={[styles.metricValue, { color: '#ffc107' }]}>{pendingAlertsCount}</Text>
                        )}
                    </View>
                    <View style={styles.metricIconWrapper}>
                        <View style={[styles.metricIconContainer, { backgroundColor: 'rgba(255, 193, 7, 0.2)' }]}>
                            <MaterialIcons name="warning" size={28} color="#ffc107" />
                        </View>
                    </View>
                </View>
            </View>
            <View style={styles.content}>
                <RondinForm />
                <RondinList />
            </View>
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#101922',
    },
    scrollContent: {
        paddingBottom: 24,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
    },
    profilePicContainer: {
        width: 48,
        height: 48,
        justifyContent: 'center',
    },
    profilePic: {
        width: 40,
        height: 40,
        borderRadius: 20,
    },
    headerTitle: {
        flex: 1,
        color: '#ffffff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    metricsGrid: {
        paddingHorizontal: 16,
        gap: 16,
        marginBottom: 16,
    },
    metricCard: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: '#192633',
        borderRadius: 16,
        padding: 16,
        alignItems: 'center',
    },
    metricLabel: {
        color: '#92acc9',
        fontSize: 14,
        marginBottom: 4,
    },
    metricValue: {
        color: '#ffffff',
        fontSize: 36,
        fontWeight: 'bold',
    },
    metricIconWrapper: {
        alignItems: 'flex-end',
    },
    metricIconContainer: {
        width: 48,
        height: 48,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
    },
    content: {
        paddingHorizontal: 16,
    },
});