function add(a, b){
    return a+b;
}

function sub(a, b){
    return a-b;
}

exports.add = (a,b)=>{a+b};
exports.sub = (a,b)=>{a-b};

module.exports = {sub,add};