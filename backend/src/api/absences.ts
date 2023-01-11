import { Request } from "express";
import { APIBase } from "../lib/apiBaseNew";
import { APISystem } from "../lib/apiSystem";
import { IAPIResponse } from "../interfaces/IAPIResponse";
import { Core } from "../lib/core";
import { DBAdmin } from "../entities/admin";
import { DBProffessor } from "../entities/professor";
import { DBStudent } from "../entities/student";
import { DBToken } from "../entities/token";
const bcrypt = require('bcrypt');
const BCRYPT_SALTS = 12;

export class AbsenceAPI extends APIBase {
    constructor(apiSystem: APISystem) {
        super(apiSystem, {
           apiName: 'absence',
           buildNumber: 1,
           requirements: {
            minSimpleAPIBuild: 0,
            maxSimpleAPIBuild: 0
           }
        })
    }

    init() {
        console.log('Initializion of Absence...')
        super.init();
        this.initRoutes();
    }

    checkAppToken(token: string) {
        if(token == '481923pkfui932iktjhui891okjnji987ujgmoa') {
            return true;
        } else {
            return false;
        }
        // this function should check an request and return true, if the header contains an valid Token.
        // token needs to be stored somewhere
    }

    async checkAuthToken(token: string) {
        // this function should retrive the user type of the submitted token
        // first check student token, then admin/prof tokens
        const findStudent = await DBStudent.findOne({where: {token: token}});
        if(findStudent) {
            return 'STUDENT';
        }
        const findToken = await DBToken.findOne({where: { id: token }});
        if(findToken) {
            // wenn token erstelldatum älter als 10 Stunden, dann löschen und "NO_LOGIN" senden
            if((Date.now() - findToken.createdAt.getTime()) > 600000) {
                DBToken.delete(findToken.id);
                return "NO_LOGIN";
            }
            return findToken.type;
        }
        return 'NO_LOGIN';
    }

    async checkBothTokens(req: Request) {
        const appToken = req.header('x-app-token');
        const authToken = req.header('x-auth-token');
        let appTokenValid = false;
        let authTokenLevel = '';
        if(appToken) {
            appTokenValid = this.checkAppToken(appToken);
        } 
        if(authToken) {
            authTokenLevel = await this.checkAuthToken(authToken);
        }
        return [appTokenValid, authTokenLevel];
    }

    async createAdmin(name: string, email: string, password: string) {
        const salt = bcrypt.genSaltSync(BCRYPT_SALTS);
        const hash = bcrypt.hashSync(password, salt);
        const newAdmin = await DBAdmin.save(DBAdmin.create({name: name, email: email, lastUpdated: new Date(), password: hash }));
        return newAdmin;
    }

    async createProfessor(name: string, email: string, password: string) {
        const salt = bcrypt.genSaltSync(BCRYPT_SALTS);
        const hash = bcrypt.hashSync(password, salt);
        const newProfessor = await DBProffessor.save(DBProffessor.create({name: name, email: email, password: hash, lastUpdated: new Date()}));
        return newProfessor;
    }

    async existsEmailAnywhere(email: string) {
        const findAdmin = await DBAdmin.findOne({ where: { email: email }});
        const findProfessor = await DBProffessor.findOne({ where: { email: email }});
        const findStudent = await DBStudent.findOne({ where: { email: email }});
        if(findAdmin || findStudent || findProfessor) {
            return true;
        } else {
            return false;
        }
    }

    async authenticateUser(email: string, password: string) {
        const findAdmin = await DBAdmin.findOne({where: { email: email }});
        if(findAdmin) {
            console.log('ADMIN GEFUNDEN!')
            const valid = bcrypt.compareSync(password, findAdmin.password);
            if(valid) {
                console.log('PW richtig... token kommt')
                const newToken = DBToken.save(DBToken.create({createdAt: new Date(Date.now()), type: 'ADMIN', typeId: findAdmin.id}));
                return newToken;
            }
        }
        const findProfessor = await DBProffessor.findOne({ where: { email: email }});
        if(findProfessor) {
            console.log('Prof gefunden!');
            const valid = bcrypt.compareSync(password, findProfessor.password);
            if(valid) {
                console.log('PW richtig... token kommt');
                const newToken = DBToken.save(DBToken.create({createdAt: new Date(Date.now()), type: 'PROFESSOR', typeId: findProfessor.id}))
                return newToken;
            }
        }
        // todo should return an newly created token for a Prof or a Admin
    }

    async authenticateStudent(token: string) {
        const student = await DBStudent.findOne({where: { token: token }});
        return student;
        // todo should return the Student-Object by the student token
    }

    initRoutes() {
        this.apiLib.createRoute({
            creatingAPI: this,
            endPointName: 'admins',
            method: 'GET',
            onCall: async (req, res) => {
                const [appTokenValid, authTokenLevel] = await this.checkBothTokens(req);
                const response: IAPIResponse = {
                    header: {
                        success: (appTokenValid && authTokenLevel == 'ADMIN' ? true : false),
                        message: ''
                    },
                    data: {
                        admins: (appTokenValid && authTokenLevel == 'ADMIN' ? await DBAdmin.find() : [])
                    }
                }
                res.send(response);
            }
        });
        /**
         * This route tries to authenticate an admin or an prof with an JSON-request where email and password need to be submitted.
         */
        this.apiLib.createRoute({
            creatingAPI: this,
            endPointName: 'auth',
            method: 'POST',
            onCall: async (req, res) => {
                const [appTokenValid, authTokenLevel] = await this.checkBothTokens(req);
                const email = req.body.email;
                const password = req.body.password;
                const token = await this.authenticateUser(email, password);
                const response: IAPIResponse = {
                    header: {
                        success: (appTokenValid && token ? true : false),
                        message: ''
                    },
                    data: {
                        token: (token ? token.id : '')
                    }
                }
                res.send(response);
            }
        });
        this.apiLib.createRoute({
            creatingAPI: this,
            endPointName: 'professors',
            method: 'GET',
            onCall: async (req, res) => {
                const [appTokenValid, authTokenLevel] = await this.checkBothTokens(req);
                const response: IAPIResponse = {
                    header: {
                        success: (appTokenValid && authTokenLevel == "ADMIN" ? true : false),
                        message: ''
                    },
                    data: {
                        professors: (appTokenValid && authTokenLevel == "ADMIN" ? await DBProffessor.find() : false)
                    }
                }
                // list all professors if authTokenLevel == ADMIN
            }
        })
        // classes
    }

}