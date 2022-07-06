# SemataWebApp
A Blazor WebAssembly app that demonstrates how to integrate reCAPTCHA, and also deployment on Apache

This app is deployed on Apache at /app

So I prefixed each page directive with Pages/ , like so:

@page "/Pages/SupportRequest"

then in httpd.conf

RewriteEngine on
RewriteRule "^/app/Pages/.*$" "/app/index.html"
and index.html

    <base href="/app/" />
    
NOTE: in the index.html in your project it will still need to be:

    <base href="/" />
    
so you will have to make the change during deployment
