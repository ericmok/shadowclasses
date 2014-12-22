shadowdomize
============

Associates html5 templates with classes.

Inject shadow dom into html so that presentation markup stays in shadow dom and semantic markup stays in light dom.

Example:

```
 <article class="template-article">
    <header class="template-header">
      <h1>XSLT/XML but cooler</h1>
    </header>
    <main class="template-main">
      <p>Programmable template matching to bind semantic markup to templates </p>
      </main>
    <footer class="template-footer">
        <p>This is a footer</footer>
    </footer>
 </article>


<template class="template-article">
  <content></content>
</template>

<template class="template-header">
  <content></content>
</template>

<template class="template-main">
  <content></content>
</template>

<template class="template-footer">
  <content></content>
</template>
```

Unlike with XSL/XML, Javascript lets you programmatically define template matching behavior with semantic markup.
