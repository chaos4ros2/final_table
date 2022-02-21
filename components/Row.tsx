import {useQuery} from 'react-query';
import axios from 'axios';
import styles from "../styles/Row.module.scss";

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
    poster_path: string;
    backdrop_path: string;
};

export const Row = ({ title, fetchUrl }: Props) => {
    const { isLoading, error, data } = useQuery('fetchLuke', () =>
    axios(fetchUrl));
        
    return(
        
        <div className={styles['Row']}>
            {error && <div>Something went wrong ...</div>}
            
            {isLoading ? (
                <div>Retrieving Luke Skywalker Information ...</div>
            ) : (
                <div className={styles['Row-posters']}>
                <h2>{title}</h2>    
                {/* ポスターコンテンツ */}
                {data.data.result.map((recipe, i) => (
                    <img
                        key={i} // todo：recipeUrlの最後の番号にする https://recipe.rakuten.co.jp/recipe/1950012560/
                        className={styles['Row-poster']}
                        src={recipe.mediumImageUrl} // foodImageUrl
                        alt={recipe.recipeId}
                    />
                ))}
            </div>
            )}
            

        </div>
    );
};
