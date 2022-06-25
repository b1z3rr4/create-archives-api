const shortid = require('shortid');

function idGenerator(name){
    const short = shortid()
    const id = `${name}${short}`
    return id;
}

module.exports = { idGenerator }