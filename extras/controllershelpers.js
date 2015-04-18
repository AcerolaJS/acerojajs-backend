module.exports = {
    response: function(req, res, responseObject) {
        var html = responseObject;
        switch (req.params.ext) {
            case ".html":
                res.render('responseHtml', {
                    "response": html
                });
                break;
            default:
                res.send(responseObject);
                break;
        }
    }
}