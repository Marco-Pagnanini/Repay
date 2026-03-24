// _layout.tsx
import { runMigrations } from "@/db/migrations";
import { DMMono_400Regular } from "@expo-google-fonts/dm-mono";
import { Fraunces_600SemiBold } from "@expo-google-fonts/fraunces";
import { Inter_400Regular, Inter_500Medium } from "@expo-google-fonts/inter";
import { useFonts } from "expo-font";
import { Tabs } from "expo-router";
import { SQLiteProvider } from "expo-sqlite";
import { Suspense, useEffect, useState } from "react";
import { ActivityIndicator } from "react-native";

export default function RootLayout() {
  const [ready, setReady] = useState<boolean>(false);

  useEffect(() => {
    runMigrations().then(() => setReady(true));
  }, []);

  const [loaded] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Fraunces_600SemiBold,
    DMMono_400Regular,
  });

  if (!loaded || !ready) return null;

  return (
    <Suspense fallback={<ActivityIndicator />}>
      <SQLiteProvider databaseName="repay.db" useSuspense>
        <Tabs>
          <Tabs.Screen name="index" options={{ 
            title: 'Home',
            headerShown: false,
            
           }} />
           <Tabs.Screen name="subscriptions" options={{
            title: 'Subscriptions',
            headerShown:false,
           }} />
        </Tabs>
      </SQLiteProvider>
    </Suspense>
  );
}