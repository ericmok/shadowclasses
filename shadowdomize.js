(function() {

  var ShadowDomize = {
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
//    var addGuard = element.getAttribute(ShadowDomize.ADD_GUARD);
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

        if (ShadowDomize.classTemplateMapping[className]) {
          setElementTemplate(element, ShadowDomize.classTemplateMapping[className]);
        }

    });
  }

  /**
  Called once, it should go through all the templates declared and store them
  in an internal hash. Then elements containing any of the matching classes
  will get the treatment.
   */
  function mapAllTemplatesInDocument() {
    var templates = document.getElementsByTagName('template');

    // Map class names to templates in the NodeList
    for (var i = 0; i < templates.length; i++) {
      
      var classNameSplitted = templates[i].className.split(' ');
      
      classNameSplitted.forEach(function(className) {
        ShadowDomize.classTemplateMapping[className] = templates[i];
      });
    }

    // Go through all instances of elements having the template classes
    Object.keys(ShadowDomize.classTemplateMapping).forEach(function(el, index) {
      var els = document.getElementsByClassName(el);
      for (var i = 0; i < els.length; i++) {
        if (els[i].tagName !== 'TEMPLATE') {
          setElementTemplate(els[i], ShadowDomize.classTemplateMapping[el]);
        }
      }
    });
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
    console.log('ShadowDomize');
    mapAllTemplatesInDocument();
    watchForChanges();
  };

})();
