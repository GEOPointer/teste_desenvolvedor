import express from 'express';
import cors from "cors";
import router from './routes/EquipmentRoute.js';
import swaggerUi  from 'swagger-ui-express';
import swaggerJSDoc from 'swagger-jsdoc';
// import swaggerOutput from './swagger-json.json';
const app = express();

app.use(express.json());
app.use(cors());


var swaggerDefinition = {
    info:{
        title:"Documentação do Just a Crud",
        version:"1.0.0",
        description:"Isso é uma api de um CRUD construido com NodeJs utilizando Express para o seu servidor e tem apenas as funcionalidades "
        +"de um CRUD"
    },
    components:{
        // schemas: swaggerOutput
    }
}

var options ={
    swaggerDefinition : swaggerDefinition,
    apis:['./routes/EquipmentRoute.js']
}

var swagerSprec = swaggerJSDoc(options);
app.use("/docs",swaggerUi.serve,swaggerUi.setup(swagerSprec));

app.use("/",router);
  
app.listen(8000);