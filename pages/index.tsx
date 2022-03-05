import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
// Todo:APi専用処理ファイルに移る
import { Row } from "../components/Row";
import { Banner } from "../components/Banner";
import { Nav } from "../components/Nav";
import { CountryCard } from "../components/CountryCard";
import { requests } from "../requests/request";
// import "../styles/Row.module.scss";

// Todo：ユーザーハンドラーでこのメソッドにパラメーターを渡す方法
// 全部わたしたらええやん、コンポーネント内でしぼればいい！
export async function getServerSideProps() {
  // const category_id = getCategoryId();
  const category_arry = [];
  const regex = /category\/(.*?)\//;
  // ランダム抽選するカテゴリの配列を作成する
  const res = await fetch(requests.JapanRecipeCategory.url);
  const categorys = await res.json();

  // https://qiita.com/kerupani129/items/6bb14acb2213179156a2#2-%E5%88%86%E5%89%B2%E4%BB%A3%E5%85%A5%E5%9E%8B-forin-%E9%9D%9E%E6%8E%A8%E5%A5%A8
  for (const key in categorys?.result) { // ★
      for (const count in categorys?.result[key]) {
          category_arry.push(categorys?.result[key][count].categoryUrl.match(regex)[1]);
      }
  }

  const category_id = [];
  const loop_count = 2;
  // ランダムのカテゴリを取得する
  for (let i = 0; i < loop_count; i++) {
    category_id.push(category_arry[Math.floor(Math.random() * category_arry.length)]);
  }
  console.log(category_id);
  
  return {
    props: {
      category_id
    }
  }
}

export type Categorys = {
    category_id:string[]
}

// https://zenn.dev/ifhito/articles/7d345bb8d03024
const Home: NextPage<Categorys> = ({category_id}: Categorys) => {  
  return (
    <div className="App">
      <Nav />
      <Banner />
      <CountryCard />
        <Row
          title="Food Genre"
          fetchUrl={requests.JapanRecipe.url}
          categoryId={category_id}
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
