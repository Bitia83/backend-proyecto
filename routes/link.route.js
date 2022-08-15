import { Router } from "express";
import {  createLink, getLink, getLinks, removeLink, updateLink } from "../controller/link.controller.js";
import { requireToken } from "../middlewares/requireToken.js";
import { bodyLinkValidator, paramLinkValidator } from "../middlewares/validationManager.js";
const router = Router()

// GET      /api/v1/links            all links
//GET       /api/v1/links/:id        single link
//POST      /api/v1/links             create link
//PATCH/PUT      //api/v1/links:id    update link
//DELETE   /api/v1/links              remove link


router.get('/', requireToken, getLinks);
router.get('/:nanoLink', getLink);
router.post('/', requireToken, bodyLinkValidator, createLink);
router.delete('/:id', requireToken, paramLinkValidator, removeLink);
router.patch('/:id', requireToken, paramLinkValidator, bodyLinkValidator, updateLink);


export default router;