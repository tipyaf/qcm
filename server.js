/**
 * Created by yannickbenchimol on 30/08/2016.
 */
var express = require('express'),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose'),
    path = require('path'),
    mediaSchema = mongoose.Schema({
        contentType: String,
        data: Buffer
    }),
    choicesSchema = mongoose.Schema({
        id: Number,
        choice: String,
        media: [mediaSchema],
        value: Boolean
    },{_id : false}),
    questionsSchema = mongoose.Schema({
        title: String,
        choices: [choicesSchema],
        label: String,
        file: Buffer
    }),
    app = express(),
    port = process.env.PORT || 3000,
    Question = mongoose.model('Question', questionsSchema),
    optionsStatic = {
    extensions: ['css', 'html', 'js', 'json', 'png', 'jpg', 'mp3']
    },
    router = express.Router();
    src = express.Router();

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(express.static((__dirname)));


// q promise plug in
mongoose.Promise = require('q').Promise;
// assert.ok(query.exec() instanceof require('q').makePromise);

mongoose.connect('mongodb://localhost/questionsTest');


router.route('/')
    .get(function (req, res) {
        Question.find(function (err, questions) {
            if(err){
                res.send(err)
            }
            res.send(questions);
        })
    })
    .post(function (req,res) {
        var question = new Question();
        question.title = req.body.title;
        question.choices = req.body.choices;
        question.label = req.body.label;

        question.save(function (err) {
            if(err){
                res.send(err)
            }
            res.send({message: 'La question a été crée'})

        });

    });

router.route('/:question_id')
    .delete(function (req,res) {
        Question.remove({_id: req.params.question_id}, function (err) {
            if(err){
                res.send(err)
            }
            res.send({message: 'La question a été supprimée'})
        });
    });

app.use('/api', router);


app.listen(port, function () {
    console.log('Le serveur écoute le port: ' + port)
});

// TODO: ADD question in choice issue (don't always write it)