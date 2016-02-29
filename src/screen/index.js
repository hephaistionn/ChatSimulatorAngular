module.exports = app => {

    require('./controller')(app);
    require('./service')(app);

};
