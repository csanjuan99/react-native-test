import {Redirect, Stack} from 'expo-router';
import {useAuth} from "@/providers/auth.provider";


export default function AppLayout() {
    const {user} = useAuth();

    if (!user) {
        return <Redirect href="/sign-in"/>;
    }

    return (
        <Stack>
            <Stack.Screen name="index"/>
        </Stack>
    );
}
