import React from "react";
import Table from 'react-bootstrap/Table';
import axios from "axios";
import {FaEdit,FaTrash} from "react-icons/fa";
import { toast } from "react-toastify";

const Grid = ({equipments,setEquipments,setOnEdit}) =>{

    function transformDate(dateString){
        const dbDate = new Date(dateString);
        const day = dbDate.getDate();
        const month = dbDate.getMonth();
        const year = dbDate.getFullYear();

        const formattedDay = day < 10 ? '0' + day : day;
        const formattedMonth = month < 10 ? '0' + month : month;

        return `${formattedDay}/${formattedMonth}/${year}`;
    }

    const handleDelete = async (id) =>{
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
            <thead>
                <tr>
                    <th>Tag</th>
                    <th>Nome</th>
                    <th>Ultima Manutenção</th>
                    <th>Latitude</th>
                    <th>Longitude</th>
                    <th>Ações</th>
                </tr>
            </thead>
            <tbody>
                {equipments.map((item, i) => (
                    <tr key={i}>
                        <td>{item.tag}</td>
                        <td>{item.name}</td>
                        <td>{transformDate(item.maintenence_date)}</td>
                        <td>{item.latitude}</td>
                        <td>{item.longitude}</td>
                        <td> 
                            <FaEdit className="me-3" onClick={() => handleEdit(item)} />
                            <FaTrash onClick={() => handleDelete(item.id)} />
                        </td>
                    </tr>
                ))}

            </tbody>
        </Table>
    );
}

export default Grid;