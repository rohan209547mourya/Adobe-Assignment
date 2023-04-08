const express = require('express');
const router = express.Router();


const { createUserHandler, getUserByIdHandler, updateUserHandler, deleteUserByIdHandler } = require('../controller/userController')





/**
 * @route  /users
 * @method POST
 * @description Create new user
 */
router.post('/user', createUserHandler);



/**
 * @route /users/:id
 * @method GET
 * @description Get user by id
 */
router.get('/user/:id', getUserByIdHandler);



/**
 * @route /users/:id
 * @method PUT
 * @description Update user by id
 */
router.put('/user/:id', updateUserHandler);


/**
 * @route /users/:id
 * @method DELETE
 * @description Delete user by id
 */
router.delete('/user/:id', deleteUserByIdHandler);