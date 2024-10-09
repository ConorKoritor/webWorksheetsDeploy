import express, {Router} from "express";
import {authenticateKey} from "../middleware/auth.middleware";
import{
    getGradeHistories
} from "../controllers/gradeHistories";

const router: Router = express.Router();

router.get('/', getGradeHistories);

export default router;