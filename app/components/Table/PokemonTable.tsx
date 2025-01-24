import {
    TableBody,
    TableHead,
    TableHeader,
    TableRow,
    Table,
    TableData,
    TableFooter,
    TableCaption
} from "@/components/ui/table";
import React, {PropsWithChildren} from "react";
import {PokemonProfile} from "@/types/pokemon.type";
import {Box} from "@/components/ui/box";
import {Text} from "react-native";

interface Props {
    data: PokemonProfile[];
    title: string;
    caption?: string;
    onPress: (pokemon: PokemonProfile) => void;
}

export default function PokemonTable({props}: { props: PropsWithChildren<Props> }) {
    return (
        <Box className="overflow-hidden w-full">
            <Box className="bg-primary-0 rounded-lg flex items-center">
                <Text className="font-semibold">
                    {props.title}
                </Text>
            </Box>
            <Table className="w-full">
                <TableHeader>
                    <TableRow>
                        <TableHead>Nombre</TableHead>
                        <TableHead>Altura</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
                        props.data.map((pokemon: PokemonProfile) => (
                            <TableRow key={pokemon.id}>
                                <TableData className="py-0.5">
                                    <Text onPress={() => props.onPress(pokemon)}>
                                        {pokemon.name}
                                    </Text>
                                </TableData>
                                <TableData className="py-0.5">
                                    <Text onPress={() => props.onPress(pokemon)}>
                                        {pokemon.height ?? 'N/A'}
                                    </Text>
                                </TableData>
                            </TableRow>
                        ))
                    }
                </TableBody>
                {
                    props.caption && (
                        <TableFooter>
                            <TableCaption>
                                {props.caption}
                            </TableCaption>
                        </TableFooter>
                    )
                }
            </Table>
        </Box>
    )
}
