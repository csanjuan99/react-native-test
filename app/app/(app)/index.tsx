import {sortElements} from '@/utils';
import {View, Text} from 'react-native';
import {useAuth} from "@/providers/auth.provider";


export default function HomeScreen() {
    const {user} = useAuth();

    const arr = [...Array(20)].map(() => {
        return {
            height: Math.floor(Math.random() * 99)
        }
    });

    return (
        <View>
            <Text>React Native - Alternova</Text>
            {sortElements(arr).map((item, index) => (
                <Text key={index}>{item.height}</Text>
            ))}
        </View>
    );
}
