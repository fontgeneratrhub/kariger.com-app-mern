const { User } = require("../Schemas/userSchema");

var ObjectId = require("mongodb").ObjectId;

const env = require("dotenv").config();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
// import jwt from 'jsonwebtoken'
const connection = require("../dbConnection");
const emailvalidator = require("email-validator");
// var bodyParser = require('body-parser')
//  var jsonParser = bodyParser.json()

module.exports = {
  addUser: async (req, res) => {
    try {
      let { name, email, password, confirmPassword } = req.body;
      // let user = connection();
      // console.log(name, 'name');
      // console.log(email, 'email');
      // console.log(password, 'password');
      // console.log(confirmPassword, 'confirmPassword');

      // check all fields are filled or not
      if (!name || !email || !password || !confirmPassword) {
        return res.status(400).send({
          message: "All fields are Required",
        });
      } else {
        // Check email formate vaildation
        if (emailvalidator.validate(req.body.email)) {
          // check entered email is sexist in our database or not
          // let user = connection();

          let user = await User.findOne({ email: email });
          if (user) {
<<<<<<< Updated upstream
            res.status(400).send({ message: "Email already exist" });
=======
            res
              .status(400)
              .send({ status: "failed", message: "Email already exist" });
>>>>>>> Stashed changes
            console.log("Email already exist");
          } else {
            // check password and confirm are same Or not
            if (password !== confirmPassword) {
              res.status(400).send({
                message: "Password must match with Confirm Password",
              });
            } else {
              // encrypt the user passsword for securituy and save New User Successfully

              const salt = await bcrypt.genSalt(Number(process.env.SALT));
              const hashpswd = await bcrypt.hash(password, salt);
              const newUser = new User({
                name: name,
                email: email,
                password: hashpswd,
              });
              await newUser.save();
              console.log("User Added");
<<<<<<< Updated upstream

              // Generate JWT Token
              const token = jwt.sign(
                { userID: newUser._id },
                process.env.JWT_SECRET_KEY,
                { expiresIn: "2d" }
              );

              res.status(200).send({
                message: "Registered Successfully",
                token: token,
=======
              res.status(200).send({
                status: "success",
                message: "Registered Successfully",
>>>>>>> Stashed changes
                user: newUser,
              });
            }
          }
        } else {
          res.status(400).send({
            message: "Invalid Email",
          });
          console.log("Invalid Email");
        }
      }
    } catch (e) {
      console.log(e);
      res.status(500).send({ message: "Server Error", Error: e });
    }
  },

  // login
  getUser: async (req, res) => {
    try {
      const { email, password } = req.body;

      console.log(email);
      console.log(password);
      //   if (email && password) {

      if (!email || !password) {
<<<<<<< Updated upstream
        return res.status(400).send({
          message: "All fields are Required",
        });
=======
        return res
          .status(400)
          .send({ status: "failed", message: "All fields are Required" });
>>>>>>> Stashed changes
      } else {
        if (emailvalidator.validate(req.body.email)) {
          // let user = connection();
          let user = await User.findOne({ email: email });
          if (user != null) {
            const isMatch = await bcrypt.compare(password, user.password);
            console.log("Password match", isMatch);

            if (user.email === email && isMatch) {
              // Generate JWT Token
              const token = jwt.sign(
                { userID: user._id },
                process.env.JWT_SECRET_KEY,
                { expiresIn: "2d" }
              );

              res.status(200).send({
<<<<<<< Updated upstream
=======
                status: "success",
>>>>>>> Stashed changes
                message: "Login Success",
                token: token,
                user: user,
              });
            } else {
              res.status(400).send({
<<<<<<< Updated upstream
=======
                status: "failed",
>>>>>>> Stashed changes
                message: "Email or password is not Valid",
              });
            }
          } else {
            res.status(400).send({
<<<<<<< Updated upstream
=======
              status: "failed",
>>>>>>> Stashed changes
              message: "Email or password is not Valid",
            });
          }
        } else {
          res.status(400).send({
            message: "Invalid Email",
          });
          console.log("Invalid Email");
        }
      }
    } catch (e) {
      console.log(e);
      res.status(500).send({ message: "Server Error", Error: e });
<<<<<<< Updated upstream
=======
    }
  },

  // show  all Users
  getAllUsers: async (req, res) => {
    try {
      let user = await User.find();
      // console.log(getresult);

      if (user) {
        res.status(200).send({ status: "success", user: user });
      } else {
        res.status(400).send({ status: "failed", message: "No User found" });
      }
    } catch (e) {
      res.status(500).send({ message: "Server Error", Error: e });
      console.log(e);
    }
  },

  getUserById: async (req, res) => {
    try {
      const id = req.params.id;
      let user = await User.findById(id);
      // console.log(getresult);

      if (user) {
        res.status(200).send({ status: "success", user: user });
      } else {
        res.status(400).send({ status: "failed", message: "No User found" });
      }
    } catch (e) {
      res.status(500).send({ message: "Server Error", Error: e });
      console.log(e);
>>>>>>> Stashed changes
    }
  },

  updateUser: async (req, res) => {
    try {
      const _id = req.params.id;
      console.log(_id);
      // let updateResult = connection();

      let updateResult = await User.findByIdAndUpdate(_id, req.body, {
        new: true,
      });

      if (updateResult) {
        res.status(200).send({
          status: "success",
          message: "User updated",
          User: updateResult,
        });
      } else {
        res.status(400).send({ message: "User not found" });
      }
    } catch (e) {
<<<<<<< Updated upstream
      res.status(500).send({
        message: "Server Error",
        Error: e,
      });
=======
      res.status(500).send(e);
>>>>>>> Stashed changes
    }
  },

  deleteUser: async (req, res) => {
    try {
      const _id = req.params.id;
      // let deletedResult = connection();
      let deletedResult = await User.findByIdAndDelete(_id);
      if (deletedResult) {
        res.status(200).send({
          message: "User deleted",
          User: deletedResult,
        });
      } else {
        res.status(400).send({ message: "User not found" });
      }
    } catch (e) {
<<<<<<< Updated upstream
      res.status(500).send({
        message: "Server Error",
        Error: e,
      });
=======
      res.status(500).send(e);
>>>>>>> Stashed changes
    }
  },

  // Logout user
  //  logoutUser: async (req, res) =>
  //  {
  //      console.log('req.user: ', req.user);
  //      const token = req.headers.authorization.split(' ')[1];
  //      console.log(token,'token');

  //      try {
  //      await jwt.destroy(token);
  //      res.status(200).json({ message: 'your are Successfully deleted' });
  //      } catch {
  //      res.status(200).json({ message: 'something wrong' });
  //      }
  //  },

  // getUser: async(req,res)=>{
  //     try{
  //        let getresult=  connection();
  //           getresult= await User.find()
  //         // console.log(getresult);
  //        res.send(getresult)
  //     }catch(e)
  //     {
  //         console.log(e);
  //         res.status(400).send({  "message": "Server Error", "Error": e })
  //     }
  // },

  // getAllUser: async(req,res)=>{
  //     try{
  //        let getresult=  connection();
  //           getresult= await User.find()
  //         // console.log(getresult);
  //        res.send(getresult)
  //     }catch(e){console.log(e);}
  // },

  // getUserById:  async(req,res)=>{
  //     try{
  //         const _id = req.params.id;
  //         console.log(_id);
  //         const getIndividualResult = await User.findById(_id)
  //         // console.log(getIndividualResult,"user")
  //         res.status(201).send(getIndividualResult)
  //     }catch(e){res.send(e);}
  // },
};
