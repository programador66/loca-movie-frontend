export interface IUser {
    id: string;
    name: string;
    document: string;
    password: string;
    status: string;
    createdAt: Date;
    updatedAt: Date | null;
}

class UserService {
    
    private userDataJson = localStorage.getItem('userData');
    private data: IUser[] = this.userDataJson ?  JSON.parse(this.userDataJson) : [];

    getUsers() {
        return Promise.resolve(this.data.filter(dt => dt.status !== 'INACTIVE' ));
    }

    registerUser(newUser: IUser) {
        try {            
            this.data.push(newUser);
            localStorage.setItem('userData', JSON.stringify(this.data));
            return {
                response: 201,
                data: newUser
            }
        } catch (error) {
            return error
        }
    }

    deleteUser(id: string) {
        this.data.forEach(item => {
            if (item.id === id) {
              item.status = 'INACTIVE';
            }
        });
        
        localStorage.setItem('userData', JSON.stringify(this.data));

        return {
            response: 200,
            data: []
        }
    }

}

export default new UserService();