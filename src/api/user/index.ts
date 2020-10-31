import express from 'express';
import {
    create
}   from './user.controller';

let userRouter = express.Router();

userRouter.post('/', create);

export default userRouter;