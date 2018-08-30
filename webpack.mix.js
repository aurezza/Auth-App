let mix = require('laravel-mix');

mix.setPublicPath('public/')
    .react('resources/assets/js/App.js', 'public/dist/app.js')
    .sass('resources/assets/sass/app.scss', 'public/dist/app.css');