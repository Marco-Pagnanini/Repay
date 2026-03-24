import { useEffect, useRef } from 'react';
import {
  Animated,
  StyleSheet,
  Text,
  View,
} from 'react-native';

interface CreditCardProps {
  balance: number;
  total: number;
  cardHolder?: string;
  cardNumber?: string;
  expiryDate?: string;
}

export default function CreditCard({
  balance = 0,
  total = 0,
  cardHolder = 'Marco Pagnanini',
  cardNumber = '4242 4242 4242 4242',
  expiryDate = '12/27',
}: CreditCardProps) {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(24)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 700,
        delay: 120,
        useNativeDriver: true,
      }),
      Animated.timing(translateY, {
        toValue: 0,
        duration: 700,
        delay: 120,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);


  return (
    <Animated.View
      style={[
        styles.card,
        { opacity: fadeAnim, transform: [{ translateY }] },
      ]}
    >
      {/* top row */}
      <View style={styles.topRow}>
        <Text style={styles.bankLabel}>Repay</Text>
        <View style={styles.chip}>
          <View style={styles.chipInner} />
        </View>
      </View>

      {/* balance */}
      <View style={styles.balanceBlock}>
        <Text style={styles.balanceLabel}>saldo totale</Text>
        <Text style={styles.balanceAmount}>
          €{balance.toLocaleString('it-IT', { minimumFractionDigits: 2 })}
        </Text>
      </View>

      {/* bottom row */}
      <View style={styles.bottomRow}>
        <View>
          <Text style={styles.metaLabel}>intestatario</Text>
          <Text style={styles.metaValue}>{cardHolder}</Text>
        </View>
        <View style={styles.rightMeta}>
          <Text style={styles.metaLabel}>scadenza</Text>
          <Text style={styles.metaValue}>{expiryDate}</Text>
        </View>
      </View>

      {/* card number */}
      <Text style={styles.cardNumber}>Total Amount : {total}</Text>

      {/* decorative circles */}
      <View style={styles.circle1} />
      <View style={styles.circle2} />
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: '100%',
    aspectRatio: 1.586,
    borderRadius: 20,
    backgroundColor: '#0f0f0f',
    padding: 24,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.07)',
    justifyContent: 'space-between',
  },

  // decorative background circles
  circle1: {
    position: 'absolute',
    width: 220,
    height: 220,
    borderRadius: 110,
    backgroundColor: 'rgba(255,255,255,0.03)',
    top: -60,
    right: -60,
  },
  circle2: {
    position: 'absolute',
    width: 160,
    height: 160,
    borderRadius: 80,
    backgroundColor: 'rgba(255,255,255,0.025)',
    bottom: -40,
    left: 60,
  },

  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  bankLabel: {
    fontFamily: 'Fraunces_600SemiBold',
    fontSize: 16,
    color: 'rgba(255,255,255,0.9)',
    letterSpacing: 0.5,
  },
  chip: {
    width: 34,
    height: 26,
    borderRadius: 5,
    backgroundColor: 'rgba(255,255,255,0.12)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.15)',
  },
  chipInner: {
    width: 20,
    height: 14,
    borderRadius: 3,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.25)',
  },

  balanceBlock: {
    gap: 4,
  },
  balanceLabel: {
    fontFamily: 'Inter_400Regular',
    fontSize: 11,
    color: 'rgba(255,255,255,0.4)',
    letterSpacing: 1.2,
    textTransform: 'uppercase',
  },
  balanceAmount: {
    fontFamily: 'DMMono_400Regular',
    fontSize: 32,
    color: '#ffffff',
    letterSpacing: -0.5,
  },

  bottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  rightMeta: {
    alignItems: 'flex-end',
  },
  metaLabel: {
    fontFamily: 'Inter_400Regular',
    fontSize: 10,
    color: 'rgba(255,255,255,0.35)',
    letterSpacing: 1,
    textTransform: 'uppercase',
    marginBottom: 2,
  },
  metaValue: {
    fontFamily: 'Inter_500Medium',
    fontSize: 13,
    color: 'rgba(255,255,255,0.85)',
    letterSpacing: 0.3,
  },

  cardNumber: {
    fontFamily: 'DMMono_400Regular',
    fontSize: 13,
    color: 'rgba(255,255,255,0.3)',
    letterSpacing: 2,
    marginTop: -4,
  },
});