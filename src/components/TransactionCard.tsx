import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Text, View } from "react-native";

interface Transaction {
  id: number;
  name: string;
  amount: number;
  date: Date;
  label?: string;
}

// mappa nome → icona Ionicons
const iconMap: Record<string, keyof typeof Ionicons.glyphMap> = {
  netflix: "tv-outline",
  spotify: "musical-notes-outline",
  notion: "document-text-outline",
  youtube: "logo-youtube",
  amazon: "cart-outline",
  apple: "logo-apple",
  disney: "film-outline",
  dropbox: "cloud-outline",
  figma: "color-palette-outline",
  github: "logo-github",
  chatgpt: "chatbubble-outline",
  linkedin: "logo-linkedin",
};

function getIcon(name: string): keyof typeof Ionicons.glyphMap {
  const key = name.toLowerCase();
  return iconMap[key] ?? "card-outline"; // fallback generico
}

export default function TransactionCard({ transaction }: { transaction: Transaction }) {
  return (
    <View style={styles.container}>
      <View style={styles.iconBox}>
        <Ionicons
          name={getIcon(transaction.name)}
          size={18}
          color="rgba(255,255,255,0.6)"
        />
      </View>

      <View style={styles.middle}>
        <Text style={styles.label}>{transaction.name}</Text>
        <Text style={styles.date}>
          {transaction.date.toLocaleDateString("it-IT", {
            day: "2-digit",
            month: "short",
            year: "numeric",
          })}
        </Text>
      </View>

      <Text style={styles.amount}>
        −€{transaction.amount.toLocaleString("it-IT", { minimumFractionDigits: 2 })}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#111111",
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.06)",
    paddingVertical: 14,
    paddingHorizontal: 16,
    marginHorizontal: 20,
    marginVertical: 5,
    gap: 12,
  },
  iconBox: {
    width: 38,
    height: 38,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.05)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.08)",
  },
  middle: {
    flex: 1,
    gap: 3,
  },
  label: {
    fontFamily: "Inter_500Medium",
    fontSize: 14,
    color: "rgba(255,255,255,0.85)",
    letterSpacing: 0.1,
  },
  date: {
    fontFamily: "Inter_400Regular",
    fontSize: 11,
    color: "rgba(255,255,255,0.35)",
    letterSpacing: 0.3,
  },
  amount: {
    fontFamily: "DMMono_400Regular",
    fontSize: 15,
    letterSpacing: -0.3,
    color: "rgba(255,255,255,0.75)",
  },
});