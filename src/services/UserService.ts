export interface IUser {
    id: string;
    name: string;
    document: string;
    password: string;
    status: 'ACTIVE' | 'INACTIVE';
}

class UserService {
    
    private userDataJson = localStorage.getItem('userData');
    private data: IUser[] = this.userDataJson ?  JSON.parse(this.userDataJson) : [];

    getUsers() {
        return Promise.resolve(this.data);
    }

    registerUserService(newUser: IUser) {
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

}

export default new UserService();