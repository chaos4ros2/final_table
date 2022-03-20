import {useQuery, useQueries} from 'react-query';
import axios from 'axios';
import styles from "../styles/Row.module.scss";
import classNames from 'classnames'

type Props = {
    title: string;
    de_recipe_obj: any;
};

const img_class = classNames(
    styles['Row-menu'],
    styles['Card-img'],
)

export const RowDe = ({ title, de_recipe_obj }: Props) => {
    let data: any[] = [];

    de_recipe_obj.map((result: any) => {
        result.recipe.previewImageUrlTemplate = result.recipe.previewImageUrlTemplate.replace('<format>', 'crop-480x320');
        // 画像ある項目のみ表示
        if (result.recipe.previewImageUrlTemplate) 
            data.push(result.recipe);
    });


    return(
        
        <div className={styles['Row']}>
            <div className={styles['Row-menus']}>
            {/* <h2>{title}</h2>     */}
            {/* ポスターコンテンツ */}
            {data.map((recipe, i) => (
                <section className={styles['Card']} key={i}>
                    <img
                        className={img_class}
                        src={recipe.previewImageUrlTemplate}
                        alt={recipe.recipeId}
                        width={200}
                        height={130}
                    />
                    <div className={styles['Card-content']}>
                        <h4 className={styles['Card-title']}>{recipe.title}</h4>
                        <p className={styles['Card-text']}>Schwierigkeit : {recipe.difficulty}</p>
                    </div>
                    <div className={styles['Card-link']}>
                        <a href={recipe.siteUrl} target='_blank' rel='noreferrer'>Rezept</a>
                    </div>
                </section>
            ))}
            </div>
        </div>
    );
};
