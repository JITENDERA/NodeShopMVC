exports.get404 = (_req, _res, _next) => {
    _res.status(404).render('404', { pageTitle: 'Page Not Found', path: '' });
}