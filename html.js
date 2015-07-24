var html = (function() {
    var template = [],
        currentLevel = 0;
    function makeEleObj(tag, attributes) {
        attributes = attributes || {};
        var eleObj = {
            level: currentLevel,
            tag: tag
        };
        for(var attr in attributes) {
            if(attributes.hasOwnProperty(attr)) {
                eleObj[attr] = attributes[attr];
            }
        }
        return eleObj;
    }
    function makeEle(eTemp) {
        var element = document.createElement(eTemp.tag);
        for(var attr in eTemp) {
            if(eTemp.hasOwnProperty(attr)) {
                element[attr] = eTemp[attr];
            }
        }
        return element;
    }
    function addEle(tag, attributes) {
        template.push(makeEleObj(tag, attributes));
        return this;
    }
    function startLevel(tag, attributes) {
        currentLevel += 1;
        addEle(tag, attributes);
        return this;
    }
    function endLevel() {
        currentLevel -= 1;
        return this;
    }
    function getLastChild(chunk) {
    	var lastChildElement = chunk;
    	while(lastChildElement.children.length > 0) {
    		lastChildElement = lastChildElement.lastChild;
    	}
        return lastChildElement; 
    }
    function appendToLast(chunk, element) {
    	var lastChild = getLastChild(chunk);
    	lastChild.appendChild(element);
        return chunk;
    }
    function appendToLastAtLevel(chunk, level, element) {
    	var selectorString = "*";
    	for(var i = 0; i <= level; i++) { selectorString += ">*"; }
    	var possLvls = chunk.querySelectorAll(selectorString);
    	possLvls[possLvls.length - 1].parentNode.parentNode.appendChild(element);
        return chunk;
    }
    function buildDOM() {
        var level = 0, chunk, element, tempLv;
        chunk = makeEle(template[0]);
        for(var i = 1; i < template.length; i++) {
            element = makeEle(template[i]);
            tempLv = template[i].level;
            if((tempLv - 1) === level) {
                chunk.appendChild(element);
            } else if(level < tempLv) {
                level += (tempLv - 1) - level;
                chunk = appendToLast(chunk, element);
            } else if(level >= tempLv) {
                level -= level - (tempLv - 1);
                chunk = appendToLastAtLevel(chunk, level, element);
            }
        }
    }
    return {
        add: addEle,
        and: addEle,
        contains: startLevel,
        end: endLevel,
        build: buildDOM
    };
});
//Export if possible, using underscore.js approach
if (typeof exports !== 'undefined') {
  if (typeof module !== 'undefined' && module.exports) {
    exports = module.exports = html;
  }
  exports.html = html;
}