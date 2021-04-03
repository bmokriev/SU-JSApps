import page from '../node_modules/page/page.mjs';
import { render } from '../node_modules/lit-html/lit-html.js'

import { dashboardPage } from './views/dashboard.js';
import { myPage } from './views/myFurniture.js';
import { detailsPage } from './views/details.js';
import { createPage } from './views/create.js';
import { editPage } from './views/edit.js';
import { loginPage } from './views/login.js';
import { registerPage } from './views/register.js';

import * as api from './api/data.js';
window.api = api;

const main = document.querySelector('.container');

page('/', renderMiddleware, dashboardPage);
page('/dahboard', renderMiddleware, dashboardPage);
page('/my-furniture', renderMiddleware, myPage);
page('/details/:id', renderMiddleware, detailsPage);
page('/create', renderMiddleware, createPage);
page('/edit', renderMiddleware, editPage);
page('/register', renderMiddleware, registerPage);
page('/login', renderMiddleware, loginPage);

page.start();

function renderMiddleware(ctx, next) {
    ctx.render = (content) => render(content, main);
    next();
}