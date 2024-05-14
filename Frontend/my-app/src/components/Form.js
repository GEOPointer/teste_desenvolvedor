import React,{useEffect, useRef} from "react";
import{FormContainer,InputArea,Input,Label,Button} from "../styles/FormStyles";
import axios from "axios";
import { toast } from "react-toastify";

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
                    tag: equipment.tag.value,
                    name: equipment.name.value,
                    maintenence_date: equipment.maintenence_date.value,
                    latitude: equipment.latitude.value,
                    longitude: equipment.longitude.value,
    
                })
                .then(({ data }) => toast.success(data))
                .catch(({ data }) => toast.error(data));
        }
        getEquipments();
    }


    return(
        <FormContainer ref={ref} onSubmit={handleSubmit}>
            <InputArea>
                <Label>Nome</Label>
                <Input name="name"></Input>
            </InputArea>
            <InputArea>
                <Label>Tag</Label>
                <Input name="tag"></Input>
            </InputArea>
            <InputArea>
                <Label>Data da ultima manutenção</Label>
                <Input name="maintenence_date" type="date"></Input>
            </InputArea>
            <InputArea>
                <Label>Latitude</Label>
                <Input name="latitude"></Input>
            </InputArea>
            <InputArea>
                <Label>Longitude</Label>
                <Input name="longitude"></Input>  
            </InputArea>
            <Button type="submit">Salvar</Button>
        </FormContainer>        
    )
}

export default From;