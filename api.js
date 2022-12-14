const _ = require('lodash');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const config = require('./config.json');
const bcrypt = require('bcrypt-nodejs');

const { Op, User, UserRole, Role, Worksheet, File } = require('./models');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));


const router = express.Router();

router.get('/checkLogin', bodyParser.json(), async(req, res, next)=>{
    if (req.session && req.session.username !== req.body.username) {
        res.status(200).json({ userData: req.session });
    } else {
        res.status(401).json({ message: 'User is not logged in!' });
    }
});

router.post('/logout', (req, res) => {
    console.log(req.session.username);
    req.session = null;
    res.status(200).json({ status: 200 });
});

router.post('/login', bodyParser.json(),  async (req, res) => {
    const { username, email, password } = req.body;
    res.header('Allow-Origin-With-Credentials', 'true');
    console.log('loginServer');

    try {
      const userData = await User.findOne({ where : { [Op.or]: [
          { username: username },
          { email: username }
        ]
      }, include: UserRole });
      if (userData) {
        if (bcrypt.compareSync(password, userData.password)) {
          const role = await Role.findOne({ where: { role_id: userData.UserRoles[0].role_id } });

          if (role) {
            req.session = req.session || {};
            req.session.username = username;
            req.session.userId = userData.user_id;
            req.session.email = email;
            req.session.role = role.name;
            req.session.first_name = userData.first_name;
            req.session.last_name = userData.last_name;
            req.session.transportation_access = userData.transportation_access;
            req.session.fromLogin = true;

            res.status(200).json({ userData});
          } else {
            res.status(400).json({ message: 'You are not assigned any Role. Please contact us at info@greenninja.org for assistance.' });
          }
        } else {
          res.status(400).json({ message: 'Invalid Password!' });
        }
      } else {
        res.status(404).json({
          message: `Cannot find User with username = ${username} or email = ${email}.`
        });
      }
    } catch (err) {
      res.status(500).json({ Error: err });
      console.error('Error Message: ', err);
    }
  });

  router.post('/logout', (req, res) => {
    console.log(req.session.username);
    req.session = null;
    res.status(200).json({ status: 200 });
  });

  router.get('/worksheet/:modelId/:unitId/:lessonId', async (req, res) => {

    const {modelId, unitId, lessonId}=req.params;

    const userWorksheet=[
        {worksheet_id: 1654, lesson_id: 202, unit_id: 17, model_id: 11},
        {worksheet_id: 1656, lesson_id: 202, unit_id: 17, model_id: 11},
        {worksheet_id: 1657, lesson_id: 202, unit_id: 17, model_id: 11},
        {worksheet_id: 1659, lesson_id: 202, unit_id: 17, model_id: 11},
        {worksheet_id: 1660, lesson_id: 202, unit_id: 17, model_id: 11},
    ];

    const data=await Worksheet.findAll({
        where: {},
        limit: 10,
        include: File,
        offset: 1000,
        order: [
            ['worksheet_id', 'ASC']
        ],
    });

    res.json(data.map(item=>{
        //return item;
        return {
            name: item.File.originalname,
            path: userWorksheet.find(uw=>uw.worksheet_id==item.worksheet_id && uw.lesson_id==lessonId && uw.unit_id==unitId && uw.model_id==modelId) ? item.path.replace('http://greenninja.org', 'https://app.greenninja.org') : undefined
        };
    }));
  });

module.exports = router;
