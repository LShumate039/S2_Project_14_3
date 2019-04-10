"use strict";

/*
   New Perspectives on HTML5, CSS3, and JavaScript 6th Edition
   Tutorial 12
   Case Problem 3

   Author: 
   Date:   

   Filename: js_tree.js

   Global Variables:
   nodeCount
      Running count of all nodes in the source document
   elementCount
      Running count of all element nodes in the source document
   textCount
      Running count of all text nodes in the source document
   wsCount
      Running count of all white space text nodes in the source document


   Functions List:
   makeTree() 
      Sets up and places the node tree within the HTML document and
      displays the node counts from the document

   makeBranches(treeNode, nestedList)
      Makes a list item or an ordered list based on the contents and type
      of node from the sourceNode parameter and then appends that list
      item or ordered list to nestedList. The function recursively calls 
      itself to navigate throught the node tree of the source document.

   isWhiteSpaceNode(tString)
      Returns true if tString represents the text of a white space text
      node and false if it doesn't
*/


var nodeCount = 0;
var elemCount = 0;
var textCount = 0;
var wsCount = 0;
//runs the makeTree() function when the page loads 

window.onload = makeTree;


function makeTree() {
      var hello = document.createElement("aside");
      hello.setAttribute("id", "treeBox")
      var helloAgain = document.createElement("h1");
      helloAgain.textContent = "Node Tree";
      hello.appendChild(helloAgain);

      document.getElementById("main").appendChild(hello);
      //will be the foundation of the node tree and append it to the aside element fragment 
      var nodeList = document.createElement("ol");
      hello.appendChild(nodeList);
      var sourceArticle = document.querySelector("#main article")
      // The treeNode parameter stores the current node from the source article and the nestedList parameter stores the structure of the node tree displayed in the web page 
      makeBranches(sourceArticle, nodeList);

      document.getElementById("totalNodes").textContent = nodeCount;
      document.getElementById("elemNodes").textContent = elemCount;
      document.getElementById("textNodes").textContent = textCount;
      document.getElementById("wsNodes").textContent = wsCount;


}

function makeBranches(treeNode, nestedList) {
      nodeCount++;
      var liElem = document.createElement("li");
      liElem.innerHTML += "+--";
      var spanElem = document.createElement("span");
      liElem.appendChild(spanElem);
      nestedList.appendChild(liElem);

      if (treeNode.nodeType === 1) {
            elemCount++;
            spanElem.setAttribute("class", "elementNode");
            spanElem.textContent = "<" +
                  treeNode.nodeName + ">";
      } else if (treeNode.nodeType === 3) {
            textCount++;
            var textString = treeNode.nodeValue;
            if (isWhiteSpaceNode(textString)) {
                  wsCount++;
                  spanElem.setAttribute("class", "whiteSpaceNode");
                  spanElem = "#text";
            } else {
                  spanElem.setAttribute("class", "textNode");
                  spanElem.textContent = textString;
            }
      }
      //The makeBranches() function should recursively move through the different levels of nodes in the source article 
      if (treeNode.childNodes.length > 0) {
            var newList = document.createElement("ol");
            newList.innerHTML = "|";
            nestedList.appendChild(newList);
            for (var n = treeNode.firstChild; n !== null; n = n.nextSibling) {
                  makeBranches(n, newList);
            }
      }

}


function isWhiteSpaceNode(tString) {
      return !(/[^\t\n\r ]/.test(tString));
}