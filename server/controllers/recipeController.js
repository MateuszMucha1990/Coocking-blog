require('../models/database');
const Category = require('../models/Category');
const Recipe = require('../models/Recipe');

//Strona glowna
exports.homepage = async(req, res) =>{
    try {
        const limitNumber = 5
        const categories = await Category.find({}).limit(limitNumber);
        const latest = await Recipe.find({}).sort({_id:-1}).limit(limitNumber);
        const thai = await Recipe.find ({ 'category': 'Thai'}).limit(limitNumber);
        const american = await Recipe.find ({ 'category': 'American'}).limit(limitNumber);
        const chinese = await Recipe.find ({ 'category': 'Chinese'}).limit(limitNumber);
        

        const food = {latest,thai,american,chinese};


        res.render('index', {title:'Blog -strona głowna', categories, food});
    } catch (error) {
        res.status(500).send('err');
    }}


exports.exploreCategories = async(req, res) =>{
    try {
        const limitNumber = 20
        const categories = await Category.find({}).limit(limitNumber);
        res.render('categories', {title:'Blog -kategorie', categories});
    } catch (error) {
        res.status(500).send('err');
    }
}

exports.exploreCategoriesbyId = async(req, res) =>{
    try {
        let categoryId = req.params.id;
        const limitNumber = 20
        const categoryById = await Recipe.find({category: categoryId}).limit(limitNumber);
        res.render('categories', {title:'Blog -kategorie', categoryById});
    } catch (error) {
        res.status(500).send('err');
    }
}

exports.exploreRecipe = async(req, res) =>{
    try {
        let recipeId = req.params.id;

        const recipe = await Recipe.findById(recipeId);

        res.render('recipe', {title:'Blog -przepisy',recipe});
    } catch (error) {
        res.status(500).send('err');
    }
}


//Szukaj
exports.searchRecipe = async(req,res) => {

    try {
        let searchTerm = req.body.searchTerm;

        let recipe = await Recipe.find({ $text: {$search: searchTerm, $diacriticSensitive: true}})
      //  res.json(recipe)
      res.render('search', {title:'Blog -szukaj',recipe})

    } catch (error) {
        res.status(500).send('err');
    }
}



exports.exploreLatest = async(req, res) =>{
    try {
        const limitNumber = 20;
        const recipe = await Recipe.find({}).sort({ _id:-1 }).limit(limitNumber);
        res.render('explore-latest', {title:'Blog -ostatnio wyszukiwane',recipe});
    } catch (error) {
        res.status(500).send('err');
    }
}

exports.exploreRandom = async(req, res) =>{
    try {
        let count= await Recipe.find({}).countDocuments();
        let random = Math.floor(Math.random() * count );
        let recipe = await Recipe.findOne().skip(random).exec();
     

        res.render('explore-random', {title:'Blog -losowo wyszukane',recipe});
    } catch (error) {
        res.status(500).send('err');
    }
}


exports.submitRecipe = async(req, res) =>{
    const infoErrorObj = req.flash('infoErrors')
    const infoSubmitObj = req.flash('infoSubmit')

    res.render('submit-recipe', {title:'Blog -zamówienie',infoErrorObj, infoSubmitObj });
}

exports.submitRecipeOnPost = async(req, res) =>{
    let imageUploadFile;
    let uploadPath;
    let newImageName;

    if( !req.files || Object.keys(req.files).length === 0){
        console.log('No files');
    } else {
        imageUploadFile = req.files.image;
        newImageName = Date.now() + imageUploadFile.name;
        uploadPath = require('path').resolve('./') + '/public/uploads/' + newImageName;
        imageUploadFile.mv(uploadPath, function(err) {
            if (err) return res.status(500).send(err)
        })
    }


    try {
        const newRecipe = new Recipe({
            name:req.body.name,
            description:req.body.description,
            email: req.body.email,
            ingredients: req.body.ingredients,
            category: req.body.category,
            image: newImageName
        });

        await newRecipe.save();

        req.flash('infoSubmit', 'Przepis został dodany!');
        res.redirect('submit-recipe');
    
} catch (error) {
    req.flash('infoSubmit', error);
    res.redirect('submit-recipe');   
    };
}


        //delete
// async function deleteRecipe() {
//     try {
//         const res= await Recipe.deleteOne(
//            {name: 'jablko'});
//             res.n; //liczba obejrzeń 
//             res.nModified //liczba zmian
//     } catch (error) {
//         console.log('error update');
//     }
// }
// deleteRecipe();
        


//update
// async function updateRecipe() {
//     try {
//         const res= await Recipe.updateOne(
//             {  name:'Ciasto'}, {name: 'Nowe ciasto'});
//             res.n; //liczba obejrzeń 
//             res.nModified //liczba zmian
//     } catch (error) {
//         console.log('error update');
//     }
// }
// updateRecipe();
    
