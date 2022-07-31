import { Request, Response } from "express";
import Usuario from '../models/usuario.model';

export const getUsuarios = async (req: Request, res: Response) => {

    const usuarios = await Usuario.findAll();
    res.json({
        usuarios
    });
};

export const getUsuario = async (req: Request, res: Response) => {
    const { id } = req.params;
    const usuario = await Usuario.findByPk(id);
    if (usuario) {
        res.json({
            usuario
        });
    } else {
        res.status(404).json({
            msg: 'no existe un usuario con el id ' + id
        });
    }
};

export const postUsuario = async (req: Request, res: Response) => {

    const { body } = req;

    try {
        const existeEmail = await Usuario.findOne({
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
        const usuario = new (Usuario as any)(body);

        await usuario.save();

        res.json({
            usuario
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'hable con el admin',
        });
    }
};

export const putUsuario = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { body } = req;

    try {
        const usuario = await Usuario.findByPk(id);
        if (!usuario) {
            return res.status(404).json({
                msg: `no existe usuario con el id ${id}`
            });
        }
        await usuario.update(body);
        res.json({
            usuario
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'hable con el admin',
        });
    }
};

export const deleteUsuario = async (req: Request, res: Response) => {
    const { id } = req.params;
    const usuario = await Usuario.findByPk(id);
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
}