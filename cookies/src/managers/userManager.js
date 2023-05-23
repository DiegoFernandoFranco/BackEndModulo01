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
       
    async updateOne (uid, data) {
        return this.userDao.updateOne(uid, data);
    }
   
    async deleteOne (uid) {
        return this.userDao.deleteOne (uid);
    }
   
};

export default UserManager;