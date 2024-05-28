<template>
    <div>
        <v-container>
            <v-card
                title="Cadastrar equipamentos"
                flat
            >
                <v-row no-gutters>
                    <v-col cols="3">
                        <v-sheet class="mb-2 ml-3 pa-1">
                            <v-text-field
                                v-model="form.tag"
                                label="Tag"
                                variant="outlined"
                                hide-details
                                single-line
                            ></v-text-field>
                        </v-sheet>
                    </v-col>
                    <v-col cols="2" >
                        <v-sheet class="mb-2 pa-1">
                            <v-text-field
                                v-model="form.data"
                                label="Data"
                                variant="outlined"
                                placeholder="Ex: 2024-05-17"
                                hide-details
                                single-line
                            ></v-text-field>
                        </v-sheet>
                    </v-col>
                    <v-col cols="2" >
                        <v-sheet class="mb-2 pa-1">
                            <v-text-field
                                v-model="form.latitude"
                                label="Latitude"
                                variant="outlined"
                                placeholder="Ex: -12.99999"
                                hide-details
                                single-line
                            ></v-text-field>
                        </v-sheet>
                    </v-col>
                    <v-col cols="2" >
                        <v-sheet class="mb-2 pa-1">
                            <v-text-field
                                v-model="form.longitude"
                                label="Longitude"
                                variant="outlined"
                                placeholder="Ex: -38.99999"
                                hide-details
                                single-line
                            ></v-text-field>
                        </v-sheet>
                    </v-col>
                    <v-col cols="3" >
                        <v-sheet class="mb-2 mr-3 pa-1">
                            <v-text-field
                                v-model="form.type"
                                label="Tipo"
                                variant="outlined"
                                hide-details
                                single-line
                            ></v-text-field>
                        </v-sheet>
                    </v-col>
                </v-row>
                <v-row no-gutters>
                    <v-col cols="12" class="d-flex justify-end">
                        <v-sheet class="mb-2 mr-3 pa-1">
                            <v-btn 
                                color="blue-grey-lighten-4"
                                @click="goToMap"
                            >
                                Ver mapa
                            </v-btn>
                            <v-btn 
                                v-if="isUpdate == false"
                                color="success" 
                                class="ml-2"
                                @click="storeEquipaments"
                            >
                                Cadastrar
                            </v-btn>

                            <v-btn 
                                v-if="isUpdate == true"
                                color="warning" 
                                class="ml-2"
                                @click="cancelUpdate"
                            >
                                Cancelar
                            </v-btn>
                            <v-btn 
                                v-if="isUpdate == true"
                                color="primary" 
                                class="ml-2"
                                @click="updateEquipaments"
                            >
                                Atualizar
                            </v-btn>
                        </v-sheet>
                    </v-col>
                </v-row>
            </v-card>
        </v-container>
        
        <v-container>
            <v-card
                title="Equipamentos"
                flat
            >
                <template v-slot:text>
                    <v-text-field
                        v-model="search"
                        label="Procurar"
                        prepend-inner-icon="mdi-magnify"
                        variant="outlined"
                        hide-details
                        single-line
                    ></v-text-field>
                </template>

                <v-data-table
                    class="px-2"
                    :headers="headers"
                    :items="equipaments"
                    :search="search"
                    height="300px"
                >
                    <template v-slot:item.actions="{ item }">
                        <v-icon
                            class="me-2"
                            size="large"
                            color="primary"
                            @click="searchEquipament(item.id)"
                        >
                            mdi-pencil
                        </v-icon>
                        <v-icon
                            size="large"
                            color="error"
                            @click="deleteEquipament(item.id)"
                        >
                            mdi-delete
                        </v-icon>
                    </template>
                </v-data-table>
            </v-card>
        </v-container>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router'
import axios from "axios";

const router = useRouter()
const equipaments = ref([])
const search = ref('')
const isUpdate = ref(false)
const equipamentIdToUpdate = ref('')
const form = ref({
    tag: '',
    data: '',
    latitude: '',
    longitude: '',
    type: '',
})

const goToMap = () => {
    router.push({ name: 'map' })
}

const headers = [
    { key: 'id', title: 'Id', sortable: false, },
    { key: 'tag', title: 'Tag', sortable: false, },
    { key: 'data', title: 'Ultima manutenção', sortable: false, },
    { key: 'latitude', title: 'Latitude', sortable: false, },
    { key: 'longitude', title: 'Longitude', sortable: false, },
    { key: 'type', title: 'Tipo', sortable: false, },
    { key: 'actions', title: 'Ações', sortable: false },
]

const getEquipaments = async () => {
    try {
        const response = await axios.get(`equipaments`, {
            headers: {'Content-Type': 'application/json'}
        });

        equipaments.value = response.data
    } catch (error) {
        console.error(error);
    }
}

const storeEquipaments = async () => {
    try {
        const response = await axios.post(`equipaments`, {
            tag: form.value.tag,
            data: form.value.data,
            latitude: form.value.latitude,
            longitude: form.value.longitude,
            type: form.value.type,
        });
        
        alert('Equipamento cadastrado com sucesso!');
        clearFields();
        getEquipaments();
    } catch (error) {
        console.error(error);
    }
}

const clearFields = () => {
    form.value.tag = ''
    form.value.data = ''
    form.value.latitude = ''
    form.value.longitude = ''
    form.value.type = ''
    equipamentIdToUpdate.value = ''
}

const deleteEquipament = async (id) => {
    try {
        const response = await axios.delete(`equipaments/${id}`);
        
        alert('Equipamento excluido com sucesso!');
        getEquipaments();
    } catch (error) {
        console.error(error);
    }
}

const searchEquipament = async (id) => {
    isUpdate.value = true
    equipamentIdToUpdate.value = id

    try {
        const response = await axios.get(`equipaments/${id}`, {
            headers: {'Content-Type': 'application/json'}
        });

        if(response.data) {
            form.value.tag = response.data.tag
            form.value.data = response.data.data
            form.value.latitude = response.data.latitude
            form.value.longitude = response.data.longitude
            form.value.type = response.data.type
        } else {
            console.log('Equipamento não encontrado.')
        }
    } catch (error) {
        console.error(error);
    }
}

const cancelUpdate = () => {
    isUpdate.value = false
    equipamentIdToUpdate.value = ''
    clearFields();
}

const updateEquipaments = async () => {
    if(!equipamentIdToUpdate.value) {
        alert('Equipamento não encontrado!');
    } else {
        try {
            const response = await axios.put(`equipaments/${equipamentIdToUpdate.value}`, {
                tag: form.value.tag,
                data: form.value.data,
                latitude: form.value.latitude,
                longitude: form.value.longitude,
                type: form.value.type,
            });
            
            if(response) {
                isUpdate.value = false
                alert('Equipamento atualizado com sucesso!');
                clearFields();
                getEquipaments();
            }
        } catch (error) {
            console.error(error);
        }
    }
}

onMounted(() => {   
    getEquipaments();
})
</script>

<style>

</style>