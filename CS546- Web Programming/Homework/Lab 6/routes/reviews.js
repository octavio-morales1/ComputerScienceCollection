import { Router } from 'express';
import { reviews as reviewData } from '../data/index.js';
import { ObjectId } from 'mongodb';

const router = Router();

router
  .route('/:productId')
  .get(async (req, res) => {
    try {
      if (!ObjectId.isValid(req.params.productId)) {
        return res.status(400).json({ error: 'Error: Invalid product ID' });
      }
      let reviews= await reviewData.getAllReviews(req.params.productId);
      return res.json(reviews);
    } catch (e) {
      return res.status(500).json({ error: e.toString() });
    }
  })
  .post(async (req, res) => {
    let reviewInfo= req.body;
    if (!reviewInfo || Object.keys(reviewInfo).length === 0) {
      return res
        .status(400)
        .json({ error: 'Error: There are no fields in the request body' });
    }

    try {
      const newReview= await reviewData.createReview(
        req.params.productId,
        reviewInfo.title,
        reviewInfo.reviewerName,
        reviewInfo.review,
        reviewInfo.rating
      );
      return res.json(newReview);
    } catch (e) {
      return res.status(500).json({ error: e.toString() });
    }
  });

router
  .route('/review/:reviewId')
  .get(async (req, res) => {
    // code here for GET
    try {
      if (!ObjectId.isValid(req.params.reviewId)) {
        return res.status(400).json({ error: 'Invalid review ID' });
      }
      let review = await reviewData.getReview(req.params.reviewId);
      return res.json(review);
    } catch (e) {
      return res.status(404).json({ error: e.toString() });
    }
  })
  .patch(async (req, res) => {
    // code for PATCH
    let reviewInfo = req.body;
    if (!reviewInfo || Object.keys(reviewInfo).length === 0) {
      return res
        .status(400)
        .json({ error: 'Error: There are no fields in the request body' });
    }

    try {
      if (!ObjectId.isValid(req.params.reviewId)) {
        return res.status(400).json({ error: 'Invalid review ID' });
      }
      const updatedReview = await reviewData.updateReview(
        req.params.reviewId,
        reviewInfo
      );
      return res.json(updatedReview);
    } catch (e) {
      return res.status(404).json({ error: e.toString() });
    }
  })
  .delete(async (req, res) => {
    // code here for DELETE
    try {
      if (!ObjectId.isValid(req.params.reviewId)) {
        return res.status(400).json({ error: 'Invalid review ID' });
      }
      let deletedReview = await reviewData.removeReview(req.params.reviewId);
      return res.json(deletedReview);
    } catch (e) {
      return res.status(404).json({ error: e.toString() });
    }
  });

export default router;
