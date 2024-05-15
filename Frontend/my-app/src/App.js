import {GlobalStyle} from "./styles/global";
import styled from "styled-components";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Form from "./components/Form.js";
import { useEffect, useState } from "react";
import axios from "axios";
import Grid from "./components/Grid.js";
import Header from "./components/Layout/Header.js";
import {Container,Row} from 'react-bootstrap';
import Footer from "./components/Layout/Footer.js";



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
    <Header />
      <Container className="py-3">
        <Row>
          <Title>Equipamentos</Title>
        </Row>
        <Row>
          <Form  onEdit={onEdit} setOnEdit={setOnEdit}  getEquipments={getEquipments} />
        </Row>
        <Row>
          <Grid equipments={equipments} setEquipments={setEquipments} setOnEdit={setOnEdit} />
        </Row>
      </Container>
      <ToastContainer autoClose={3000} position={'bottom-left'} />
      <Footer />
      <GlobalStyle />
    </>
  );

}

export default App;
