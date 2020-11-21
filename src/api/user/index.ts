import express from 'express';
import {
    register,
    index,
    update,
    remove,
    signin
}   from './user.controller';
import * as middleware from '../../middleware';

let userRouter = express.Router();

userRouter.post('/register', register);
userRouter.get('/', middleware.isAuthenticated, index);
userRouter.put('/:id', middleware.isAuthenticated, update);
userRouter.delete('/:id', middleware.isAuthenticated, remove);
userRouter.post('/signin', signin);

export default userRouter;