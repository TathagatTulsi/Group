const Users = require("../models/UserModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
// const { userSchema, loginSchema } = require("./joiValidation");
const nodemailer = require("nodemailer")
exports.Register = async (req, res) => {
  // //joi validation
  // const { error } = userSchema.validate(req.body);
  // if (error) return res.status(400).send(error.details[0].message);

  const { name, lastname, email, password, confPassword } = req.body;
  try {
    const find = await Users.findOne({
      where: { email },
    });

    if (find) {
      return res.status(200).json({ success: false, msg: "Already account" });
    }

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);

    const NewUser = await Users.create({ name, lastname, email, password: hash });
    const token = jwt.sign({ user: NewUser }, process.env.REFRESH_TOKEN_SECRET);

    return res.status(200).json({ success: true, msg: "Successfully!!", token: token });
  } catch (error) {
    console.log(error);
    return res.status(404).json({ msg: error });
  }
}

exports.Login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const find = await Users.findOne({
      where: {
        email,
      },
    });

    if (find) {
      const compare = bcrypt.compareSync(password, find.password);

      if (compare) {
        const token = jwt.sign({ user: find }, process.env.REFRESH_TOKEN_SECRET);

        return res.status(200).json({ success: true, msg: "Login successfull!!", token: token,});
      }
      else {
        return res.status(400).json({success: false, msg: "New password and confirm Password Not match"})
      }
    }
  } catch (error) {
    console.log(error);
    return res.status(404).json({ msg: error });
  }
}

function generatePassword(length) {
  const characters = '0123456789';
  let password = '';
  for (let i = 0; i < 8; i++) {
    const index = Math.floor(Math.random() * characters.length);
    password += characters[index];
  }
  return password;
}

exports.forgot = async(req, res) =>{
  try {
    const {email} = req.body;
    // console.log(email)
    const user = await Users.findOne({
      where: { email }
    })
    if(!user){
      return res.status(404).json({ msg: "User Not Found" });
    }

    const randomPassword = generatePassword();
    console.log(randomPassword)

    const salt = await bcrypt.genSalt(10)
    const hashPassword = await bcrypt.hash(randomPassword,salt)
    const updatePassword = await Users.update({password:hashPassword},{where : {email:email}})

  
    let transporter = await nodemailer.createTransport({
      service: "gmail",
      port: 587,
      //secure: false, // true for 465, false for other ports
      auth: {
        user: 'onlytulsi.1@gmail.com',
        pass: 'wyjcrudwsretxwug'
      },
    });
    
    const mailOptions = {
      from: '<onlytulsi.1@gmail.com>',
      to: email,
      subject: "Your reset passwrd",
      text: `Your password is : ${randomPassword}`,
    };
  
      await transporter.sendMail(mailOptions);
      res.status(200).json({success: true, msg: "Password sent successfully"})
      // console.log('OTP sent successfully:', info.response);

  } catch (error) {
    
  }
}


exports.changepassword = async (req, res) =>{
  try {
    const {email, password, newPassword, confirmPassword} = req.body;
    if(newPassword !== confirmPassword){
      return res.status(400).json({err: "New password and confirm Password Not match"})
    }
    const user = await Users.findOne({ where: { email:email } })

    if(user){
      const valid = await bcrypt.compare(password, user.password)
      if(valid){
        
        const salt = bcrypt.genSaltSync(10)
        const hashPassword = bcrypt.hashSync(newPassword,salt)
  
        await user.update({password:hashPassword},{where : {email:email}})
        return res.status(200).json({success: true, msg: "Verified Successfully"})
      }

    }
  } catch (error) {
    console.log(error)
  }
}