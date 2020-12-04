import { config } from 'dotenv/types';
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import configData from '../environment';

export const isAuthenticated = async (req: Request, res: Response, next: NextFunction) => {
    console.log("-------HEADERS-------\n", req.headers);
    if(configData.env === 'test'){
        next();
    }else{
        if(req.headers.hasOwnProperty('authorization')){
            const token = req.headers.authorization || '';

            try{
                if(token){
                    const decoded = await jwt.verify(token, configData.secret_key);
                    if(decoded.hasOwnProperty('data')){
                        next();
                    }
                }
                else return res.status(403).json({message: "Forbidden Request !"});
            }catch(err){
                return res.status(500).json(err);
            }
        }
        else return res.status(401).json({message: "Unauthorized !"});
    }
}