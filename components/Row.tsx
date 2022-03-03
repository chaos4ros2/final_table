import {useQuery} from 'react-query';
import axios from 'axios';
import styles from "../styles/Row.module.scss";
import classNames from 'classnames'

type Props = {
    title: string;
    fetchUrl: string;
    categoryId: string;
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

export const Row = ({ title, fetchUrl, categoryId }: Props) => {
    // let { isLoading, error, data } = useQuery('fetchLuke', () =>
    // axios(`${fetchUrl}&categoryId=${categoryId}`));
    // console.log(data);
    let data = {};
    const data1 = useQuery('data1', () =>
    axios(`${fetchUrl}&categoryId=${categoryId[0]}`));

    const data2 = useQuery('data2', () =>
    axios(`${fetchUrl}&categoryId=${categoryId[1]}`));

    
    
    if (data1.isLoading || data2.isLoading) {

    } else {
        console.log(data1.data?.data.result, data2.data?.data.result);
        data = data1.data.data.result.concat(data2.data.data.result); 
    }
    // data = Object.assign(data1.data, data2.data);
    console.log(data);
    return(
        
        <div className={styles['Row']}>
            {/* {error && <div>Something went wrong ...</div>} */}
            
            {data1.isLoading || data2.isLoading ? (
                <div>Retrieving Luke Skywalker Information ...</div>
            ) : (
                <div className={styles['Row-menus']}>
                {/* <h2>{title}</h2>     */}
                {/* ポスターコンテンツ */}
                {data.map((recipe, i) => (
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
