module.exports = (io, { config, db }) => {
    require('./sessionManager')(io);
    require('./tableManager')(io);
};
