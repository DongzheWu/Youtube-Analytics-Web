"use strict";

const viewControls = require('../controls/viewControls');

module.exports = app => {
    //This function is triggered to check new view increased every day.
    app.get('/getNewView', (req, res) => {
        viewControls.getNewView();
        res.status(200).send();
    });
}