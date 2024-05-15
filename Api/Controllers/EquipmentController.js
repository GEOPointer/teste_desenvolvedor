import { database } from "../Infrastructure/database.js";
import{GetEquipments ,CreateEquipment ,UpdateEquipment,DeleteEquipment } from "../Repositories/EquipmentRepository.js";

/**
 * @swagger
 * path: /
 * operations:
 *   -  httpMethod: GET
 *      summary: Lista todos os equipamentos
 *      notes: Lista todos os equipamentos cadastrados
 *      responseClass: User
 *      nickname: login
 *      consumes: 
 *        - text/html
 *      parameters:
 *        - name: username
 *          description: Your username
 *          paramType: query
 *          required: true
 *          dataType: string
 *        - name: password
 *          description: Your password
 *          paramType: query
 *          required: true
 *          dataType: string
 */

export const GetAll = (req,res) => {
    return GetEquipments(req,res);
}

export const Create = (req,res) =>{
    return CreateEquipment(req,res);
}

export const Update = (req,res) =>{
    return UpdateEquipment(req,res);
}

export const Delete = (req,res) => {
    return DeleteEquipment(req,res);
}