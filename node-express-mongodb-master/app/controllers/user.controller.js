const db = require("../models");
const User = db.user;

exports.registerNewUser = async (req, res) => {
  try {
      let u = new User({
          name: req.body.name,
          phoneNumber: req.body.phoneNumber,
          email: req.body.email.toLowerCase()
      });

      u.password = await u.hashPassword(req.body.password);
      let createdUser = await u.save();
      res.status(200).json({
          msg: "New user created",
         // data: createdUser
      })
  } catch (err) {
      console.log(err)
      res.status(500).json({
          error: err
      })
  }
};

exports.loginUser = async (req, res) => {
  const login = {
      email: req.body.email.toLowerCase(),
      password: req.body.password
  }
  
  try {
      let u = await User.findOne({
          email: login.email
      });
      //check if user exit
      if (!u) {
          res.status(400).json({
              type: "Not Found",
              msg: "Wrong Login Details"
          });
          return;
      }
      let match = await u.compareUserPassword(login.password, u.password);
      if (match) {
          let token = await u.generateJwtToken({
              u
          }, "secret", {
              expiresIn: 604800
          })
          if (token) {
              res.status(200).json({
                  success: true,
                  token: token,
                  userCredentials: u
              })
          }
      } else {
          res.status(400).json({
              type: "Not Found",
              msg: "Wrong Login Details"
          })
      }
  } catch (err) {
      console.log(err)
      res.status(500).json({
          type: "Something Went Wrong",
          msg: err
      })
  }
};