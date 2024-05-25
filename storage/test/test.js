const pdf2html = require('pdf2html');

(async () => {
    try {
        const html = await pdf2html.html('./yii.pdf');
        console.log(html)
    } catch (e) {
        console.log(e)
    }
///openjdk8-jre
///добавить в контейнер, если понадобится
})()
