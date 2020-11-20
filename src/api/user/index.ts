import express from 'express';
import {
    create,
    index,
    update,
    remove
}   from './user.controller';

let userRouter = express.Router();

userRouter.post('/create', create);
userRouter.get('/', index);
userRouter.put('/:id', update);
userRouter.delete('/:id', remove);

export default userRouter;