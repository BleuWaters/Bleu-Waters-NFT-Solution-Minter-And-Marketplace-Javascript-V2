import ErrorBoundary from "../components/ErrorBoundary/ErrorBoundary";
import Footer from "../components/Footer/Footer";
import Header from "../components/Header/Header";
import Modals from "../components/Modals";
import StateContextProvider from "../context/state.context";
import "../styles/globals.css";
import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";
import Notifications from "../components/Notifications/Notifications";
import LoadingScreen from "../components/LoadingScreen/LoadingScreen";

const client = new ApolloClient({
  cache: new InMemoryCache(),
  uri: process.env.NEXT_PUBLIC_SUBGRAPH_URL,
});

console.log(process.env.NEXT_PUBLIC_SUBGRAPH_URL);

function MyApp({ Component, pageProps }) {
  return (
    <>
      <ErrorBoundary>
        <StateContextProvider>
          <ApolloProvider client={client}>
            <div style={{ minHeight: "100vh" }}>
              <Header />
              <Component {...pageProps} />
            </div>
            <Footer />
            <Modals />
            <Notifications />
            <LoadingScreen />
          </ApolloProvider>
        </StateContextProvider>
      </ErrorBoundary>
    </>
  );
}

export default MyApp;
