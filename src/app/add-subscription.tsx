import { createSubscription } from '@/services/storage';
import { Ionicons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import { router } from 'expo-router';
import { useState } from 'react';
import {
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const REPEAT_OPTIONS = [
  { label: 'Settimanale', value: 'weekly' },
  { label: 'Mensile', value: 'monthly' },
  { label: 'Annuale', value: 'yearly' },
];

export default function AddSubscription() {
  const [name, setName] = useState('');
  const [amount, setAmount] = useState('');
  const [repeat, setRepeat] = useState('monthly');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSave = async () => {
    if (!name.trim()) return setError('Inserisci un nome');
    if (!amount || isNaN(parseFloat(amount))) return setError('Inserisci un importo valido');

    setLoading(true);
    setError('');
    try {
      await createSubscription({
        name: name.trim(),
        amount: parseFloat(amount),
        repeat,
      });
      router.back();
    } catch (e) {
      setError('Errore nel salvataggio');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.root}>
      <BlurView intensity={80} tint="dark" style={StyleSheet.absoluteFill} />

      <SafeAreaView style={styles.container}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.keyboard}
        >
          <ScrollView showsVerticalScrollIndicator={false}>

            {/* handle bar */}
            <View style={styles.handleBar} />

            {/* header */}
            <View style={styles.header}>
              <Text style={styles.title}>Nuovo abbonamento</Text>
              <TouchableOpacity onPress={() => router.back()} style={styles.closeButton}>
                <Ionicons name="close" size={18} color="rgba(255,255,255,0.6)" />
              </TouchableOpacity>
            </View>

            {/* form */}
            <View style={styles.form}>

              <View style={styles.field}>
                <Text style={styles.label}>Nome servizio</Text>
                <TextInput
                  style={styles.input}
                  placeholder="es. Notion, Spotify..."
                  placeholderTextColor="rgba(255,255,255,0.2)"
                  value={name}
                  onChangeText={setName}
                  autoCapitalize="words"
                />
              </View>

              <View style={styles.field}>
                <Text style={styles.label}>Importo (€)</Text>
                <TextInput
                  style={styles.input}
                  placeholder="0.00"
                  placeholderTextColor="rgba(255,255,255,0.2)"
                  value={amount}
                  onChangeText={setAmount}
                  keyboardType="decimal-pad"
                />
              </View>

              <View style={styles.field}>
                <Text style={styles.label}>Frequenza</Text>
                <View style={styles.repeatRow}>
                  {REPEAT_OPTIONS.map((opt) => (
                    <TouchableOpacity
                      key={opt.value}
                      style={[
                        styles.repeatOption,
                        repeat === opt.value && styles.repeatOptionActive,
                      ]}
                      onPress={() => setRepeat(opt.value)}
                    >
                      <Text
                        style={[
                          styles.repeatLabel,
                          repeat === opt.value && styles.repeatLabelActive,
                        ]}
                      >
                        {opt.label}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>

              {error ? <Text style={styles.error}>{error}</Text> : null}

            </View>

            {/* save button */}
            <TouchableOpacity
              style={[styles.saveButton, loading && styles.saveButtonDisabled]}
              onPress={handleSave}
              disabled={loading}
            >
              <Text style={styles.saveLabel}>
                {loading ? 'Salvataggio...' : 'Aggiungi abbonamento'}
              </Text>
            </TouchableOpacity>

          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#0a0a0a',
  },
  container: {
    flex: 1,
  },
  keyboard: {
    flex: 1,
  },
  handleBar: {
    width: 36,
    height: 4,
    borderRadius: 2,
    backgroundColor: 'rgba(255,255,255,0.15)',
    alignSelf: 'center',
    marginTop: 12,
    marginBottom: 8,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginTop: 12,
    marginBottom: 28,
  },
  title: {
    fontFamily: 'Fraunces_600SemiBold',
    fontSize: 22,
    color: 'rgba(255,255,255,0.9)',
  },
  closeButton: {
    width: 32,
    height: 32,
    borderRadius: 10,
    backgroundColor: 'rgba(255,255,255,0.07)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  form: {
    paddingHorizontal: 20,
    gap: 22,
  },
  field: {
    gap: 8,
  },
  label: {
    fontFamily: 'Inter_400Regular',
    fontSize: 11,
    color: 'rgba(255,255,255,0.4)',
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
  input: {
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 16,
    fontFamily: 'Inter_400Regular',
    fontSize: 15,
    color: '#ffffff',
  },
  repeatRow: {
    flexDirection: 'row',
    gap: 8,
  },
  repeatOption: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 10,
    backgroundColor: 'rgba(255,255,255,0.04)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.07)',
    alignItems: 'center',
  },
  repeatOptionActive: {
    backgroundColor: 'rgba(99,102,241,0.2)',
    borderColor: 'rgba(99,102,241,0.5)',
  },
  repeatLabel: {
    fontFamily: 'Inter_400Regular',
    fontSize: 13,
    color: 'rgba(255,255,255,0.4)',
  },
  repeatLabelActive: {
    fontFamily: 'Inter_500Medium',
    color: 'rgba(255,255,255,0.9)',
  },
  error: {
    fontFamily: 'Inter_400Regular',
    fontSize: 12,
    color: '#f87171',
    marginTop: -8,
  },
  saveButton: {
    marginHorizontal: 20,
    marginTop: 32,
    marginBottom: 16,
    backgroundColor: '#6366f1',
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: 'center',
  },
  saveButtonDisabled: {
    opacity: 0.5,
  },
  saveLabel: {
    fontFamily: 'Inter_500Medium',
    fontSize: 15,
    color: '#ffffff',
    letterSpacing: 0.2,
  },
});