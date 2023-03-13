import {Router} from "express";
import {IngredientRecord} from "../records/ingredient.record";


export const ingredientRouter = Router()

    .post('/', async (req, res) => {
        const ingredient = new IngredientRecord(req.body);
        await ingredient.insert();
        res.json(ingredient);
    })

    .delete('/:id', async(req, res) =>{
        const ingredient = await IngredientRecord.delete(req.params.id);
        res.json(ingredient);
    })


    // .get('/search/:name?', async (req, res) => {
    //     const ads = await AdRecord.findAll(req.params.name ?? '');
    //     res.json(ads);
    // })
    //
    // .get('/:id', async (req, res) => {
    //     const ad = await AdRecord.getOne(req.params.id);
    //     res.json(ad);
    // })
    //

