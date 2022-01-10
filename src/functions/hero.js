import axios from 'axios'

export const getHeros = async () =>
    await axios.get(`${process.env.REACT_APP_API}/heros`);

export const removeHero = async (heroId, authtoken) =>
    await axios.delete(`${process.env.REACT_APP_API}/hero/${heroId}`, {
        headers: {
            authtoken
        }
    });

export const createHero = async (hero, authtoken) =>
    await axios.post(`${process.env.REACT_APP_API}/hero`,
        { hero }
        , {
            headers: {
                authtoken
            }
        });