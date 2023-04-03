import {Router} from "express";
import {IngredientRecord} from "../records/ingredient.record";


export const ingredientRouter = Router()

    .post('/', async (req, res) => {
        const ingredient = new IngredientRecord(req.body);
        await ingredient.insert();
        res.json(ingredient);
    })

    .delete('/:id', async (req, res) => {
        const ingredient = await IngredientRecord.delete(req.params.id);
        res.json(ingredient);
    })


    .get('/findOneEnergy/:id', async (req, res) => {
        const ingredients = await IngredientRecord.findOneEnergy(req.params.id);
        res.json(ingredients);
    })


    .get('/getSet/:id', async (req, res) => {
        const ingredients = await IngredientRecord.getSet(req.params.id);
        res.json(ingredients);
    })




