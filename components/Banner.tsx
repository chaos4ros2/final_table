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
            <div className={styles['Banner-buttons']}>
              {/* <button className={styles['Banner-button']}>Play</button>
              <button className={styles['Banner-button']}>My List</button> */}
            </div>
          </div>
    
          <div className={styles['Banner-fadeBottom']} />
        </header>
      );
    
};