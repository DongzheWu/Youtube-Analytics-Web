const topicControls = require('../controls/topicControls')

module.exports = app => {
    
    //Get saved trend topics from mongoDB.
    app.get("/topics", async function(req, res){
        if(!req.user.googleId){
            res.send();
        }

        const saveTopics = await topicControls.getSavedTopics(req.user.googleId);

        if(!saveTopics){
            res.send();
        }
        res.status(200).json(saveTopics.topicList);
    });

    //Post a new topic for trend.
    app.post("/topics", async function(req, res){
        if(!req.user.googleId){
            res.status(401).json({ error: 'login-required'});
        }
        
        const topic = req.body.topic;

        //Check if topic is empty.
        const error = topicControls.checkTopic(topic);

        if(error){
            res.status(403).json(error);
        }

        const newTopic = await topicControls.saveTopic(topic, req.user.googleId);

        res.status(200).json(newTopic);
    })
    
    //Delete specific topic.
    app.delete("/topics/:topicid", async function(req, res){
        if(!req.user.googleId){
            res.status(401).json({ error: 'login-required'});
        }

        const topicId = req.params.topicid;
        await topicControls.deleteTopic(topicId, req.user.googleId);
        res.status(200).json({});
    })

}