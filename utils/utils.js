const jwt = require('jsonwebtoken')
const db = require('../db/connection')
const User = require('../model/User')
const Post = require('../model/Post')

module.exports = {
    verifyToken: (req, res, next) => {
        const bearerHeader = req.headers['authorization'];

        if (typeof bearerHeader != 'undefined') {
            const bearer = bearerHeader.split(' ');

            const bearerToken = bearer[1];
            req.token = bearerToken;

            next();
        } else {
            res.sendStatus(403)
        }

    },
    createPost: (req, res, next) => {

        let post = new Post(req.body);

        let titulo = post.titulo;
        let descricao = post.descricao;
        let imagem = post.imagem;


        jwt.verify(req.token, 'secretkey', (err, authData) => {
            if (err) {
                res.sendStatus(403);
            } else {
                let query = `insert into post (titulo,descricao,imagem) values ('${titulo}','${descricao}','${imagem}')`;
                db.execSQLQuery().query(query, function (error, results, fields) {
                    if (error)
                        res.json(error);
                    else
                        res.json(results);

                });
                db.execSQLQuery().end();
            }
        })
    },
    findPost: (req, res, next) => {
        jwt.verify(req.token, 'secretkey', (err, authData) => {
            if (err) {
                res.sendStatus(403);
            } else {
                let query = "select * from post";
                db.execSQLQuery().query(query, function (error, results, fields) {
                    if (error)
                        res.json(error);
                    else {

                        res.json(results);
                    }
                    db.execSQLQuery().end();
                });

            }
        })
    },
    findLogin: (req, res, next) => {

        let user = new User(req.body);

        let email = user.email;
        let senha = user.senha;

        let query = "select * from usuario";
        db.execSQLQuery().query(query, function (error, results, fields) {
            if (error)
                res.json(error);
            else {
                results.map(result => {
                    if ((email == result.email && senha == result.senha)) {
                        jwt.sign({ user }, 'secretkey', { expiresIn: '30s' }, (err, token) => {
                            res.json({
                                token
                            })
                        })
                    }
                })
            }
            db.execSQLQuery().end()
        });

    },
    createLogin: (req, res, next) => {
        let user = new User(req.body);
        let login = user.email;
        let senha = user.senha;
        let query = `insert into usuario (email,senha) values ('${login}','${senha}')`;
        db.execSQLQuery().connect((err) => {
            if (err) {
                console.log(err);
            }
            db.execSQLQuery().query(query, function (error, results, fields) {
                if (error)
                    res.json(error);
                else {
                    res.json({ results })
                }

            })
        })
        db.execSQLQuery().end();

    }

}