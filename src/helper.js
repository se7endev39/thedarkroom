import { useCallback, useState } from "react";
import { shallowEqual, useSelector } from 'react-redux';
import moment from "moment";
import { setAlbums, setRolls, setSelectedAlbum, setSelectedRoll } from './ducks/main';


export const API_ENDPOINT = 'https://thedarkroom.com/api/api/v1';
//export const API_ENDPOINT = 'https://staging.thedarkroom.com/api/api/v1';

export function useRequest ()
{
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const token = useSelector(state => state.main.token, shallowEqual);

    //console.log(token);
    const request = useCallback( async (endpoint, options = {}, additionalHeaders = {}, returnFullResponse = false) => {
    
        setLoading(true);

        if (options.withAuth !== false)
        {
            additionalHeaders['Authorization'] = 'Bearer ' + token;
        }

        const headers = new Headers({'Content-Type' : 'application/json', ...additionalHeaders});
        options = {...options, mode: 'cors', timeout : options.timeout || 5000, headers};
        let response = await timeoutPromise(options.timeout, fetch((!endpoint.match('http') ? API_ENDPOINT : '') + endpoint, options));
        // console.log(API_ENDPOINT);
        // console.log(options);
        // console.log(response);
        try
        {
            if (!response.ok)
            {
                throw new Error('Something went wrong. Please contact us.');
            }

            let result;
            try
            {
                result = await response.json();
            }
            catch (e)
            {
                throw new Error('Incorrect server response (json error)');
            }

            if (!result.success)
            {
                throw new Error(result.message);
            }

            return returnFullResponse ? result : result.data;
        }
        catch (e)
        {
            setError(e.message);
            throw e.message;
        }
        finally
        {
            setLoading(false);
        }
    }, []);

    return { loading, request, error }
}

function timeoutPromise (ms, promise)
{
    return new Promise((resolve, reject) =>
    {
        const timeoutId = setTimeout(() =>
        {
            reject(new Error("Timeout error"))
        }, ms);
        promise.then(
            (res) =>
            {
                clearTimeout(timeoutId);
                resolve(res);
            },
            (err) =>
            {
                clearTimeout(timeoutId);
                reject(err);
            }
        );
    })
}

/**
 * Updater to deliver local updates for albums/rolls/images
 */
export function useUpdater ()
{
    const albums = useSelector(state => state.main.albums, shallowEqual);
    const selectedAlbum = useSelector(state => state.main.selectedAlbum, shallowEqual);
    const rolls = useSelector(state => state.main.rolls, shallowEqual);
    const selectedRoll = useSelector(state => state.main.selectedRoll, shallowEqual);

    function updateRoll (idRoll, updates)
    {
        const originalRoll = rolls.find(existingRoll => existingRoll.id === idRoll);
        if (originalRoll === undefined)
        {
            return;
        }

        const updatedRoll = Object.assign({}, originalRoll, updates),
              updatedRolls = rolls.map(existingRoll => existingRoll.id === idRoll ? updatedRoll : existingRoll),
              updatedAlbum = {...selectedRoll, rolls : updatedRolls};

        setRolls(updatedRolls);
        if (selectedRoll !== null && selectedRoll.id === idRoll)
        {
            setSelectedRoll(updatedRoll);
        }

        setSelectedAlbum(updatedAlbum);

    }

    function updateAlbum (idAlbum, updates)
    {
        const originalAlbum = albums.find(existingAlbum => existingAlbum.id === idAlbum);
        if (originalAlbum === undefined)
        {
            return;
        }

        const updatedAlbum = {...originalAlbum, ...updates},
              updatedAlbums = albums.map(existingAlbum => existingAlbum.id === idAlbum ? updatedAlbum : existingAlbum);

        setAlbums(updatedAlbums);
        if (selectedAlbum !== null && selectedAlbum.id === idAlbum)
        {
            setSelectedAlbum(updatedAlbum);
        }
    }


    return { updateAlbum, updateRoll }
}

export function processError (e, text = '')
{
    console.warn((text ? text + ': ' : '') + e);
}

/* calculate different date */
export function calcDiffDate(curDate){
    moment.locale();
    const b = moment(curDate,"ll");
    const a = moment();
    return a.diff(b, 'days');
}
