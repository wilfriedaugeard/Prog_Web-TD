import App from './controller/app.js';
import MapGeoloc from './model/map.js';


/**
 * Main class.
 * @class
 */
class Main{
    /**
     * Launch {@link MapGeoloc} instance et {@link App} instance and active listeners.
     */
    constructor(){
        const map = new MapGeoloc();
        const app = new App(map);
        map.activeListener(app);
        app.activeAllListeners();
    }
}

// Useful for google map api
window.main = new Main();

