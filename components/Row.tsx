import {useQuery, useQueries} from 'react-query';
import axios from 'axios';
import styles from "../styles/Row.module.scss";
import classNames from 'classnames'

type Props = {
    title: string;
    fetchUrl: string;
    categoryId: string[];
    isLargeRow?: boolean;
};

const img_class = classNames(
    styles['Row-menu'],
    styles['Card-img'],
)

export const Row = ({ title, fetchUrl, categoryId }: Props) => {
    let queries_data: any[] = [];
    let data: any[] = [];
    
    queries_data = useQueries(
        categoryId.map(category_id => {
            return {
                queryKey: ['category', category_id],
                queryFn: () => axios(`${fetchUrl}&categoryId=${category_id}`)
            }
        })
    )

    const isLoading = queries_data.some(query => query.isLoading);
    const isSuccess = queries_data.every(query => query.isSuccess === true);
    
    if (isSuccess) {
        queries_data.map((result, i) => {
            // https://qiita.com/uhyo/items/0e7821ce494024c98da5#1-4-%E9%85%8D%E5%88%97%E3%81%AE%E5%9E%8B
            result.data.data.result.map((menu: any[]) => {
                data.push(menu);
            })
            
        })
    }
    
    return(
        
        <div className={styles['Row']}>
            {/* {error && <div>Something went wrong ...</div>} */}
            
            {isLoading ? (
                <div>Retrieving Recipe Information ...</div>
            ) : (
                <div className={styles['Row-menus']}>
                {/* <h2>{title}</h2>     */}
                {/* ポスターコンテンツ */}
                {data.map((recipe, i) => (
                    <section className={styles['Card']} key={i}>
                        <img
                            className={img_class}
                            src={recipe.foodImageUrl} // mediumImageUrl(ちいさいサイズ)
                            alt={recipe.recipeId}
                            width={200}
                            height={130}
                        />
                        <div className={styles['Card-content']}>
                            <h4 className={styles['Card-title']}>{recipe.recipeTitle}</h4>
                            <p className={styles['Card-text']}>{recipe.recipeCost}</p>
                        </div>
                        <div className={styles['Card-link']}>
                            <a href={recipe.recipeUrl} target='_blank' rel='noreferrer'>レシピ</a>
                        </div>
                    </section>
                ))}
            </div>
            )}
            

        </div>
    );
};
