import * as express from "express";
const router = express.Router();
router.get('/', (req, res) => {
    const specializations = [
        'History', 'Food', 'Nature', 'Photography', 'Adventure',
        'Culture', 'Religion', 'Art', 'Music', 'Shopping'
    ];
    res.json(specializations);
});
export default router;
