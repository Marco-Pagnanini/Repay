import { DMMono_400Regular } from "@expo-google-fonts/dm-mono";
import { Fraunces_600SemiBold } from "@expo-google-fonts/fraunces";
import { Inter_400Regular, Inter_500Medium } from "@expo-google-fonts/inter";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";

export default function RootLayout() {

  const [loaded] = useFonts({
    'Inter_400Regular': Inter_400Regular,
    'Inter_500Medium': Inter_500Medium,
    'Fraunces_600SemiBold': Fraunces_600SemiBold,
    'DMMono_400Regular': DMMono_400Regular,
  });

  if (!loaded) return null;
  
  return <Stack>
    <Stack.Screen name="index" options={{ headerShown: false, title: "Home" }} />
  </Stack>;
}
