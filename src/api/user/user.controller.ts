import { Request, Response } from 'express';
import User from './user.model';

export const update = async (req: Request, res: Response) => {
    console.log("req: ", req.body);
    try{
        let id = req.params.id;
        let body = req.body;
        let response = await User.findByIdAndUpdate(id, body);
        return res.status(201).json(response);
    }catch(err){
        return res.status(500).json({message: err})
    }
}

export const index = async (req: Request, res: Response) => {
    console.log("req: ", req.body);
    try{
        let users = await User.find({});
        return res.status(200).json({data: users});
    }catch(err){
        return res.status(500).json({message: err})
    }
}

export const create = async (req: Request, res: Response) => {
    console.log("req: ", req.body);
    let body = req.body;
    try{
        const response = await User.create(body);
        return res.status(201).json({success: response});
    }catch(err){
        return res.status(500).json({message: err})
    }
}

export const remove = async(req: Request, res: Response) => {
    try{
        let id = req.params.id;
        let body = req.body;
        let response = await User.findByIdAndDelete(id, body);
        return res.status(200).json(response);
    }catch(err){
        return res.status(500).json({message: err})
    }
}