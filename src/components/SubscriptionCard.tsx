import { Subscription } from "@/types/Subscription";
import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Text, View } from "react-native";

const iconMap: Record<string, keyof typeof Ionicons.glyphMap> = {
  notion: "document-text-outline",
  spotify: "musical-notes-outline",
  netflix: "tv-outline",
  youtube: "logo-youtube",
  amazon: "cart-outline",
  apple: "logo-apple",
  disney: "film-outline",
  dropbox: "cloud-outline",
  figma: "color-palette-outline",
  github: "logo-github",
  chatgpt: "chatbubble-outline",
  claude: "sparkles-outline",
  linkedin: "logo-linkedin",
};

function getIcon(name: string): keyof typeof Ionicons.glyphMap {
  return iconMap[name.toLowerCase()] ?? "card-outline";
}

function formatRepeat(repeat: string): string {
  switch (repeat.toLowerCase()) {
    case "monthly": return "/ mese";
    case "yearly": return "/ anno";
    case "weekly": return "/ sett.";
    default: return `/ ${repeat}`;
  }
}

export default function SubscriptionCard({ subscription }: { subscription: Subscription }) {
  return (
    <View style={styles.card}>
      <View style={styles.iconBox}>
        <Ionicons
          name={getIcon(subscription.name)}
          size={22}
          color="rgba(255,255,255,0.75)"
        />
      </View>

      <Text style={styles.name} numberOfLines={1}>
        {subscription.name}
      </Text>

      <Text style={styles.amount}>
        €{subscription.amount.toLocaleString("it-IT", { minimumFractionDigits: 2 })}
      </Text>

      <Text style={styles.repeat}>
        {formatRepeat(subscription.repeat)}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: 130,
    backgroundColor: "#111111",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.06)",
    paddingVertical: 18,
    paddingHorizontal: 12,
    alignItems: "center",
    gap: 6,
  },
  iconBox: {
    width: 46,
    height: 46,
    borderRadius: 14,
    backgroundColor: "rgba(255,255,255,0.05)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.08)",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 4,
  },
  name: {
    fontFamily: "Inter_500Medium",
    fontSize: 13,
    color: "rgba(255,255,255,0.85)",
    letterSpacing: 0.1,
    textAlign: "center",
  },
  amount: {
    fontFamily: "DMMono_400Regular",
    fontSize: 15,
    color: "#ffffff",
    letterSpacing: -0.3,
  },
  repeat: {
    fontFamily: "Inter_400Regular",
    fontSize: 11,
    color: "rgba(255,255,255,0.35)",
    letterSpacing: 0.3,
  },
});