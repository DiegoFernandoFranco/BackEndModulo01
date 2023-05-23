import UserMongooseDao from '../daos/UserMongooseDao.js';

class UserManager {
    constructor () {
        this.userDao = new UserMongooseDao();
    }

    async paginate (criteria) {
        return this.userDao.paginate(criteria);
    }

    async getOne (uid) {
        return this.userDao.getOne(uid);
    }
    
    async create (data) {
        return this.userDao.create(data);
    }
       
    async updateOne (id, data) {
        return this.userDao.updateOne(id, data);
    }
   
    async deleteOne (id) {
        return this.userDao.deleteOne (id);
    }
   
};

export default UserManager;