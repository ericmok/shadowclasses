<div align="center">
  <h2>shadowdomize</h2>
</div>

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

<button onclick="this.className='template-dynamic'">Click</button>


<template class="template-article">
  <style>
    /** Isolated styles */
  </style>
  <content></content>
</template>

<template class="template-header">
  <svg>
    <!-- Presentation markup -->
  </svg>
  
  <!-- Would be nice if we could project content as a different tag -->
  <content></content>
</template>

<template class="template-main">
  <!-- barebones -->
  <content></content>
</template>

<template class="template-footer">
  <content></content>
</template>

<template class="template-dynamic">
  <!-- The shadow dom will be inserted if new elements or class names get added -->
  <content></content>
</template>


<button onclick="this.className=''" class="template-dynamic">But currently shadow dom doesn't get removed</button>

```

Unlike with XSL/XML, Javascript lets you programmatically define template matching behavior with semantic markup.
