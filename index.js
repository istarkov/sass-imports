/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author istarkov@gmail.com
  converts json to sass veriables
  example:
  test.json
  ```
  {
    "a": {
      "b": '100px',
      "c": {
        "d": 99
      }
    }
  }
  ```

  will be converted to
  ```
    $a-b : 100px
    $a-c-d : 99
  ```
*/
var loaderUtils = require('loader-utils');
var path = require('path');
var traverse = require('traverse');
var fs = require('fs');

module.exports = function SassImports(content) {
  var query = loaderUtils.parseQuery(this.query);
  var imports = [];
  var dir = path.dirname(path.resolve(this.resourcePath));
  var self = this;
  var prefix = '';
  if (this.cacheable) this.cacheable();

  Object.keys(query).forEach(function traverseFiles(fileName) {
    var fpath = path.join(dir, fileName);
    var includeContent = JSON.parse(fs.readFileSync(fpath));
    var obj = traverse(includeContent);

    self.addDependency(fpath);

    obj.paths().forEach(function traverseJSONPAth(jsonPath) {
      var val = obj.get(jsonPath);
      if (typeof val !== 'object') {
        imports.push('$'+jsonPath.join('-') + ' : ' + val);
      }
    });
  });

  prefix = imports.join('\n') + '\n\n';

  return prefix + content;
};
