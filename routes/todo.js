const jwt = require('jsonwebtoken');
const SECRET = 'SECRET';
const User = require('../models');

exports.main_accesschack = (req, res, next) => {
    try{
        let token = req.cookies.accessToken;
        if(typeof token !== 'undefined'){
            let decoded = jwt.verify(token.token, SECRET)
            if(token){
                console.log("로그인성공");
                //console.log(decoded.userid);
                res.render('main', decoded.userid);
                //
            }
        }else{
            console.log("로그인해주세요");
            res.redirect("/login");
        }
    }catch(err) {
        console.log("토큰 만료");
        res.redirect("/login");
    }
};



exports.register = (req, res) => {
    let body = req.body;
    if (body.inputID == '' || body.inputPW == '' || body.inputName == '') {
      console.log("공백이 존재합니다");
    }else{
    User.user.create({
      userid: body.inputID,
      password: body.inputPW,
      name: body.inputName
    })
    .then( result => {
      console.log("회원가입 완료");
      res.redirect("/login");
    })
    .catch( err => {
      console.log("중복된 사용자가 존재합니다.");
    })
    }
}

exports.login = (req, res) => {
    let body = req.body;
    User.user.count({
    where: {userid: body.inputID, password: body.inputPW}
    })
    .then(result => {
    if(result === 1) {
    const token = jwt.sign({
    userid : body.inputID
    }, SECRET, {
    algorithm: 'HS256',
    expiresIn: '60m'
    })
    res.cookie('accessToken', {token: token});
    console.log("로그인 성공.");
    res.redirect("/main");
    } else {
    console.log("로그인 실패.");
    }
    })
    .catch(err => {
    console.log("로그인 실패.");
    })
}