import multer from "multer";
import path from "path";
// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//       cb(null, 'uploads/');
//     },
//     filename: function (req, file, cb) {
//         const ext = path.extname(file.originalname)
//       cb(null, Date.now() + ext);
//     }
//   })
// const upload = multer({ 
//     storage: storage ,
//     // fileFilter : function(req, res, callback) {
//     // }
// });
const upload = multer({
    storage: multer.memoryStorage(), // Store files in memory for Vercel upload
    // ... (other upload options)
});
export default upload;
