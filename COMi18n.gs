/**
_("This will be translated.");
I18N.gettext("Also this...");
Utilities.formatString(I18N.ngettext("I have %s apple", "I have %s apples", n), s);
*/

(function () {
  var locale;
  var defaultLocale = 'en';
  var getLocale = function() {
    if(locale === undefined)
      locale = defaultLocale;
    return locale;
  };
  var setLocale = function(value) {
    if (catalogs[defaultCatalog][value] !== undefined)
      locale = value;
    else 
      locale = defaultLocale;
  };

  var catalogs = {};
  var defaultCatalog = 'messages';
  var textdomain = function(domainName) {
    if(domainName === undefined || domainName === null)
      return defaultCatalog;
    
    if(domainName === '')
      defaultCatalog = 'messages';
    else
      defaultCatalog = domainName;
  };

  var loadLanguage = function(domainName, locale, language) {
    if(domainName === undefined || domainName === null)
      domainName = defaultCatalog;
    var catalog = catalogs[domainName];
    if(!catalog) {
      catalogs[domainName] = {};
    }
    
    catalog = catalogs[domainName][locale];
    if(!catalog) {
      catalogs[domainName][locale] = {"messages" : {}};
    }
    
    catalogs[domainName][locale].messages = language;
  };
  
  var digettext = function(domainName, msgid1, plural, n) {
    if(domainName === undefined || domainName === null)
      domainName = defaultCatalog;

    var catalog = catalogs[domainName];
    if(!catalog)
      return msgid1;

    var locale = getLocale();
    //Logger.log("LOCALE:"+locale)
    if(!locale)
      return msgid1;
    
    catalog = catalog[locale];
    if(!catalog)
      return msgid1;

    var messages = catalog.messages || {};
    var message = messages[msgid1];
    if(!message)
      return msgid1;

    if(plural && (n!=1)) {
      //var plural = catalog.plural || function(n) { return n == 1 ? 0 : 1; };
      //var index = plural(n);
      return message.msgstr_plural;//[index];
    }
    else
      return message.msgstr;
  };
  
  var dgettext = function(domainName, msgid) {
    return digettext(domainName, msgid, false, 1);
  };
  var gettext = function(msgid) {
    return dgettext(null, msgid);
  };

  var dngettext = function(domainName, msgid1, n) {
    return digettext(domainName, msgid1, true, n);
  };
  var ngettext = function(msgid1, n) {
    return dngettext(null, msgid1, n);
  };
  
  I18N = {
    catalogs: catalogs,
    
    getLocale: getLocale,
    setLocale: setLocale,

    textdomain: textdomain,

    dgettext: dgettext,
    gettext: gettext,
 
    dngettext: dngettext,
    ngettext: ngettext,
    
    loadLanguage: loadLanguage
  };
  

})();

var _ = I18N.gettext;