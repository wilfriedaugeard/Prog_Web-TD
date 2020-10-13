import App from './controller/app.js';
import MapGeoloc from './model/map.js';

function main(){
    const map = new MapGeoloc();
    const app = new App(map);
    map.activeListener(app);
    app.activeAllListeners();
}

// Useful for google map api
window.main = main();

