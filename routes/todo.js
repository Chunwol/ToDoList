const jwt = require('jsonwebtoken');
const SECRET = 'Chunwol';
const Send = require('../models');
const sequelize = require("sequelize");
const Op = sequelize.Op;

exports.main_show = (req, res, next) => {
    try{
        let token = req.cookies.accessToken;
        if(typeof token !== 'undefined'){
            let decoded = jwt.verify(token.token, SECRET)
            if(token){
                console.log("인증성공");
                Send.user.findOne({
                    where: {userid: decoded.userid}
                })
                .then( result1 => {
                    Send.todos.findAll({
                        where:{
                            userid: {
                                [Op.like]: result1.id
                            }
                        }
                    })
                    .then( result2 => {
                        //console.log(result1);
                        //console.log(result2);
                        res.render('main', {todo : result2, user: result1});
                    })
                })
            }
        } else {
            console.log("로그인해주세요");
            res.redirect("/login");
        }
    }
    catch(err) {
        console.log("토큰 만료");
        res.redirect("/login");
    }
};
exports.main_insert = (req, res) => {
    let body = req.body;
    console.log(req.params.id);
    console.log(body.inputContent);
    Send.todos.create({
        userid: req.params.id,
        Contents: body.inputContent,
        finished: true
      })
      .then( result => {
        console.log("추가 완료");
        res.redirect("/main");
      })
      .catch( err => {
        console.log("추가 불가");
      })
}
exports.main_delete = (req, res) => {
    Send.todos.destroy({
        where: {id:  req.params.id}
      })
      .then( result => {
        res.redirect("/main")
      })
      .catch( err => {
        console.log("데이터 삭제 실패");
    });
}

exports.main_Contents_update = (req, res) => {
    let postID = req.params.id;
    let body = req.body;

    if (body.InputContents == '') {
        console.log("내용을 입력해주세요");
      }else{
        Send.todos.update({
        Contents: body.InputContents
      },{
        where: {id: postID}
      })
      .then( result => {
        console.log("데이터 수정 완료");
        res.redirect("/main");
      })
      .catch( err => {
        console.log("데이터 수정 실패");
      });
    }
}
exports.main_finished_update = (req, res) => {
    let postID = req.params.id;
    Send.todos.findOne({
        where: {id: postID}
    })
    .then( result => {
        let finished;
        if (result.finished) {
            finished = '0';
            console.log("참");
          }else{
            finished = '1';
            console.log("거짓");
          }
          console.log(finished);
          console.log(postID);
          Send.todos.update({
            finished: finished
          },{
            where: {id: postID}
          })
          .then( result => {
            console.log("데이터 수정 완료");
            res.redirect("/main");
          })
          .catch( err => {
            console.log("데이터 수정 실패");
          });
        })
        .catch( err => {
            console.log("데이터 수정 실패");
    });
}



exports.register = (req, res) => {
    let body = req.body;
    if (body.inputID == '' || body.inputPW == '' || body.inputName == '') {
      console.log("공백이 존재합니다");
    } else {
        Send.user.create({
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
    Send.user.count({
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
