import {useQuery} from 'react-query';
import axios from 'axios';
import styles from "../styles/Row.module.scss";
import classNames from 'classnames'

type Props = {
    title: string;
    fetchUrl: string;
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

export const Row = ({ title, fetchUrl }: Props) => {
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
                <h2>{title}</h2>    
                {/* ポスターコンテンツ */}
                {data.data.result.map((recipe, i) => (
                    <section className={styles['Card']}>
                        <img
                            key={i} // todo：recipeUrlの最後の番号にする https://recipe.rakuten.co.jp/recipe/1950012560/
                            className={img_class}
                            src={recipe.foodImageUrl} // mediumImageUrl(ちいさいサイズ)
                            alt={recipe.recipeId}
                        />
                        <div className={styles['card-content']}>
                            <h1 className={styles['card-title']}>Webクリエイターボックス</h1>
                            <p className={styles['card-text']}>WebデザインやWebサイト制作、最新のWeb業界情報などを紹介していくサイト。</p>
                        </div>
                        <div className={styles['card-link']}>
                            <a href="http://webcreatorbox.com/about">About</a>
                            <a href="http://webcreatorbox.com/">Website</a>
                        </div>
                    </section>
                ))}
            </div>
            )}
            

        </div>
    );
};
