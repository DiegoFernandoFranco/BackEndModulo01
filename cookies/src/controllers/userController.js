import UserManager from '../managers/userManager.js';

export const list = async (req, res) => {
    const {limit, page} = new UserManager();

    const users = await UserManager.paginate({limit, page});
    res.send({status: 'success', users: users.docs, ...users, docs: undefined});
};

export const getOne = async (req, res) => {
    const {id} = req.params;

    const manager = new UserManager();
    const user = await manager.getOne(id);

    res.send({status: 'success', user});
};

export const save = async (req, res) => {
    const manager = new UserManager();
    const user = await manager.create(req.body);

    res.send({status: 'success', user, message: 'User Created'});
};