#webpack loader for import json as sass variables

##converts json to sass veriables
####example:
*test.json*
```json
{
  "a": {
    "b": "100px",
    "c": {
      "d": 99
    }
  }
}
```

will be converted to
```sass
  $a-b : 100px
  $a-c-d : 99
```

## Usage
```
style-loader!css-loader!autoprefixer-loader!sass-loader?indentedSyntax=sass!sass-imports?./common_vars.json
```

## License
MIT (http://www.opensource.org/licenses/mit-license.php)
