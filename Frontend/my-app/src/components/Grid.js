import React from "react";
// import{Table,Thead,Tbody,Tr,Th,Td} from "../styles/GridStyles"
import Table from 'react-bootstrap/Table';
import axios from "axios";
import {FaEdit,FaTrash} from "react-icons/fa";
import { toast } from "react-toastify";

const Grid = ({equipments,setEquipments,setOnEdit}) =>{
    const handleDelete = async (id) =>{
        console.log("andleDelete",id);
        await axios
            .delete("http://localhost:8000/"+ id)
            .then(({data}) => {
                const newArray = equipments.filter((equipment) => equipment.id !== id);
                setEquipments(newArray);
                toast.success(data);
            });
            setOnEdit(null);
    }

    const handleEdit = (item) =>{
        setOnEdit(item);
    }

    return(
        <Table striped>
            <thead>
                <tr>
                    <th>Tag</th>
                    <th>Nome</th>
                    <th>Ultima Manutenção</th>
                    <th>Latitude</th>
                    <th>Longitude</th>
                </tr>
            </thead>
            <tbody>
                {equipments.map((item, i) => (
                    <tr key={i}>
                        <td>{item.id}</td>
                        <td>{item.tag}</td>
                        <td>{item.name}</td>
                        <td>{item.maintenence_date}</td>
                        <td>{item.latitude}</td>
                        <td>{item.longitude}</td>
                        <td> <FaEdit onClick={() => handleEdit(item)} /></td>
                        <td> <FaTrash onClick={() => handleDelete(item.id)} /> </td>
                    </tr>
                ))}

            </tbody>
        </Table>
    );
}

export default Grid;