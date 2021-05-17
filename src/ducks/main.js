import {createAction, createReducer} from "redux-act";

export const setToken = createAction('Set user token');
export const setTheme = createAction('Set theme');
export const setAlbums = createAction('Set albums');
export const setRolls = createAction('Set rolls');
export const setImagesLikes = createAction('Set images likes');
export const setImagesRotation = createAction('Set images rotation');
export const setImagesTooltipProcessed = createAction('Set image tooltip processed');
export const setFcmToken = createAction('Set Firebase Messaging Token');
export const setUncheckedNotificationsCount = createAction('Set unchecked notifications count');
export const setOrientation = createAction('Set orientation');
export const setForceAlbumId = createAction('Set force album id');
export const setForceRollId = createAction('Set force roll id');
export const setActivedPrints = createAction('Set active prints element');
export const setPGData = createAction('Set prints and gifts data list');
export const setActivedFilmTab = createAction('Set actived film tab');
export const setPhotoMode = createAction('Set photo mode');

// The darkroom Products
export const setDvDOption = createAction('Set DvD Option');
export const setNeckGaiter = createAction('Set Neck Gaiter');
export const setDarkroomHat = createAction('Set Darkroom Hat');
export const setDarkroomCalendar = createAction('Set Darkroom Calendar');
export const setDarkroomBag = createAction('Set Darkroom Bag');
export const setFilmDeveloping = createAction('Set Film Developing');
export const setHDAluminum = createAction('Set HD Aluminum');
export const setCanvasPrints = createAction('Set Canvas Prints');
export const setBambooBlocks = createAction('Set Bamboo Blocks');
export const setPrintsEnlargements = createAction('Set Prints and Enlargements');
export const setStorageSubscription = createAction('Set Storage Subscription');
export const setGiftCard = createAction('Set Gift Card');
export const setTShirt = createAction('Set T-Shirt');
export const setSheetFilm = createAction('Set Sheet Film');
export const setFilmScanning = createAction('Set Film Scanning');

const initialState = {
    token: null,
    theme: 'dark',
    albums: [],
    rolls: [],
    imagesLikes : {},
    imagesRotation : {},
    imagesTooltipProcessed : false,
    fcmToken : '',
    uncheckedNotificationsCount : 0,
    orientation : null,
    forceAlbumId : null,
    forceRollId : null,
    activedPrints: 'Prints & Enlargements',
    pgData: [],
    activedFilmTab: 'Film',
    photoMode: false,

    // The darkroom Products
    dvdOption: {},
    neckGaiter: {},
    darkroomHat: {},
    darkroomCalendar: {},
    darkroomBag: {},
    filmDeveloping: {},
    hdAluminum: {},
    canvasPrints: {},
    bambooBlocks: {},
    printsEnlargements: {},
    storageSubscription: {},
    giftCard: {},
    tShirt: {},
    sheetFilm: {},
    filmScanning: {},
};

const main = createReducer({
    [setToken]: (state, payload) => ({...state, token: payload}),
    [setTheme]: (state, payload) => ({...state, theme: payload}),
    [setAlbums]: (state, payload) => ({...state, albums: payload}),
    [setRolls]: (state, payload) => ({...state, rolls: payload}),
    [setImagesLikes]: (state, payload) => ({...state, imagesLikes: payload}),
    [setImagesRotation]: (state, payload) => ({...state, imagesRotation: payload}),
    [setImagesTooltipProcessed]: (state, payload) => ({...state, imagesTooltipProcessed: payload}),
    [setFcmToken]: (state, payload) => ({...state, fcmToken: payload}),
    [setUncheckedNotificationsCount]: (state, payload) => ({...state, uncheckedNotificationsCount: payload}),
    [setOrientation]: (state, payload) => ({...state, orientation: payload}),
    [setForceAlbumId]: (state, payload) => ({...state, forceAlbumId: payload}),
    [setForceRollId]: (state, payload) => ({...state, forceRollId: payload}),
    [setActivedPrints]: (state, payload) => ({...state, activedPrints: payload}),
    [setPGData]: (state, payload) => ({...state, pgData: payload}),
    [setActivedFilmTab]: (state, payload) => ({...state, activedFilmTab: payload}),
    [setPhotoMode]: (state, payload) => ({...state, photoMode: payload}),

    // The darkroom Products
    [setDvDOption]: (state, payload) => ({...state, dvdOption: payload}),
    [setNeckGaiter]: (state, payload) => ({...state, neckGaiter: payload}),
    [setDarkroomHat]: (state, payload) => ({...state, darkroomHat: payload}),
    [setDarkroomCalendar]: (state, payload) => ({...state, darkroomCalendar: payload}),
    [setDarkroomBag]: (state, payload) => ({...state, darkroomBag: payload}),
    [setFilmDeveloping]: (state, payload) => ({...state, filmDeveloping: payload}),
    [setHDAluminum]: (state, payload) => ({...state, hdAluminum: payload}),
    [setCanvasPrints]: (state, payload) => ({...state, canvasPrints: payload}),
    [setBambooBlocks]: (state, payload) => ({...state, bambooBlocks: payload}),
    [setPrintsEnlargements]: (state, payload) => ({...state, printsEnlargements: payload}),
    [setStorageSubscription]: (state, payload) => ({...state, storageSubscription: payload}),
    [setGiftCard]: (state, payload) => ({...state, giftCard: payload}),
    [setTShirt]: (state, payload) => ({...state, tShirt: payload}),
    [setSheetFilm]: (state, payload) => ({...state, sheetFilm: payload}),
    [setFilmScanning]: (state, payload) => ({...state, filmScanning: payload}),

}, initialState);

export default main;
