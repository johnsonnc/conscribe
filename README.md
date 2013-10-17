# conscribe [![Build Status](https://secure.travis-ci.org/johnsonnc/conscribe.png?branch=master)](http://travis-ci.org/johnsonnc/conscribe) [![Dependency Status](https://gemnasium.com/johnsonnc/conscribe.png)](https://gemnasium.com/johnsonnc/conscribe) [![NPM version](https://badge.fury.io/js/conscribe.png)](http://badge.fury.io/js/conscribe)


Combine JSON Schema and Markdown for the use of documenting [OWF Channels](https://github.com/ozoneplatform/owf), in particular [CMWAPI](http://www.cmwapi.org/)

## The issue

In trying to find a solution to combine the CMWA API/ OWF Channels schema and documentation, it was found that JSDOC wasn't quite up to
the task of documenting it how we thought it should. This will allow our handlers and documentation to be generated from one document. 
Furthermore, this will allow us to validate incoming and outgoing traffic from wigets and maps using the same document using JSON Schema.

## Getting Started

This will eventually become a node module so that it can be used with CI and build solutions like maven and Jekins.

Install the module with: `npm install conscribe` (Not published yet so I wouldn't try it.)

```javascript
var conscribe = require('conscribe');
conscribe.[yet to be decided](); 
```

## Documentation
_(Coming soon)_

## Examples
_(Coming soon)_

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History
_(Nothing yet)_

## License
Copyright (c) 2013 Nicholas Johnson. Licensed under the MIT license.
