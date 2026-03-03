import { b95Api } from "@/api/b95";
import { defineStore } from "pinia";
import { ref } from "vue";

export const useAuthStore = defineStore('auth', () => {

    const estadoDeAutenticacion = ref('VERIFICANDO');
    
    const login = async (correoElectronico: string, contrasena: string) => {
        try {
            const loginResponse = await b95Api.post('/login', {
                correoElectronico, contrasena
            })
            
            localStorage.setItem('token', loginResponse.data.token);
            estadoDeAutenticacion.value = 'Autenticado';
        } catch (error) {
            console.log(error);
        }
    }

    const logout = async () => {
        localStorage.removeItem('token');
        estadoDeAutenticacion.value = 'NO_AUTENTICADO';
    }

    const verificarEstadoDeAutenticacion = async () => {
        try {
            const token = localStorage.getItem('token');

            if(!token || token.length < 10) {
                return false;
            }

            const { status } = await b95Api.get('/socios/detalle');

            return estadoDeAutenticacion.value = status === 200 ? 'AUTENTICADO' : 'NO_AUTENTICADO';
        } catch (error) {
            console.log(error);
        }
    }

    return {
        // estado
        estadoDeAutenticacion,

        // actions
        login,
        logout,
        verificarEstadoDeAutenticacion
    }

});