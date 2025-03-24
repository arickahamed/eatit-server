const productService = require("./productService");

exports.getAllProducts = async (req, res) => {
    try {
        const products = await productService.getProducts();
        res.status(200).json({
            success: true,
            data: products
        });
        {console.log(products)};
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "something went wrong"
        })
    }
}


exports.createProduct = async(req, res) => {
    // console.log(req.body);
    // console.log(req);
    try {
        const { category, title, description, price, quantity } = req.body;
        if (!req.file) return res.status(400).json({ message: "Image is required" });
        // const imageURL = `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`;
        const imageURL = `/uploads/${req.file.filename}`;

        const productWithImage = { category, title, description, price, quantity, imageURL };
        console.log(productWithImage);
        const newProduct = await productService.createProduct(productWithImage);
        res.status(201).json({
            success: true,
            message: "product created successfully",
            data: newProduct
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Something went wrong controller",
        });
    }
};