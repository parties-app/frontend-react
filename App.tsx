import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";

import useCachedResources from "./hooks/useCachedResources";
import useColorScheme from "./hooks/useColorScheme";
import Navigation from "./navigation/navigation";
import {
    ApolloClient,
    ApolloProvider,
    InMemoryCache,
    createHttpLink,

} from "@apollo/client";
import { RootSiblingParent } from "react-native-root-siblings";
import { loadErrorMessages, loadDevMessages } from "@apollo/client/dev";
import useUserLocalStorage from "./hooks/useLocalStorage";

if (process.env.NODE_ENV !== "production") {
    loadDevMessages();
    loadErrorMessages();
}

const httpLink = createHttpLink({
    uri: process.env.EXPO_PUBLIC_GRAPHQL_URI,
});

const graphQLClient = new ApolloClient({
    link: httpLink,
    cache: new InMemoryCache(),
});

export default function App() {
    const isLoadingComplete = useCachedResources();
    const colorScheme = useColorScheme();

    if (!isLoadingComplete) {
        return null;
    } else {
        return (
            <SafeAreaProvider>
                <StatusBar style="auto"/>
                <ApolloProvider client={graphQLClient}>
                    <RootSiblingParent>
                        <Navigation colorScheme={colorScheme} />
                    </RootSiblingParent>
                </ApolloProvider>
            </SafeAreaProvider>
        );
    }
}
