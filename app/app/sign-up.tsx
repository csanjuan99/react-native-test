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

export default function SignUpScreen() {

    const auth = useAuth();
    const router = useRouter();

    const [payload, setPayload] = useState({
        password: '',
        confirmPassword: '',
        email: ''
    });

    const [isInvalidPassword, setIsInvalidPassword] = useState(false);
    const [isInvalidConfirmPassword, setIsInvalidConfirmPassword] = useState(false);
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

        if (payload.password !== payload.confirmPassword) {
            setIsInvalidConfirmPassword(true);
            return;
        }

        try {
            await auth.signUp(payload);
            router.replace('/sign-in');
        } catch (e) {
            console.error(e);
        } finally {
            setIsInvalidConfirmPassword(false);
            setIsInvalidPassword(false);
            setIsInvalidEmail(false);
            setPayload({
                password: '',
                confirmPassword: '',
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
            <FormControl
                isInvalid={isInvalidConfirmPassword}
                size="lg"
                isReadOnly={false}
                isRequired={true}>
                <FormControlLabel>
                    <FormControlLabelText>Confirmar Contraseña</FormControlLabelText>
                </FormControlLabel>
                <Input className="my-1">
                    <InputField
                        type="password"
                        placeholder="********"
                        value={payload.confirmPassword}
                        onChangeText={confirmPassword => setPayload({...payload, confirmPassword})}
                    />
                </Input>
                <FormControlError>
                    <FormControlErrorIcon as={AlertCircleIcon}/>
                    <FormControlErrorText>
                        Las contraseñas no coinciden.
                    </FormControlErrorText>
                </FormControlError>
            </FormControl>
            {/**/}
            <Button className="w-fit self-end mt-4" size="sm" onPress={handleSubmit}>
                <ButtonText>
                    Registrarse
                </ButtonText>
            </Button>
        </View>
    );
}
