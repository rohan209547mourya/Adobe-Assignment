const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../index');
const { User } = require('../model/UserModel')
const bcrypt = require('bcrypt');
const expect = chai.expect;

chai.use(chaiHttp);
