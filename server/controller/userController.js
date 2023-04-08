const { User, validateUser } = require('../model/UserModel');
const bcrypt = require('bcrypt');




// Create new user handler
const createUserHandler = async (req, res, next) => {

    const requestData = req.body;
    const isDataValid = validateUser(requestData);


    if (isDataValid.error) {
        return res.status(400).json({
            status: "Bad Request",
            code: 400,
            message: isDataValid.error.details[0].message
        })
    }

    const isUserExist = await User.findOne({ email: requestData.email });
    if (isUserExist) {
        return res.status(400).json({
            status: "Bad Request",
            code: 400,
            message: "User already exist"
        })
    }

    const user = new User({
        name: requestData.name,
        email: requestData.email,
        password: requestData.password
    })

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);

    try {
        await user.save();
    }
    catch (err) {
        next(err);
    }

    const token = user.generateAuthToken();


    res.status(201).json({
        message: "User has been registed successfully",
        code: 201,
        token: token,
        data: {
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
                bio: user.bio,
                role: user.role,
            }
        }
    })
}


// Login user handler
const loginUserHandler = async (req, res, next) => {

    const requestData = req.body;

    if(!requestData.email || !requestData.password) {
        return res.status(400).json({
            status: "Bad Request",
            code: 400,
            message: "Please provide email and password"
        })
    }

    const user = await User.findOne({email: requestData.email});

    if(!user) {
        return res.status(400).json({
            status: "Bad Request",
            code: 400,
            message: "User not found, invalid email id!"
        })
    }

    const isPasswordValid = await bcrypt.compare(requestData.password, user.password);

    if(!isPasswordValid) {
        return res.status(400).json({
            status: "Bad Request",
            code: 400,
            message: "Invalid password"
        })
    }

    const token = user.generateAuthToken();

    res.status(200).json({
        message: "User has been logged in successfully",
        code: 200,
        token: token,
        data: {
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
                bio: user.bio,
                profileImage: user.profileImage
            }
        }
    })
}


// Add profile image handler
const addProfileImageHandler = async (req, res, next) => {
    
    const user = await User.findByIdAndUpdate(req.user._id, {
        profileImage: req.body.profileImage
    }, {new: true});

    res.status(200).json({
        message: "Profile image has been added successfully",
        code: 200,
        data: {
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
                bio: user.bio,
                profileImage: user.profileImage
            }
        }
    })
}


// Get User by id handler
const getUserByIdHandler = async (req, res) => {

    const user = await User.findById(req.user._id);

    res.status(200).json({
        message: "User has been fetched successfully",
        code: 200,
        data: {
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
                bio: user.bio,
                profileImage: user.profileImage
            }
        }
    })

}


// Update user handler
const updateUserHandler = async (req, res) => {
}


// Delete user by id handler
const deleteUserByIdHandler = async (req, res) => {
}



module.exports = {
    createUserHandler,
    getUserByIdHandler,
    updateUserHandler,
    deleteUserByIdHandler,
    loginUserHandler,
    addProfileImageHandler
}

