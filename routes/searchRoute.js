"use strict";

const {google} = require('googleapis');
const keys = require('../config/keys');
const searchControls = require('../controls/searchControls');

module.exports = app => {

    //Handle search request, call google api to grab related videos' information
    app.post("/search", async function(req, res){
        if(!req.user.googleId){
            res.status(401).json({ error: 'login-required'});
        }

        try{
            const response = await searchControls.searchVideoList(req.body.term);
            res.status(200).send(response);
        }catch(error){
            res.status(503).json({ error: 'unavailable'});
        }
    });
};