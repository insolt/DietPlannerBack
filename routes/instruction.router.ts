import {Router} from "express";
import {InstructionRecord} from "../records/instruction.record";
import {IngredientRecord} from "../records/ingredient.record";


export const instructionRouter = Router()

    .post('/', async (req, res) => {
        const instruction = new InstructionRecord(req.body);
        await instruction.insert();
        res.json(instruction);
    })


    .delete('/:id', async(req, res) =>{
        const instruction = await InstructionRecord.delete(req.params.id);
        res.json(instruction);
    })


    .get('/getSet/:id', async (req, res) => {
        const instruction = await InstructionRecord.getSet(req.params.id);
        res.json(instruction);
    })

