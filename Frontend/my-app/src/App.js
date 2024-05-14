import {GlobalStyle,Container} from "./styles/global";
import styled from "styled-components";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Form from "./components/Form.js";
import { useEffect, useState } from "react";
import axios from "axios";
import Grid from "./components/Grid.js";



const Title = styled.h2``;

function App() {
  const [equipments,setEquipments] = useState([]);
  const [onEdit,setOnEdit] = useState(null);

  const getEquipments = async () =>{
    try{
      const res = await axios.get("http://localhost:8000");
      setEquipments(res.data);
    }catch(error){
      toast.error(error);
    }
  }

  useEffect(() =>{
    getEquipments();
  },[setEquipments]);


  return (
    <>
      <Container>
        <Title>Equipamentos</Title>
        <Form  onEdit={onEdit} setOnEdit={setOnEdit}  getEquipments={getEquipments} />
        <Grid equipments={equipments} setEquipments={setEquipments} setOnEdit={setOnEdit} />
      </Container>
      <ToastContainer autoClose={3000} position={'bottom-left'} />
      <GlobalStyle />
    </>
  );

}

export default App;
