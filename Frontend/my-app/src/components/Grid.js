import React from "react";
import{Table,Thead,Tbody,Tr,Th,Td} from "../styles/GridStyles"
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
        <Table>
            <Thead>
                <Tr>
                    <Th>Tag</Th>
                    <Th>Nome</Th>
                    <Th>Ultima Manutenção</Th>
                    <Th>Latitude</Th>
                    <Th>Longitude</Th>
                </Tr>
            </Thead>
            <Tbody>
                {equipments.map((item, i) => (
                    <Tr key={i}>
                        <Td>{item.id}</Td>
                        <Td>{item.tag}</Td>
                        <Td>{item.name}</Td>
                        <Td>{item.maintenence_date}</Td>
                        <Td>{item.latitude}</Td>
                        <Td>{item.longitude}</Td>
                        <Td> <FaEdit onClick={() => handleEdit(item)} /></Td>
                        <Td> <FaTrash onClick={() => handleDelete(item.id)} /> </Td>
                    </Tr>
                ))}

            </Tbody>
        </Table>
    );
}

export default Grid;