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

export const RowDe = ({ title, fetchUrl, categoryId }: Props) => {
    let queries_data: any[] = [];
    let data: any[] = [];

    queries_data = useQueries(
        categoryId.map(category_id => {
            return {
                queryKey: ['category_de', category_id],
                queryFn: () => axios(`${fetchUrl}?orderBy=7&limit=8`)
            }
        })
    )

    console.log(queries_data);
    const isLoading = queries_data.some(query => query.isLoading);
    const isSuccess = queries_data.every(query => query.isSuccess === true);
    
    if (isSuccess) {
        queries_data.map((result, i) => {
            // https://qiita.com/uhyo/items/0e7821ce494024c98da5#1-4-%E9%85%8D%E5%88%97%E3%81%AE%E5%9E%8B
            result.result.map((menu: any[]) => {
                data.push(menu);
            })
            
        })
    }
    
    console.log(data);

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
                            src={recipe.foodImageUrl}
                            alt={recipe.recipeId}
                        />
                        <div className={styles['Card-content']}>
                            <h4 className={styles['Card-title']}>{recipe.recipeTitle}</h4>
                            <p className={styles['Card-text']}>{recipe.recipeCost}</p>
                        </div>
                        <div className={styles['Card-link']}>
                            <a href={recipe.recipeUrl} target='_blank' rel='noreferrer'>Website</a>
                        </div>
                    </section>
                ))}
            </div>
            )}
            

        </div>
    );
};
