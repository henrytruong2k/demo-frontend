import React, { useEffect } from 'react'
import userApi from '../api/userApi';

const Home = () => {
    useEffect(() => {
        (async () => {
            try {
                const data = await userApi.dashboard();
                console.log({ data });
            } catch (error) {
                console.log('Failed to load api: ', error);
            }
        })();
    }, []);
    return (
        <div>Home</div>
    )
}

export default Home