# conscribe [![Build Status](https://secure.travis-ci.org/johnsonnc/conscribe.png?branch=master)](http://travis-ci.org/johnsonnc/conscribe) [![Dependency Status](https://gemnasium.com/johnsonnc/conscribe.png)](https://gemnasium.com/johnsonnc/conscribe) [![NPM version](https://badge.fury.io/js/conscribe.png)](http://badge.fury.io/js/conscribe) [![Coverage Status](https://coveralls.io/repos/johnsonnc/conscribe/badge.png)](https://coveralls.io/r/johnsonnc/conscribe)


Using a Schema documents to generate a JSON Schema for Validation, Fixture for API Handers, 
and Channel Specification Documents for [CMWAPI](http://www.cmwapi.org/). 
These channels and API's are intended for use in the [OWF Platform](https://github.com/ozoneplatform/owf) for communication
for between particular widgets.

## The issue

In trying to find a solution to combine the CMWA API/ OWF Channels schema and documentation, it was found that JSDOC wasn't quite up to
the task of documenting it how we thought it should. This will allow our handlers and documentation to be generated from one document. 
Furthermore, this will allow us to validate incoming and outgoing traffic from wigets and maps using the same document using JSON Schema.

## Getting Started

This will eventually become a node module so that it can be used with CI and build solutions like maven and Jekins.

Install the module with: `npm install conscribe` (published but not release quality.)


## Quickstart


```javascript

var conscribe = require('conscribe');
conscribe.[yet to be decided](); 

```

```sh

node conscribe.js -c [configFile] [-e]

```

## Documentation


### Running from commandline

```sh
node conscribe.js -c [configFile] [-e]

```

-c [configFile] : Specify config file to use. (Required)

-e : Generate inital skeleton examples. If used, it will blow away any examples left in directory. (Optional)


## Examples

### As Module

### Commandline

### Configuration File

## Contributing

In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History

0.0.0 : Non-release / planning

## License
Copyright (c) 2013 Nicholas Johnson. Licensed under the MIT license.
