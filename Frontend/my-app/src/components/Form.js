import React,{useEffect, useRef} from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { v4 as uuidv4 } from 'uuid';

import {Button,Form,Row,Col}  from 'react-bootstrap';

const From = ({getEquipments,onEdit,setOnEdit}) =>{
    const ref = useRef();

    useEffect(() =>{
        if(onEdit){
            const equipment = ref.current;
            equipment.name.value = onEdit.name;
            equipment.tag.value = onEdit.tag;
            equipment.maintenence_date.value = onEdit.maintenence_date;
            equipment.latitude.value = onEdit.latitude;
            equipment.longitude.value = onEdit.longitude;

        }
    },[onEdit]);

    const handleSubmit = async (e) =>{
        e.preventDefault();
        const equipment = ref.current;
        if(equipment.tag.value === "" || equipment.name.value === "" || equipment.maintenence_date.value === "" || equipment.latitude.value === "" ||
         equipment.longitude.value === "" ){
            return toast.warn("Preencha todos os campos");
        }
        if(onEdit){
            await axios 
                 .put("http://localhost:8000/"+onEdit.id,{
                    tag: equipment.tag.value,
                    name: equipment.name.value,
                    maintenence_date: equipment.maintenence_date.value,
                    latitude: equipment.latitude.value,
                    longitude: equipment.longitude.value,
                 })
                 .then(({ data }) => toast.success(data))
                 .catch(({ data }) => toast.error(data));

        }else{
            await axios
                .post("http://localhost:8000",{
                    tag: uuidv4(),
                    name: equipment.name.value,
                    maintenence_date: equipment.maintenence_date.value,
                    latitude: equipment.latitude.value,
                    longitude: equipment.longitude.value,
    
                })
                .then(({ data }) => toast.success(data))
                .catch(({ data }) => toast.error(data));
        }

        getEquipments();
        equipment.tag.value = "";
        equipment.name.value = "";
        equipment.maintenence_date.value = "";
        equipment.latitude.value = "";
        equipment.longitude.value = "";
    }


    return(
        <Form className="mb-5" ref={ref} onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
                <Row>
                    <Col>
                        <Form.Label>Nome</Form.Label>
                        <Form.Control name="name"></Form.Control>
                    </Col>
                    <Col>
                    <Form.Label>Tag</Form.Label>
                <Form.Control name="tag" className="disabled"  readOnly ></Form.Control >
                    </Col>
                </Row>

            </Form.Group>
            <Form.Group className="mb-3">
                <Row>
                    <Col>
                        <Form.Label>Data da ultima manutenção</Form.Label>
                        <Form.Control name="maintenence_date" type="date"></Form.Control>
                    </Col>
                    <Col>
                        <Form.Label>Latitude</Form.Label>
                        <Form.Control name="latitude"></Form.Control>
                    </Col>
                    <Col>
                        <Form.Label>Longitude</Form.Label>
                        <Form.Control name="longitude"></Form.Control>  
                    </Col>
                </Row>
            </Form.Group>
            <Button type="submit">Salvar</Button>
        </Form>        
    )
}

export default From;