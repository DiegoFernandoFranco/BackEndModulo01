
export const login = async (req, res) => {
    const {username, password} = req.body;

    if (username !== 'pepe' || password !== '12345678') {
        return res.status(401).send({message: 'Login failed.'})
    }

    req.session.user = username;
    req.session.admin = true;

    res.send({message: 'Login success!'});
};

export const logout = async (req, res) => {
    req.session.destroy (error => {
        if (!error) {
            return res.send({message: 'Logout ok!'});
        }
        res.send({message: 'Logout error!', body: error})
    })
};

export const signup = async (req, res) => {
    req.session.destroy (error => {
        if (!error) {
            return res.send({message: 'Logout ok!'});
        }
        res.send({message: 'Logout error!', body: error})
    })
};