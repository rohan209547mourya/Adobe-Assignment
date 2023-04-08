const express = require('express');
const router = express.Router();
const {
    createUserHandler,
    getUserByIdHandler,
    updateUserHandler,
    deleteUserByIdHandler,
    loginUserHandler
} = require('../controller/userController')



/**
 * @route  /users
 * @method POST
 * @description Create new user
 */
router.post('/', createUserHandler);



/**
 * @route /users/auth
 * @method POST
 * @description Login user
 */
router.post('/auth/login', loginUserHandler)




/**
 * @route /users/:id
 * @method GET
 * @description Get user by id
 */
router.get('/:id', getUserByIdHandler);



/**
 * @route /users/:id
 * @method PUT
 * @description Update user by id
 */
router.put('/:id', updateUserHandler);


/**
 * @route /users/:id
 * @method DELETE
 * @description Delete user by id
 */
router.delete('/:id', deleteUserByIdHandler);

module.exports = router