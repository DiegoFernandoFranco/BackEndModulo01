// class ProductController {

// }
export const get = async (req, res) => {
    const manager = new ProductManager();

    const products = await manager.find();
    res.send({status: 'success', products});
};

// export default ProductController;