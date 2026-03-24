// _layout.tsx
import { Tabs } from "expo-router";

export default function TabsLayout() {


  return (


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


  );
}