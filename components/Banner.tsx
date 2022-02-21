import {useQuery} from 'react-query';
import axios from 'axios';
import { requests } from '../requests/request';
import { useState, useEffect } from 'react';
import styles from "../styles/Banner.module.scss";

type movieProps = {
    title?: string;
    name?: string;
    orignal_name?: string;
    backdrop_path?: string;
    overview?: string;
};

export const Banner = () => {
    const [movie, setMovie] = useState<movieProps>({});
    useEffect(() => {
        async function fetchData() {
            const request = await axios.get(requests.JapanRecipe.url);
            console.log(request.data.result);

            //apiからランダムで値を取得している

            return request;
        }
        fetchData();
    }, []);
    console.log(movie);
    
    // descriptionの切り捨てよう関数
    function truncate(str: any, n: number) {
        // undefinedを弾く
        if (str !== undefined) {
            return str.length > n ? str?.substr(0, n - 1) + "..." : str;
        }
    }

    return (
        <header
          className={styles['Banner']}
          style={{
            backgroundSize: "cover",
            backgroundImage: `url("https://cdn.entries.clios.com/styles/clio_aotw_ems_image_details_retina/s3/entry_attachments/image/51/1479/22452/70099/vMHJV15ERvmyb9VGH-zAkpT9wcaKp2NoraAtLWZPN9Q.jpg")`,
            backgroundPosition: "center center",
          }}
        >
          <div className={styles['Banner-contents']}>
            <h1 className="banner-title">
              {movie?.title || movie?.name || movie?.orignal_name}
            </h1>
            <div className={styles['Banner-buttons']}>
              <button className={styles['Banner-button']}>Play</button>
              <button className={styles['Banner-button']}>My List</button>
            </div>
    
            <h1 className={styles['Banner-description']}>{truncate(movie?.overview, 150)}</h1>
          </div>
    
          <div className={styles['Banner-fadeBottom']} />
        </header>
      );
    
};