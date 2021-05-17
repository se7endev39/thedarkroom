/**
 * @format
 */

import {AppRegistry} from 'react-native';
import Main from './App';
import {name as appName} from './app.json';

/*
const modules = require.getModules();
const moduleIds = Object.keys(modules);
const loadedModuleNames = moduleIds
.filter(moduleId => modules[moduleId].isInitialized)
.map(moduleId => modules[moduleId].verboseName);
const waitingModuleNames = moduleIds
.filter(moduleId => !modules[moduleId].isInitialized)
.map(moduleId => modules[moduleId].verboseName);

*/
// make sure that the modules you expect to be waiting are actually waiting
/*console.log(
    'loaded:',
    loadedModuleNames.filter(name => name.match('')).join(', '),
    '',
    '\n',
    '----------------------WAITING------------------------:',
    waitingModuleNames.filter(name => name.match('')).join(', ')
);*/

// grab this text blob, and put it in a file named packager/modulePaths.js
//console.log(`module.exports = ${JSON.stringify(loadedModuleNames.sort())};`);

AppRegistry.registerComponent(appName, () => Main);
