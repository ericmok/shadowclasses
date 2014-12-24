(function() {

  var ShadowDomize = {
    classTemplateMapping: {},
    ADD_GUARD: 'added'
  };

  /** 
  Clone template contents and append 
  */
  function setElementTemplate(element, template) {
    var shadowRoot = element.createShadowRoot();
    shadowRoot.appendChild(
      document.importNode(template.content, true)
    );
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

  function mapAllTemplatesInDocument() {
    var templates = document.getElementsByTagName('template');

    // Map class names to templates
    for (var i = 0; i < templates.length; i++) {
      //console.log('class: ' + templates[i].className);
      ShadowDomize.classTemplateMapping[templates[i].className] = templates[i];
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