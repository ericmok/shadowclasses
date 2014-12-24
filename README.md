<div align="center">
  <h1>shadowdomize</h1>
</div>

Associates html5 templates with classes and injects them as shadow dom.

Inject shadow dom into html so that presentation markup stays in shadow dom and 
semantic markup stays in light dom.

####Example

```html
<article class="template-article">
  <header class="template-header">
    <h1>Almost XSLT/XML</h1>
  </header>
  <main class="secondary-class-name">
    <p>
      Programmable template matching to bind semantic markup to presentation markup.
    </p>
  </main>
  <footer class="multiple-shadow">
    <p>This is a footer</p>
  </footer>
</article>
```

```html
<template class="template-article">
  <style>
    /** Isolated styles */
    :host { }
  </style>
  <content></content>
</template>

<template class="template-header">
  <svg><!-- Presentation markup --></svg>
  <div><!-- Div Soup --></div>
  <content></content>
</template>

<template class="template-main secondary-class-name">
  <!-- Two class names -->
  <content></content>
</template>

<template class="template-footer">
  <content></content>
</template>

<template class="multiple-shadow">
  <!-- You can shadow another shadow dom -->
  <shadow></shadow>
</template>
```

Dynamically added shadow dom
----------------------------

Shadowdomize will detect changes in the dom and inject shadow dom.

**Caveat:**
Currently, if you remove a class, the shadow dom will not be deleted.

```html
<template class="template-dynamic">
  <!-- The shadow dom will be inserted if new elements or class names get added -->
  <content></content>
</template>


<button onclick="this.className='template-dynamic'">Click to add shadow dom</button>

<button onclick="this.className=''" class="template-dynamic">Won't work</button>
```


###### A word on shadow dom and templates

Unlike with XSL/XML, Javascript lets you programmatically define template matching behavior with semantic markup.
But the shadow dom cannot act as a tree transformer since it is restricted to projecting
nodes that are only direct decendants of the shadow host.
