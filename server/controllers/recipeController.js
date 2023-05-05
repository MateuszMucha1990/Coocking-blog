

//Strona glowna
exports.homepage = async(req, res) =>{
    res.render('index', {
        title:'Blog -strona głowna'
    });
}