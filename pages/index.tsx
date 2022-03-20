import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
// Todo:APi専用処理ファイルに移る
import { Row } from "../components/Row";
import { RowDe } from "../components/RowDe";
import { RowVn } from "../components/RowVn";
import { Banner } from "../components/Banner";
import { Nav } from "../components/Nav";
import { CountryCard } from "../components/CountryCard";
import { requests } from "../requests/request";
// import "../styles/Row.module.scss";

// Todo：ユーザーハンドラーでこのメソッドにパラメーターを渡す方法
// 全部わたしたらええやん、コンポーネント内でしぼればいい！
export async function getServerSideProps() {
  // const category_id = getCategoryId();
  const category_obj = {};

  const regex = /category\/(.*?)\//;
  // ランダム抽選するカテゴリの配列を作成する
  const res = await fetch(requests.JapanRecipeCategory.url);
  const categorys = await res.json();
  // console.log(categorys?.result);
  // https://qiita.com/kerupani129/items/6bb14acb2213179156a2#2-%E5%88%86%E5%89%B2%E4%BB%A3%E5%85%A5%E5%9E%8B-forin-%E9%9D%9E%E6%8E%A8%E5%A5%A8
  for (const key in categorys?.result) { // ★
      for (const count in categorys?.result[key]) {
          category_obj[count] = {};
          category_obj[count]['name'] = categorys?.result[key][count].categoryName;
          category_obj[count]['url'] = categorys?.result[key][count].categoryUrl.match(regex)[1];
      }
  }

  const category_id = [];
  const loop_count = 3;
  // ランダムのカテゴリを取得する
  for (let i = 0; i < loop_count; i++) {
    category_id.push(category_obj[Math.floor(Math.random() * Object.keys(category_obj).length)].url);
  }

  // クロスオリジン解消のためレンダリング前にデータをドイツ語のメニューを取得する
  const res_de = await fetch(requests.GermanyRecipe.url);
  const de_recipe = await res_de.json();
  const de_recipe_obj = de_recipe.results;

  return {
    props: {
      category_id,
      de_recipe_obj,
    }
  }
}

export type Categorys = {
    category_id:string[];
    de_recipe_obj:any;
}

// https://zenn.dev/ifhito/articles/7d345bb8d03024
const Home: NextPage<Categorys> = ({category_id, de_recipe_obj}: Categorys) => {  
  return (
    <div className="App">
      <Nav />
      <Banner />
      <CountryCard flagUrl='/flags/jp.svg' countryName='Japan' />
        <Row
          title="Food Genre"
          fetchUrl={requests.JapanRecipe.url}
          categoryId={category_id}
          isLargeRow
        />
      <CountryCard flagUrl='/flags/vn.svg' countryName='Vietnam' />
        <RowVn
          title="Food Genre"
          fetchUrl={requests.VietnamRecipe.url}
          categoryId={['0']}
          isLargeRow
      />
      <CountryCard flagUrl='/flags/de.svg' countryName='Germany' />
        <RowDe
          title="Food Genre"
          de_recipe_obj={de_recipe_obj}
      />
    </div>
  );
}

export default Home
