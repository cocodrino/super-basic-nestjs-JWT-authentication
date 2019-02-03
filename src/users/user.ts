export class User {
    constructor(id :number=null, email:string=null,password:string=null){
        this.id = id;
        this.email = email;
        this.password = password;
    }

    id: number;
    email: string;
    password: string;
}
