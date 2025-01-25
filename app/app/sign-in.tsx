import {useContext, useState} from 'react';
import {
    FormControl, FormControlError,
    FormControlErrorIcon, FormControlErrorText,
    FormControlHelper,
    FormControlHelperText,
    FormControlLabel,
    FormControlLabelText
} from "@/components/ui/form-control";
import {Input, InputField} from "@/components/ui/input";
import {AlertCircleIcon} from "@/components/ui/icon";
import {Button, ButtonText} from "@/components/ui/button";
import {View} from "react-native";
import {useAuth} from "@/providers/auth.provider";
import {useRouter} from "expo-router";

export default function SignInScreen() {

    const auth = useAuth();
    const router = useRouter();

    const [payload, setPayload] = useState({
        password: '',
        email: ''
    });

    const [isInvalidPassword, setIsInvalidPassword] = useState(false);
    const [isInvalidEmail, setIsInvalidEmail] = useState(false);


    const handleSubmit = async () => {

        if (!payload.email.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g)) {
            setIsInvalidEmail(true);
            return;
        }

        if (payload.password.length < 6) {
            setIsInvalidPassword(true);
            return;
        }


        try {
            await auth.signIn(payload);
            router.replace('/');
        } catch (e) {
            console.error(e);
        } finally {
            setIsInvalidPassword(false);
            setIsInvalidEmail(false);
            setPayload({
                password: '',
                email: ''
            })
        }
    }


    return (
        <View className="w-full max-w-[300px] rounded-md border border-background-200 p-4 mt-20 block mx-auto">
            {/**/}
            <FormControl
                isInvalid={isInvalidEmail}
                isRequired={true}
                size="lg">
                <FormControlLabel>
                    <FormControlLabelText>
                        Correo Electrónico
                    </FormControlLabelText>
                </FormControlLabel>
                <Input className="my-1">
                    <InputField
                        type="text"
                        placeholder="john@doe.com"
                        value={payload.email}
                        onChangeText={email => setPayload({...payload, email})}
                    />
                </Input>
                <FormControlError>
                    <FormControlErrorIcon as={AlertCircleIcon}/>
                    <FormControlErrorText>
                        El correo electrónico no es válido.
                    </FormControlErrorText>
                </FormControlError>
            </FormControl>
            {/**/}
            <FormControl
                isInvalid={isInvalidPassword}
                size="lg"
                isReadOnly={false}
                isRequired={true}
            >
                <FormControlLabel>
                    <FormControlLabelText>Contraseña</FormControlLabelText>
                </FormControlLabel>
                <Input className="my-1">
                    <InputField
                        type="password"
                        placeholder="********"
                        value={payload.password}
                        onChangeText={password => setPayload({...payload, password})}
                    />
                </Input>
                <FormControlHelper>
                    <FormControlHelperText>
                        Debe contener al menos 6 caracteres.
                    </FormControlHelperText>
                </FormControlHelper>
                <FormControlError>
                    <FormControlErrorIcon as={AlertCircleIcon}/>
                    <FormControlErrorText>
                        La contraseña debe tener al menos 6 caracteres.
                    </FormControlErrorText>
                </FormControlError>
            </FormControl>
            {/**/}
            <Button className="w-fit self-end mt-4" size="sm" onPress={handleSubmit}>
                <ButtonText>
                    Iniciar Sesión
                </ButtonText>
            </Button>
        </View>
    );
}
