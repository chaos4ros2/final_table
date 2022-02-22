import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

import {useQuery} from 'react-query';
import axios from 'axios';
import { Row } from "../components/Row";
import { Banner } from "../components/Banner";
import { Nav } from "../components/Nav";
import { CountryCard } from "../components/CountryCard";
import { requests } from "../requests/request";
// import "../styles/Row.module.scss";

const Home: NextPage = () => {  
  return (
    <div className="App">
      <Nav />
      <Banner />
      <CountryCard />
        <Row
          title="NETFLIX ORIGUINALS"
          fetchUrl={requests.JapanRecipe.url}
          isLargeRow
        />
        {/* <Row title="Top Rated" fetchUrl={requests.JapanRecipe.url} />
        <Row title="Action Movies" fetchUrl={requests.JapanRecipe.url} />
        <Row title="Comedy Movies" fetchUrl={requests.JapanRecipe.url} />
        <Row title="Horror Movies" fetchUrl={requests.JapanRecipe.url} />
        <Row title="Romance Movies" fetchUrl={requests.JapanRecipe.url} />
        <Row title="DOcumentaries" fetchUrl={requests.JapanRecipe.url} /> */}
    </div>
  );
}

export default Home
