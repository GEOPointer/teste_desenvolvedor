import { query } from "express";
import { database } from "../Infrastructure/database.js";
// import{GetEquipments,Create,Update,Delete} from "../Repositories/EquipmentRepository.js";

export const GetAll = async (_, res) => {

    const q = "Select * FROM equipment";
    database.query(q,(error,data) => {
        if(error) return res.json(error);
        return res.status(200).json(data);
        
    })
}

export const Create = (req,res) =>{
    const q ="INSERT INTO equipment(`name`,`tag`,`maintenence_date`,`latitude`,`longitude`) VALUES(?)";
    const values = [
        req.body.name,
        req.body.tag,
        req.body.maintenence_date,
        req.body.latitude,
        req.body.longitude,
    ]

    database.query(q,[values],(err) => {
        if(err) {
            return res.json(err);
        }
        return res.status(200).json("Equipamento cadastrado com sucesso");
    })
}
export const Update = (req,res) =>{
    console.log("valores",req.body);
    const q ="UPDATE  equipment SET name = ?,tag = ?,maintenence_date = ?, latitude = ?, longitude = ? WHERE id = ?";
    const values = [
        req.body.name,
        req.body.tag,
        req.body.maintenence_date,
        req.body.latitude,
        req.body.longitude,
    ]

    database.query(q,[...values,req.params.id],(err) => {
        if(err) return res.json(err);
        return res.status(200).json("Equipamento atualizado com sucesso");
    })
}

export const Delete = (req,res) => {
    const q = "DELETE FROM equipment WHERE id = ?";
    console.log("id delete",req.param);
    database.query(q,[req.params.id],(err) => {
        if(err) return res.json(err);
        
        return res.status(200).json("Equipamento deletadao com sucesso.");
    })
}