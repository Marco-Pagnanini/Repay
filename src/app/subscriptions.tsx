import SubscriptionCard from '@/components/SubscriptionCard'
import { loadSubcriptions } from '@/services/storage'
import { Subscription } from '@/types/Subscription'
import { Ionicons } from '@expo/vector-icons'
import { BlurView } from 'expo-blur'
import React, { useEffect, useState } from 'react'
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

const Subscriptions = () => {
    const [subscriptions, setSubscriptions] = useState<Subscription[]>([])

    useEffect(() => {
        loadSubcriptions().then(setSubscriptions)
    }, [])

    return (
        <View style={styles.root}>
            <View style={[styles.blob, styles.blob1]} />
            <View style={[styles.blob, styles.blob2]} />
            <BlurView intensity={80} tint="dark" style={StyleSheet.absoluteFill} />

            <SafeAreaView style={styles.container}>

                <View style={styles.header}>
                    <Text style={styles.title}>Abbonamenti</Text>
                    <TouchableOpacity style={styles.addButton}>
                        <Ionicons name="add" size={20} color="rgba(255,255,255,0.9)" />
                    </TouchableOpacity>
                </View>

                <Text style={styles.count}>
                    {subscriptions.length} attivi
                </Text>

                <FlatList
                    data={subscriptions}
                    keyExtractor={(item) => item.id}
                    numColumns={2}
                    renderItem={({ item }) => (
                        <View style={styles.cardWrapper}>
                            <SubscriptionCard subscription={item} />
                        </View>
                    )}
                    contentContainerStyle={styles.list}
                    showsVerticalScrollIndicator={false}
                    ListEmptyComponent={
                        <View style={styles.empty}>
                            <Ionicons name="card-outline" size={40} color="rgba(255,255,255,0.15)" />
                            <Text style={styles.emptyText}>Nessun abbonamento</Text>
                            <Text style={styles.emptySubtext}>Aggiungi il tuo primo abbonamento</Text>
                        </View>
                    }
                />
            </SafeAreaView>
        </View>
    )
}

export default Subscriptions

const styles = StyleSheet.create({
    root: {
        flex: 1,
        backgroundColor: '#080808',
    },
    blob: {
        position: 'absolute',
        borderRadius: 999,
        opacity: 0.3,
    },
    blob1: {
        width: 280,
        height: 280,
        backgroundColor: '#6366f1',
        top: -60,
        right: -60,
    },
    blob2: {
        width: 220,
        height: 220,
        backgroundColor: '#8b5cf6',
        bottom: 100,
        left: -40,
    },
    container: {
        flex: 1,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        marginTop: 10,
    },
    title: {
        fontFamily: 'Fraunces_600SemiBold',
        fontSize: 26,
        color: 'rgba(255,255,255,0.9)',
    },
    addButton: {
        width: 36,
        height: 36,
        borderRadius: 10,
        backgroundColor: 'rgba(255,255,255,0.07)',
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.1)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    count: {
        fontFamily: 'Inter_400Regular',
        fontSize: 12,
        color: 'rgba(255,255,255,0.35)',
        letterSpacing: 0.8,
        textTransform: 'uppercase',
        paddingHorizontal: 20,
        marginTop: 6,
        marginBottom: 16,
    },
    list: {
        paddingHorizontal: 16,
        paddingBottom: 40,
        gap: 10,
    },
    cardWrapper: {
        flex: 1,
        margin: 4,
        alignItems:"center"
    },
    empty: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 80,
        gap: 10,
    },
    emptyText: {
        fontFamily: 'Inter_500Medium',
        fontSize: 15,
        color: 'rgba(255,255,255,0.4)',
    },
    emptySubtext: {
        fontFamily: 'Inter_400Regular',
        fontSize: 12,
        color: 'rgba(255,255,255,0.2)',
    },
})