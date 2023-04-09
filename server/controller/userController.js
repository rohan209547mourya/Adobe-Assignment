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
                role: user.role,
                email: user.email,
                bio: user.bio,
                profileImage: user.profileImage
            }
        }
    })
}


// Add profile image handler
const addProfileImageHandler = async (req, res, next) => {
    

    let user = await User.findById(req.params.id);

    if (!user) {
        return res.status(404).json({
            status: "Not Found",
            code: 404,
            message: "User not found"
        })
    }

    user.profileImage = req.body.profileImage;
    user.updated_at = new Date();


    user = await user.save();

    res.status(200).json({
        message: "Profile image has been added successfully",
        code: 200,
        data: {
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
                bio: user.bio,
                profileImage: user.profileImage,
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
                profileImage: user.profileImage,
                likedPosts: user.likedPosts
            }
        }
    })

}


// Update user handler
const updateUserHandler = async (req, res) => {

    const requestData = req.body;
    const { id } = req.params;

    let user = await User.findById(id);

    if (!user) {
        return res.status(404).json({
            status: "Not Found",
            code: 404,
            message: "User not found"
        })
    }

 
    if(requestData.bio !== null && requestData.bio !== undefined) {
        user.bio = requestData.bio ;
    } 

    if(requestData.name !== null && requestData.bio !== undefined) {
        user.name  = requestData.name;
    } 

    user.updated_at = new Date();
    
    user = await user.save();

    res.status(200).json({
        message: "User has been updated successfully",
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


// Delete user by id handler
const deleteUserByIdHandler = async (req, res) => {

    const { id } = req.params;

    const user = await User.findByIdAndDelete(id);

    if (!user) {
        return res.status(404).json({
            status: "Not Found",
            code: 404,
            message: "User not found"
        })
    }

    res.status(200).json({
        message: "User has been deleted successfully",
        code: 200,
    })

}



module.exports = {
    createUserHandler,
    getUserByIdHandler,
    updateUserHandler,
    deleteUserByIdHandler,
    loginUserHandler,
    addProfileImageHandler
}

