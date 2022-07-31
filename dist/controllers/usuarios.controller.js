"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUsuario = exports.putUsuario = exports.postUsuario = exports.getUsuario = exports.getUsuarios = void 0;
const usuario_model_1 = __importDefault(require("../models/usuario.model"));
const getUsuarios = async (req, res) => {
    const usuarios = await usuario_model_1.default.findAll();
    res.json({
        usuarios
    });
};
exports.getUsuarios = getUsuarios;
const getUsuario = async (req, res) => {
    const { id } = req.params;
    const usuario = await usuario_model_1.default.findByPk(id);
    if (usuario) {
        res.json({
            usuario
        });
    }
    else {
        res.status(404).json({
            msg: 'no existe un usuario con el id ' + id
        });
    }
};
exports.getUsuario = getUsuario;
const postUsuario = async (req, res) => {
    const { body } = req;
    try {
        const existeEmail = await usuario_model_1.default.findOne({
            where: {
                email: body.email
            }
        });
        if (existeEmail) {
            return res.status(400).json({
                msg: `ya existe usuario con el email ${body.email}`
            });
        }
        // new (MyPuppet as any)(options.puppetOptions) 
        const usuario = new usuario_model_1.default(body);
        await usuario.save();
        res.json({
            usuario
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'hable con el admin',
        });
    }
};
exports.postUsuario = postUsuario;
const putUsuario = async (req, res) => {
    const { id } = req.params;
    const { body } = req;
    try {
        const usuario = await usuario_model_1.default.findByPk(id);
        if (!usuario) {
            return res.status(404).json({
                msg: `no existe usuario con el id ${id}`
            });
        }
        await usuario.update(body);
        res.json({
            usuario
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'hable con el admin',
        });
    }
};
exports.putUsuario = putUsuario;
const deleteUsuario = async (req, res) => {
    const { id } = req.params;
    const usuario = await usuario_model_1.default.findByPk(id);
    if (!usuario) {
        return res.status(404).json({
            msg: `no existe usuario con el id ${id}`
        });
    }
    // await usuario.destroy();
    await usuario.update({ estado: false });
    res.json({
        usuario
    });
};
exports.deleteUsuario = deleteUsuario;
//# sourceMappingURL=usuarios.controller.js.map