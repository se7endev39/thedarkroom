import {persistReducer, persistStore} from "redux-persist";
import {applyMiddleware, combineReducers, compose, createStore} from "redux";
import main, {
    setAlbums,
    setImagesLikes,
    setRolls,
    setTheme,
    setToken,
    setImagesRotation,
    setImagesTooltipProcessed,
    setFcmToken,
    setUncheckedNotificationsCount,
    setOrientation,
    setForceAlbumId, setForceRollId, setActivedPrints, setPGData, setActivedFilmTab, setPhotoMode,
    setDvDOption, setNeckGaiter, setDarkroomHat, setDarkroomCalendar, setDarkroomBag, setFilmDeveloping, 
    setHDAluminum, setCanvasPrints, setBambooBlocks, setPrintsEnlargements,
    setStorageSubscription, setGiftCard, setTShirt, setSheetFilm, setFilmScanning,
} from './ducks/main';
import FastStorage from "react-native-fast-storage";

const development = !process.env.NODE_ENV || process.env.NODE_ENV === 'development';
export let persistorLink;

export function configureStore ()
{
    const middlewares = [];
    if (development)
    {
        const {logger} = require(`redux-logger`);
        //middlewares.push(logger);
    }

    const withStorage = true;

    const rootReducer = combineReducers({
        main : withStorage ? persistReducer({key: "main", storage : FastStorage,
            blacklist: ['selectedImage', 'selectedRoll', 'rolls', 'selectedAlbum', 'orientation', 'forceAlbumId', 'forceRollId']}, main) : main
    });
    const enhancer = compose(applyMiddleware(...middlewares));
    const store = createStore(rootReducer, enhancer);
    const persistor = persistStore(store);
    persistorLink = persistor;

    assignActionsCreators(store);

    return {store, persistor};
}

function assignActionsCreators (store) {
    setToken.assignTo(store);
    setTheme.assignTo(store);
    setAlbums.assignTo(store);
    setRolls.assignTo(store);
    setImagesLikes.assignTo(store);
    setImagesRotation.assignTo(store);
    setImagesTooltipProcessed.assignTo(store);
    setFcmToken.assignTo(store);
    setUncheckedNotificationsCount.assignTo(store);
    setOrientation.assignTo(store);
    setForceAlbumId.assignTo(store);
    setForceRollId.assignTo(store);
    setActivedPrints.assignTo(store);
    setPGData.assignTo(store);
    setActivedFilmTab.assignTo(store);
    setPhotoMode.assignTo(store);

    //The darkroom Products
    setDvDOption.assignTo(store);
    setNeckGaiter.assignTo(store);
    setDarkroomHat.assignTo(store);
    setDarkroomCalendar.assignTo(store);
    setDarkroomBag.assignTo(store);
    setFilmDeveloping.assignTo(store);
    setHDAluminum.assignTo(store);
    setCanvasPrints.assignTo(store);
    setBambooBlocks.assignTo(store);
    setPrintsEnlargements.assignTo(store);
    setStorageSubscription.assignTo(store);
    setGiftCard.assignTo(store);
    setTShirt.assignTo(store);
    setSheetFilm.assignTo(store);
    setFilmScanning.assignTo(store);
}
