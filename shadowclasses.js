(function() {

  var ShadowClasses = {
    classTemplateMapping: {},
    ADD_GUARD: 'added'
  };

  /** 
  Clone template contents and append. When a template is cloned, 
  it undergoes the shadow classing as well.
  */
  function setElementTemplate(element, template) {
    var shadowRoot;
    
    var templateContent = template.content;
    var processedTemplateContent = document.importNode(templateContent, true);

    // Add templates to children too, 
    if (templateContent.children.length > 0) {
      shadowSubTree(processedTemplateContent);  
    }
   
    // Finally add the processed subtree to current element's shadow dom
    shadowRoot = element.createShadowRoot();
    shadowRoot.appendChild(processedTemplateContent);
  }

  
//  function elementDoesContainShadowDom(element, className) {
//    var addGuard = element.getAttribute(ShadowClasses.ADD_GUARD);
//    
//    if (!addGuard) {
//      return false;
//    }
//    
//    addGuard = addGuard.split(' ');
//    addGuard.forEach(function(value, index) {
//      if (addGuard === className) {
//        return true;
//      }
//    });
//    return false;
//  }

  /**
  Recursively add templates to current element and its children
   */
  function shadowSubTree(tree) {
    for (var i = 0; i < tree.children.length; i++) {
      shadowSubTree(tree.children[i]);

      addTemplateToElement(tree.children[i]);
    }
  }
  window.shadowSubTree = shadowSubTree;

  /**
  Inspect classes of element and see if we should inject shadow dom
  */
  function addTemplateToElement(element) {
    var classNames = element.className.split(' ');
    
    classNames.forEach( function(className) {

        if (ShadowClasses.classTemplateMapping[className]) {
          setElementTemplate(element, ShadowClasses.classTemplateMapping[className]);
        }

    });
  }

  /**
  For each template in [templates], store it in the map
  */
  function registerTemplates(templates) {

    // Map class names to templates in the NodeList
    for (var i = 0; i < templates.length; i++) {
      
      var classNameSplitted = templates[i].className.split(' ');
      
      classNameSplitted.forEach(function(className) {
        ShadowClasses.classTemplateMapping[className] = templates[i];
      });

      templates[i].setAttribute('data-registered-shadow-class', 'true');
    }
  }

  /**
  Go through all elements in the DOM having the template classes
  stored in the internal hash and inject shadow dom.

  This is used to bootstrap shadow classes for statically declared elements.
  */
  function scanShadowClasssesAndInject() {
    Object.keys(ShadowClasses.classTemplateMapping).forEach(function(el, index) {

      // Scan
      var els = document.getElementsByClassName(el);

      for (var i = 0; i < els.length; i++) {
        if (els[i].tagName !== 'TEMPLATE') {
          setElementTemplate(els[i], ShadowClasses.classTemplateMapping[el]);
        }
      }
    });
  }

  /**
  Called once, it should go through all the templates declared both
  in the current doc and imported docs and store them
  in an internal hash. Then elements containing any of the matching classes
  will get the treatment.
   */
  function mapAllTemplatesInDocument() {
    var docTemplates = document.getElementsByTagName('template');
    registerTemplates(docTemplates);

    // TODO: Dynamically added link imports
    var importLinks = document.querySelectorAll('link[rel="import"]');
    importLinks = Array.prototype.slice.call(importLinks, 0);
    importLinks.forEach(function(link, index) {
      registerTemplates(link.import.querySelectorAll('template'));
    }.bind(this));

    scanShadowClasssesAndInject();
  }

  /** 
  Watch for class name changes to inject shadow dom while app running
  */
  function watchForChanges() {
    var observer = new MutationObserver(function(mutations) {
      mutations.forEach(function(mutation) {
        console.log('mutation');
        console.log(mutation);
        addTemplateToElement(mutation.target);
      });
    });

    observer.observe(
      document.getElementsByTagName('body')[0], 
      {childList: true, subtree: true, attributes: true});
  }

  window.onload = function() {
    console.log('ShadowClasses');
    mapAllTemplatesInDocument();
    watchForChanges();
  };

})();
