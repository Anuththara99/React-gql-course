import React from 'react';
import logo from './logo.svg';
import './App.css';
import { ApolloClient,ApolloProvider,HttpLink,InMemoryCache } from '@apollo/client';
import Courses from './components/Courses';


//apollo client setup 
const client = new ApolloClient({
  link: new HttpLink({uri:'http://localhost:8080/graphql'}),
  cache: new InMemoryCache()
});

function App() {
  return (
    <ApolloProvider client={client}>

      <div className="App">
        <h1>Apollo client</h1>
        <Courses />
      </div>

    </ApolloProvider>
    
  );
}

export default App;
