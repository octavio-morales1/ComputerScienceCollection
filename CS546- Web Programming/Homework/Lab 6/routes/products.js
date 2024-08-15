import { Router } from 'express';
import { products as productData } from '../data/index.js';
import { ObjectId } from 'mongodb';

const router = Router();

router
  .route('/')
  .get(async (req, res) => {
    // code here for GET
    try {
      const productList = await productData.getAll();
      return res.json(productList);
    } catch (e) {
      return res.status(500).json({ error: e.toString() });
    }
  })
  .post(async (req, res) => {
    // code here for POST
    const productInfo = req.body;
    if (!productInfo || Object.keys(productInfo).length === 0) {
      return res.status(400).json({ error: 'You must provide data to create a product' });
    }

    try {
      const newProduct = await productData.create(
        productInfo.productName,
        productInfo.productDescription,
        productInfo.modelNumber,
        productInfo.price,
        productInfo.manufacturer,
        productInfo.manufacturerWebsite,
        productInfo.keywords,
        productInfo.categories,
        productInfo.dateReleased,
        productInfo.discontinued
      );
      return res.status(200).json(newProduct);
    } catch (e) {
      return res.status(400).json({ error: e.String() });
    }
  });

router
  .route('/:productId')
  .get(async (req, res) => {
    // code here for GET
    try {
      if (!ObjectId.isValid(req.params.productId)) {
        return res.status(400).json({ error: 'Invalid product ID' });
      }
      const product = await productData.get(req.params.productId);
      return res.json(product);
    } catch (e) {
      console.error(e);
      return res.status(404).json({ error: e.toString() });
    }
  })
  .delete(async (req, res) => {
    // code here for DELETE
    try {
      if (!ObjectId.isValid(req.params.productId)) {
        return res.status(400).json({ error: 'Invalid product ID' });
      }
      const deleteInfo = await productData.remove(req.params.productId);
      return res.json(deleteInfo);
    } catch (e) {
      return res.status(404).json({ error: e.toString() });
    }
  })
  .put(async (req, res) => {
    // code here for PUT
    const updatedData = req.body;
    if (!updatedData || Object.keys(updatedData).length === 0) {
      return res.status(400).json({ error: 'You must provide data to update the product' });
    }

    try {
      if (!ObjectId.isValid(req.params.productId)) {
        return res.status(400).json({ error: 'Invalid product ID' });
      }
      const updatedProduct = await productData.update(
        req.params.productId,
        updatedData.productName,
        updatedData.productDescription,
        updatedData.modelNumber,
        updatedData.price,
        updatedData.manufacturer,
        updatedData.manufacturerWebsite,
        updatedData.keywords,
        updatedData.categories,
        updatedData.dateReleased,
        updatedData.discontinued
      );
      return res.json(updatedProduct);
    } catch (e) {
      return res.status(404).json({ error: e.toString() });
    }
  });

export default router;
