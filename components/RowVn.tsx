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

// Todo：change categoryId to query parameter
export const RowVn = ({ title, fetchUrl, categoryId }: Props) => {
    let queries_data: any[] = [];
    let data: any[] = [];
    
    queries_data = useQueries(
        categoryId.map(category_id => {
            return {
                queryKey: ['category_vn', category_id],
                queryFn: () => axios(`${fetchUrl}`)
            }
        })
    )

    const isLoading = queries_data.some(query => query.isLoading);
    const isSuccess = queries_data.every(query => query.isSuccess === true);

    if (isSuccess) {
        queries_data.map((result, i) => {
            // https://qiita.com/uhyo/items/0e7821ce494024c98da5#1-4-%E9%85%8D%E5%88%97%E3%81%AE%E5%9E%8B
            result.data.data.hits.map((menu: any) => {
                data.push(menu.recipe);
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
                            src={recipe.image} // mediumImageUrl(ちいさいサイズ)
                            alt={recipe.recipeId}
                        />
                        <div className={styles['Card-content']}>
                            <h4 className={styles['Card-title']}>{recipe.label}</h4>
                            <p className={styles['Card-text']}>{recipe.mealType[0]}</p>
                        </div>
                        <div className={styles['Card-link']}>
                            <a href={recipe.url} target='_blank' rel='noreferrer'>Recipe</a>
                        </div>
                    </section>
                ))}
            </div>
            )}
            

        </div>
    );
};
