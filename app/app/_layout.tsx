import "@/global.css";
import {GluestackUIProvider} from "@/components/ui/gluestack-ui-provider";
import {useFonts} from 'expo-font';
import {Redirect, Stack} from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import {StatusBar} from 'expo-status-bar';
import {useEffect} from 'react';
import 'react-native-reanimated';
import '../firebaseConfig';
import {AuthProvider, useAuth} from "@/providers/auth.provider";


// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
    const {user} = useAuth();

    if (user) {
        return <Redirect href="/"/>
    }

    const [loaded] = useFonts({
        SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    });

    useEffect(() => {
        if (loaded) {
            SplashScreen.hideAsync();
        }
    }, [loaded]);

    if (!loaded) {
        return null;
    }

    return (
        <GluestackUIProvider mode="light">
            <AuthProvider>
                <Stack>
                    <Stack.Screen name="sign-in" options={{headerShown: false}}/>
                    <Stack.Screen name="sign-up" options={{headerShown: false}}/>
                    <Stack.Screen name="+not-found" options={{headerShown: false}}/>
                    <Stack.Screen name="(app)" options={{headerShown: false}}/>
                </Stack>
                <StatusBar style="auto"/>
            </AuthProvider>
        </GluestackUIProvider>
    );
}
