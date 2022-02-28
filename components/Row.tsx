import {useQuery} from 'react-query';
import axios from 'axios';
import styles from "../styles/Row.module.scss";
import classNames from 'classnames'

type Props = {
    title: string;
    fetchUrl: string;
    categoryUrl: string;
    isLargeRow?: boolean;
};

type Recipe = {
    id: string;
    name: string;
    title: string;
    original_name: string;
    menu_path: string;
    backdrop_path: string;
};

const img_class = classNames(
    styles['Row-menu'],
    styles['Card-img'],
)

export const Row = ({ title, fetchUrl, categoryUrl }: Props) => {
    const category_arry = [];
    const regex = /category\/(.*?)\//;
    // ランダム抽選するカテゴリの配列を作成する
    const category = useQuery('category', () =>
    axios(categoryUrl));
    
    console.log(category.data?.data.result);
    // https://qiita.com/kerupani129/items/6bb14acb2213179156a2#2-%E5%88%86%E5%89%B2%E4%BB%A3%E5%85%A5%E5%9E%8B-forin-%E9%9D%9E%E6%8E%A8%E5%A5%A8
    for (const key in category.data?.data.result) { // ★
        for (const count in category.data?.data.result[key]) {
            category_arry.push(category.data?.data.result[key][count].categoryUrl.match(regex)[1]);
        }
    }

    console.log(category_arry);
    
    const { isLoading, error, data } = useQuery('fetchLuke', () =>
    axios(fetchUrl));
    // console.log(data.data.result);
    return(
        
        <div className={styles['Row']}>
            {error && <div>Something went wrong ...</div>}
            
            {isLoading ? (
                <div>Retrieving Luke Skywalker Information ...</div>
            ) : (
                <div className={styles['Row-menus']}>
                {/* <h2>{title}</h2>     */}
                {/* ポスターコンテンツ */}
                {data.data.result.map((recipe, i) => (
                    <section className={styles['Card']}>
                        <img
                            key={i} // todo：recipeUrlの最後の番号にする https://recipe.rakuten.co.jp/recipe/1950012560/
                            className={img_class}
                            src={recipe.foodImageUrl} // mediumImageUrl(ちいさいサイズ)
                            alt={recipe.recipeId}
                        />
                        <div className={styles['Card-content']}>
                            <h4 className={styles['Card-title']}>{recipe.recipeTitle}</h4>
                            <p className={styles['Card-text']}>{recipe.recipeCost}</p>
                        </div>
                        <div className={styles['Card-link']}>
                            <a href={recipe.recipeUrl}>Website</a>
                        </div>
                    </section>
                ))}
            </div>
            )}
            

        </div>
    );
};
