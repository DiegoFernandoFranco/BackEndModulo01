import userSchema from "../models/userSchema.js";

class UserMongooseDao {
    async paginate(criteria) {
        const {limit, page} = criteria;
        const userDocuments = await userSchema.paginate({}, {limit, page});

        userDocuments.docs = userDocuments.docs.map((document) => ({
            id: document._id,
            firstName: document.firstName,
            lastName: document.lastName,
            email: document.email,
            age: document.age
            // password: document.password            
        }));

        return userDocuments;
    }

    async getOne (uid) {
        const userDocument = await userSchema.findOne({_id: id});
        if (!userDocument) {
            throw new Error (`User don't exist`);
        }

        return {
            id: document?._id,
            firstName: document?.firstName,
            lastName: document?.lastName,
            email: document?.email,
            age: document?.age,
            password: document?.password            
        }
    }
    
    async create (data) {
     
    }
       
    async updateOne (id, data) {
     
    }
   
    async deleteOne (id) {
     
    }
}

export default UserMongooseDao;