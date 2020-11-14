import ApolloClient from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks';

import 'bootstrap/dist/css/bootstrap.min.css';
import '@/styles/index.scss';

import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import Hero from "@/components/shared/Hero";

const client = new ApolloClient({
  uri: 'http://localhost:3000/graphql'
});


const MyApp = ({ Component, pageProps }) => {
  const isHomePage = () => Component.name === 'Home';

  return (
    <ApolloProvider client={client}>
      <div className="portfolio-app">
        <Navbar />
        {isHomePage() && <Hero />}
        <div className="container">
          <Component {...pageProps} />
        </div>
        {isHomePage() && <Footer />}
      </div>
    </ApolloProvider>
  )
}

export default MyApp;
