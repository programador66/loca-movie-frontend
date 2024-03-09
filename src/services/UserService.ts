export interface IUser {
    id: string;
    name: string;
    username: string;
    document: string;
    password: string;
    status: string;
    createdAt: Date;
    updatedAt: Date;
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

    updateUser (userToUpdate: IUser) {
        try {            
        
            const findUser = this.data.find(user => user.id === userToUpdate.id);
            if (!findUser) {
                return {
                    response: 404,
                    msg: 'user not found'
                }
            }
            findUser.name = userToUpdate.name;
            findUser.document = userToUpdate.document;
            findUser.username = userToUpdate.username;
            findUser.password = userToUpdate.password;

            localStorage.setItem('userData', JSON.stringify(this.data));

            return {
                response: 200,
                data: findUser
            }
        } catch (error) {
            return error
        }
    }

    getSession() {
        const dataUser = localStorage.getItem('user@session');
        const userSession = dataUser ? JSON.parse(dataUser) : null;

        return userSession;
    }

}

export default new UserService();