<div align="center">
  <h1>Shadow Classes</h1>
</div>

Lightweight utilty that associates html5 templates with classes 
and injects them as shadow dom when declared.

Inject shadow dom into html so that presentation markup stays 
in shadow dom and semantic markup stays in light dom.

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
  <footer class="template-footer multiple-shadow">
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

Nested
------

Shadow dom will also be injected as declared when a template is imported.

```html
<template class="another-shadow-class">
  <p><content></content></p>
</template>

<template class="shadow-class">
  <!-- The div will have a shadow root too! -->
  <div class="another-shadow-class">
  </div>
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

