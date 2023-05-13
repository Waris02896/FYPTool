const { db } = require('../../utils/sequlize');
const users = db.Users;
const bcrypt = require('bcryptjs');
const mail = require("../../data/models/Auth/mail");
const { _sendMail } = require('../../utils/send_email');

exports.signup = async (req, res) => {

    const reqData = req.body;

    if (reqData.user.password == reqData.user.confirmPassword) {
        reqData.user.password = await bcrypt.hashSync(reqData.user.password, await bcrypt.genSaltSync(parseInt(process.env.SALT)));

        let user_id;
        let usersRecord = await users.findAll(
            {
                limit: 1,
                order: [
                    [
                        'createdAt', 'DESC'
                    ]
                ]
            }
        )
            .then((usersRecord) => {
                if (usersRecord.length >= 1) {
                    let user = usersRecord[0].user_id.split('-')
                    user_id = (parseInt(user[user.length - 1]) + 1).toString().padStart(8, 0);
                } else if (usersRecord.length == 0) {
                    user_id = (0).toString().padStart(8, 0)
                }
            })

        // reqData.user.email = reqData.user.firstname.substring(0,3)+user.lastname.substring(0,3) + 

        let data = await users.findOrCreate({
            where: {
                email: reqData.user.email
            },
            defaults: {
                user_id: `${reqData.user.firstname.substring(0, 3)}-${reqData.user.lastname.substring(0, 3)}-${user_id}`,
                firstname: reqData.user.firstname,
                lastname: reqData.user.lastname,
                fullname: `${reqData.user.firstname} ${reqData.user.lastname}`,
                email: reqData.user.email,
                password: reqData.user.password,
                pic: reqData.user.pic,
                verified: false,
            },
            attributes: { exclude: 'password' }
        })
            .then(async (data) => {

                if (data[1] == false) {
                    return res.status(200).json({
                        data: {
                            response: "This email is already registered",
                            User: data
                        }
                    })
                } else if (data[1] == true) {


                    mail.to = data[0].email;
                    mail.subject = "Verification for FYP Management System";
                    mail.body = `${process.env.BASEURL}/verifyaccount?id=${data[0].user_id}`;
                    console.log(mail)
                    try {
                        await _sendMail(mail)
                    } catch (error) {
                        return res.status(error.status || 500).json({
                            error: {
                                errorMessage:"Verification Mail not sent",
                                error
                            }
                        })
                    }

                    return res.status(200).json({
                        data: {
                            response: "Account created successfully. Please check email for Account verification",
                            User: data
                        }
                    })
                }
            })
            .catch((err) => {
                return res.status(err.status || 500).json({
                    error: {
                        errorMessage: "Account create Unsuccessful",
                        err
                    }
                })
            })
    }
}

// exports.createBulkUsers = async (req, res) => {
//     let reqData = req.body;
    
//     let data = users.bulkCreate(
//         reqData.users
//     )
// }