import {PermissionsAndroid, Platform} from 'react-native';

export function openUrl (url)
{
    SharedUtils.Linking.canOpenURL(url).then(supported =>
    {
        if (supported)
        {
            SharedUtils.Linking.openURL(url);
        }
        else
        {
            console.log("Don't know how to open URI: " + url);
        }
    });
}

export async function hasAndroidPermissionForCameraRoll ()
{
    const permission = PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE;

    const hasPermission = await PermissionsAndroid.check(permission);
    if (hasPermission) {
        return true;
    }

    const status = await PermissionsAndroid.request(permission);
    return status === 'granted';
}


export const SharedUtils =
{
    lazyLoadedModules : {
    },

    get Alert ()
    {
        if (!this.lazyLoadedModules["Alert"])
        {
            this.lazyLoadedModules["Alert"] = require('react-native').Alert;
        }

        return this.lazyLoadedModules["Alert"];
    },

    get Share ()
    {
        if (!this.lazyLoadedModules["Share"])
        {
            this.lazyLoadedModules["Share"] = require('react-native-share').default;
        }

        return this.lazyLoadedModules["Share"];
    },

    get Linking ()
    {
        if (!this.lazyLoadedModules["Linking"])
        {
            this.lazyLoadedModules["Linking"] = require('react-native').Linking;
        }

        return this.lazyLoadedModules["Linking"];
    },
};
