import page from '../node_modules/page/page.mjs';
import { render } from '../node_modules/lit-html/lit-html.js'

import { logout } from './api/data.js'
import { dashboardPage } from './views/dashboard.js';
import { homePage } from './views/homepage.js';
import { detailsPage } from './views/details.js';
import { createPage } from './views/create.js';
import { editPage } from './views/edit.js';
import { loginPage } from './views/login.js';
import { registerPage } from './views/register.js';
import { searchPage } from './views/search.js';

const main = document.querySelector('#main-content');

import * as api from './api/data.js';

window.api = api;

page('/', decorateContext, homePage);
page('/dashboard', decorateContext, dashboardPage);
page('/details/:id', decorateContext, detailsPage);
page('/create', decorateContext, createPage);
page('/edit/:id', decorateContext, editPage);
page('/register', decorateContext, registerPage);
page('/login', decorateContext, loginPage);
page('/search', decorateContext, searchPage);

document.querySelector('#user > a[href="javascript:void(0)"]').addEventListener('click', async () => {
    await logout()
    setUserNav()
    page.redirect('/')
})

setUserNav()

// start app
page.start();


function decorateContext(ctx, next) {
    ctx.render = (content) => render(content, main);
    ctx.setUserNav = setUserNav;
    next();
}

function setUserNav() {
    const userId = sessionStorage.getItem('userId');
    if (userId != null) {
        document.getElementById('user').style.display = 'inline-block';
        document.getElementById('guest').style.display = 'none';
    } else {
        document.getElementById('user').style.display = 'none';
        document.getElementById('guest').style.display = 'inline-block';
    }
}