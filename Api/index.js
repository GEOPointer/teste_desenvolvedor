import express from 'express';
import cors from "cors";
import router from './routes/EquipmentRoute.js';
const app = express();
import swaggerUi  from 'swagger-ui-express';
import swaggerFile from'swagger-autogen';
import bodyParser from 'body-parser';
import swaggerJSDoc from 'swagger-jsdoc';



app.use(express.json());
app.use(cors());


var swaggerDefinition = {
    info:{
        title:"testeando",
        version:"1.0.0",
        description:"testando desc"
    },
    components:{
        // schemas: import from '';
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