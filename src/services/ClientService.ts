import { IUser } from "./UserService";

export interface IClient {
    id: string;
    name: string;
    fullName: string;
    cpf: string;
    email: string;
    celular: string;
    cep: string;
    logradouro?: string;
    bairro?: string;
    cidade?: string;
    uf?: string;
    status: string;
    createdAt: Date;
    updatedAt: Date | null;
    userRegister: IUser;
}

class ClientService {
    
    private clientDataJson = localStorage.getItem('ClientData');
    private data: IClient[] = this.clientDataJson ?  JSON.parse(this.clientDataJson) : [];

    getClient() {
        return Promise.resolve(this.data.filter(dt => dt.status !== 'INACTIVE' ));
    }

    registerClient(newClient: IClient) {
        try {            
            this.data.push(newClient);
            localStorage.setItem('ClientData', JSON.stringify(this.data));
            return {
                response: 201,
                data: newClient
            }
        } catch (error) {
            return error
        }
    }

    deleteClient(id: string) {
        this.data.forEach(item => {
            if (item.id === id) {
              item.status = 'INACTIVE';
            }
        });
        
        localStorage.setItem('ClientData', JSON.stringify(this.data));

        return {
            response: 200,
            data: []
        }
    }

}

export default new ClientService();