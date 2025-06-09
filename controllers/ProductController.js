const Product = require("../models/Product");

const ProductController = {
  //CREATE
  async create(req, res) {
    try {
      const product = await Product.create(req.body);
      res.status(201).send(product);
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .send({ message: "Ha habido un problema al crear el producto" });
    }
  },

  //GET ALL PRODUCTS
  async getAll(req, res) {
    try {
      const products = await Product.find();
      res.status(200).send(products);
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .send({ message: "Ha habido un problema traer los productos", error });
    }
  },

  //GET BY ID
  async getById(req, res) {
    try {
      const product = await Product.findById(req.params.id);
      res.status(200).send(product);
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .send({ message: "Ha habido un problema con ese producto", error });
    }
  },

  //GET BY NAME
  async getByName(req, res) {
    try {
      if (req.params.name.length > 20) {
        return res.status(400).send("Búsqueda demasiado larga");
      }
      const products = await Product.find({
        $text: {
          $search: req.params.name,
        },
      });

      res.status(200).send(products);
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .send({ message: "Ha habido un problema con ese producto", error });
    }
  },

  //DELETE
  async delete(req, res) {
    try {
      const product = await Product.findByIdAndDelete(req.params.id);
      res.status(204).send({ message: "Producto borrado con éxito", product });
    } catch (error) {
      console.error(error);
      res.status(500).send({
        message: "Ha habido un problema al intentar borrar el producto",
      });
    }
  },

  //UPDATE
  async update(req, res) {
    try {
      const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
      });
      res.send({ message: "Producto actualizado correctamente", product });
    } catch (error) {
      console.error(error);
      res.status(500).send({
        message: "Ha habido un problema al intentar actualizar el producto",
      });
    }
  },
};
module.exports = ProductController;
