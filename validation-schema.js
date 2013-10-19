var mil = mil || {};
mil.cpce = mil.cpce || {};

mil.cpce.schema = {
    "map.overlay.create": {
        "title": "map.overlay.create",
        "type": "object",
        "properties": {
            "name": {
                "type": [
                    "string",
                    "null"
                ]
            },
            "overlayId": {
                "type": [
                    "string",
                    "null"
                ]
            },
            "parentId": {
                "type": [
                    "string",
                    "null"
                ]
            },
            "properties": {
                "type": "object",
                "properties": {
                    "iconUrl": {
                        "type": [
                            "string",
                            "null"
                        ]
                    },
                    "readOnly": {
                        "type": [
                            "boolean",
                            "null"
                        ]
                    }
                },
                "required": []
            },
            "transactionId": {
                "type": [
                    "string",
                    "null"
                ]
            }
        },
        "required": [
            "properties"
        ]
    },
    "map.overlay.remove": {
        "title": "map.overlay.remove",
        "type": "object",
        "properties": {
            "overlayId": {
                "type": [
                    "string",
                    "null"
                ]
            },
            "transactionId": {
                "type": [
                    "string",
                    "null"
                ]
            }
        },
        "required": []
    },
    "map.overlay.hide": {
        "title": "map.overlay.hide",
        "type": "object",
        "properties": {
            "overlayId": {
                "type": [
                    "string",
                    "null"
                ]
            },
            "transactionId": {
                "type": [
                    "string",
                    "null"
                ]
            }
        },
        "required": []
    },
    "map.overlay.show": {
        "title": "map.overlay.show",
        "type": "object",
        "properties": {
            "overlayId": {
                "type": [
                    "string",
                    "null"
                ]
            },
            "transactionId": {
                "type": [
                    "string",
                    "null"
                ]
            }
        },
        "required": []
    },
    "map.overlay.update": {
        "title": "map.overlay.update",
        "type": "object",
        "properties": {
            "name": {
                "type": [
                    "string",
                    "null"
                ]
            },
            "overlayId": {
                "type": [
                    "string",
                    "null"
                ]
            },
            "parentId": {
                "type": [
                    "string",
                    "null"
                ]
            },
            "properties": {
                "type": [
                    "object",
                    "null"
                ],
                "properties": {
                    "iconUrl": {
                        "type": [
                            "string",
                            "null"
                        ]
                    },
                    "description": {
                        "type": [
                            "string",
                            "null"
                        ]
                    },
                    "readOnly": {
                        "type": [
                            "boolean",
                            "null"
                        ]
                    }
                },
                "required": []
            },
            "transactionId": {
                "type": [
                    "string",
                    "null"
                ]
            }
        },
        "required": []
    },
    "map.overlay.style": {
        "title": "map.overlay.style",
        "type": "object",
        "properties": {
            "overlayId": {
                "type": "string"
            },
            "type": {
                "type": [
                    "array",
                    "null"
                ],
                "enum": [
                    "point",
                    "line",
                    "polygon",
                    "multigeometry",
                    "all"
                ]
            },
            "properties": {
                "type": "object",
                "properties": {
                    "readOnly": {
                        "type": [
                            "boolean",
                            "null"
                        ]
                    },
                    "altitudeMode": {
                        "type": [
                            "string",
                            "null"
                        ],
                        "enum": [
                            "relativeToGround",
                            "clampToGround",
                            "absolute"
                        ]
                    },
                    "fillColor": {
                        "type": [
                            "string",
                            "null"
                        ]
                    },
                    "lineColor": {
                        "type": [
                            "string",
                            "null"
                        ]
                    },
                    "lineThickness": {
                        "type": [
                            "number",
                            "null"
                        ]
                    },
                    "lineStyle": {
                        "type": [
                            "string",
                            "null"
                        ],
                        "enum": [
                            "dot",
                            "dash",
                            "dashdot",
                            "longdash",
                            "longdashdot",
                            "solid"
                        ]
                    },
                    "iconUrl": {
                        "type": [
                            "string",
                            "null"
                        ]
                    },
                    "iconWidth": {
                        "type": [
                            "number",
                            "null"
                        ]
                    },
                    "iconHeight": {
                        "type": [
                            "number",
                            "null"
                        ]
                    },
                    "iconXOffset": {
                        "type": [
                            "number",
                            "null"
                        ]
                    },
                    "iconYOffset": {
                        "type": [
                            "number",
                            "null"
                        ]
                    },
                    "xUnits": {
                        "type": [
                            "string",
                            "null"
                        ],
                        "enum": [
                            "pixel",
                            "iconOffset",
                            "fraction"
                        ]
                    },
                    "yUnits": {
                        "type": [
                            "string",
                            "null"
                        ],
                        "enum": [
                            "pixel",
                            "iconOffset",
                            "fraction"
                        ]
                    }
                },
                "required": []
            },
            "transactionId": {
                "type": [
                    "string",
                    "null"
                ]
            }
        },
        "required": [
            "overlayId",
            "properties"
        ]
    },
    "map.overlay.clear": {
        "title": "map.overlay.clear",
        "type": "object",
        "properties": {
            "overlayId": {
                "type": [
                    "string",
                    "null"
                ]
            },
            "transactionId": {
                "type": [
                    "string",
                    "null"
                ]
            }
        },
        "required": []
    },
    "map.feature.plot": {
        "title": "map.feature.plot",
        "type": "object",
        "properties": {
            "overlayId": {
                "type": [
                    "string",
                    "null"
                ]
            },
            "featureId": {
                "type": "string"
            },
            "name": {
                "type": [
                    "string",
                    "null"
                ]
            },
            "format": {
                "type": [
                    "string",
                    "null"
                ]
            },
            "feature": {
                "type": [
                    "object",
                    "null"
                ]
            },
            "zoom": {
                "type": [
                    "boolean",
                    "null"
                ]
            },
            "properties": {
                "type": "object",
                "properties": {
                    "readOnly": {
                        "type": [
                            "boolean",
                            "null"
                        ]
                    },
                    "altitudeMode": {
                        "type": [
                            "string",
                            "null"
                        ],
                        "enum": [
                            "relativeToGround",
                            "clampToGround",
                            "absolute"
                        ]
                    },
                    "fillColor": {
                        "type": [
                            "string",
                            "null"
                        ]
                    },
                    "lineColor": {
                        "type": [
                            "string",
                            "null"
                        ]
                    },
                    "lineThickness": {
                        "type": [
                            "number",
                            "null"
                        ]
                    },
                    "lineStyle": {
                        "type": [
                            "string",
                            "null"
                        ],
                        "enum": [
                            "dot",
                            "dash",
                            "dashdot",
                            "longdash",
                            "longdashdot",
                            "solid"
                        ]
                    },
                    "iconUrl": {
                        "type": [
                            "string",
                            "null"
                        ]
                    },
                    "iconWidth": {
                        "type": [
                            "number",
                            "null"
                        ]
                    },
                    "iconHeight": {
                        "type": [
                            "number",
                            "null"
                        ]
                    },
                    "iconXOffset": {
                        "type": [
                            "number",
                            "null"
                        ]
                    },
                    "iconYOffset": {
                        "type": [
                            "number",
                            "null"
                        ]
                    },
                    "xUnits": {
                        "type": [
                            "string",
                            "null"
                        ],
                        "enum": [
                            "pixel",
                            "iconOffset",
                            "fraction"
                        ]
                    },
                    "yUnits": {
                        "type": [
                            "string",
                            "null"
                        ],
                        "enum": [
                            "pixel",
                            "iconOffset",
                            "fraction"
                        ]
                    }
                },
                "required": []
            },
            "menuId": {
                "type": [
                    "string",
                    "null"
                ]
            },
            "parentId": {
                "type": [
                    "string",
                    "null"
                ]
            },
            "transactionId": {
                "type": [
                    "string",
                    "null"
                ]
            }
        },
        "required": [
            "featureId",
            "properties"
        ]
    },
    "map.feature.plot.url": {
        "title": "map.feature.plot.url",
        "type": "object",
        "properties": {
            "overlayId": {
                "type": [
                    "string",
                    "null"
                ]
            },
            "featureId": {
                "type": "string"
            },
            "parentId": {
                "type": [
                    "string",
                    "null"
                ]
            },
            "name": {
                "type": [
                    "string",
                    "null"
                ]
            },
            "format": {
                "type": [
                    "string",
                    "null"
                ]
            },
            "url": {
                "type": "string"
            },
            "params": {
                "type": "object"
            },
            "zoom": {
                "type": [
                    "boolean",
                    "null"
                ]
            },
            "visible": {
                "type": [
                    "boolean",
                    "null"
                ]
            },
            "properties": {
                "type": "object"
            },
            "transactionId": {
                "type": [
                    "string",
                    "null"
                ]
            }
        },
        "required": [
            "featureId",
            "url",
            "params",
            "properties"
        ]
    },
    "map.feature.unplot": {
        "title": "map.feature.unplot",
        "type": "object",
        "properties": {
            "overlayId": {
                "type": [
                    "string",
                    "null"
                ]
            },
            "featureId": {
                "type": "string"
            },
            "parentId": {
                "type": [
                    "string",
                    "null"
                ]
            },
            "transactionId": {
                "type": [
                    "string",
                    "null"
                ]
            }
        },
        "required": [
            "featureId"
        ]
    },
    "map.feature.hide": {
        "title": "map.feature.hide",
        "type": "object",
        "properties": {
            "overlayId": {
                "type": [
                    "string",
                    "null"
                ]
            },
            "featureId": {
                "type": "string"
            },
            "parentId": {
                "type": [
                    "string",
                    "null"
                ]
            },
            "transactionId": {
                "type": [
                    "string",
                    "null"
                ]
            }
        },
        "required": [
            "featureId"
        ]
    },
    "map.feature.show": {
        "title": "map.feature.show",
        "type": "object",
        "properties": {
            "overlayId": {
                "type": [
                    "string",
                    "null"
                ]
            },
            "featureId": {
                "type": "string"
            },
            "zoom": {
                "type": [
                    "booean",
                    "null"
                ]
            },
            "parentId": {
                "type": [
                    "string",
                    "null"
                ]
            },
            "transactionId": {
                "type": [
                    "string",
                    "null"
                ]
            }
        },
        "required": [
            "featureId"
        ]
    },
    "map.feature.selected": {
        "title": "map.feature.selected",
        "type": "object",
        "properties": {
            "overlayId": {
                "type": [
                    "string",
                    "null"
                ]
            },
            "featureId": {
                "type": "string"
            },
            "parentId": {
                "type": [
                    "string",
                    "null"
                ]
            },
            "selectedId": {
                "type": [
                    "string",
                    "null"
                ]
            },
            "selectedName": {
                "type": [
                    "string",
                    "null"
                ]
            },
            "transactionId": {
                "type": [
                    "string",
                    "null"
                ]
            }
        },
        "required": [
            "featureId"
        ]
    },
    "map.feature.update": {
        "title": "map.feature.update",
        "type": "object",
        "properties": {
            "overlayId": {
                "type": [
                    "string",
                    "null"
                ]
            },
            "featureId": {
                "type": "string"
            },
            "parentId": {
                "type": [
                    "string",
                    "null"
                ]
            },
            "name": {
                "type": [
                    "string",
                    "null"
                ]
            },
            "newOverlayId": {
                "type": [
                    "string",
                    "null"
                ]
            },
            "newParentId": {
                "type": [
                    null,
                    "null"
                ]
            },
            "properties": {
                "type": [
                    "object",
                    "null"
                ],
                "properties": {
                    "readOnly": {
                        "type": [
                            "boolean",
                            "null"
                        ]
                    },
                    "altitudeMode": {
                        "type": [
                            "string",
                            "null"
                        ],
                        "enum": [
                            "relativeToGround",
                            "clampToGround",
                            "absolute"
                        ]
                    },
                    "fillColor": {
                        "type": [
                            "string",
                            "null"
                        ]
                    },
                    "lineColor": {
                        "type": [
                            "string",
                            "null"
                        ]
                    },
                    "lineThickness": {
                        "type": [
                            "number",
                            "null"
                        ]
                    },
                    "lineStyle": {
                        "type": [
                            "string",
                            "null"
                        ],
                        "enum": [
                            "dot",
                            "dash",
                            "dashdot",
                            "longdash",
                            "longdashdot",
                            "solid"
                        ]
                    },
                    "iconUrl": {
                        "type": [
                            "string",
                            "null"
                        ]
                    },
                    "iconWidth": {
                        "type": [
                            "number",
                            "null"
                        ]
                    },
                    "iconHeight": {
                        "type": [
                            "number",
                            "null"
                        ]
                    },
                    "iconXOffset": {
                        "type": [
                            "number",
                            "null"
                        ]
                    },
                    "iconYOffset": {
                        "type": [
                            "number",
                            "null"
                        ]
                    },
                    "xUnits": {
                        "type": [
                            "string",
                            "null"
                        ],
                        "enum": [
                            "pixel",
                            "iconOffset",
                            "fraction"
                        ]
                    },
                    "yUnits": {
                        "type": [
                            "string",
                            "null"
                        ],
                        "enum": [
                            "pixel",
                            "iconOffset",
                            "fraction"
                        ]
                    }
                },
                "required": []
            }
        },
        "required": [
            "featureId"
        ]
    },
    "map.feature.edit": {
        "title": "map.feature.edit",
        "type": "object",
        "properties": {
            "overlayId": {
                "type": [
                    "string",
                    "null"
                ]
            },
            "featureId": {
                "type": "string"
            },
            "parentId": {
                "type": [
                    "string",
                    "null"
                ]
            },
            "transactionId": {
                "type": [
                    "string",
                    "null"
                ]
            }
        },
        "required": [
            "featureId"
        ]
    },
    "map.feature.edit.update": {
        "title": "map.feature.edit.update",
        "type": "object",
        "properties": {
            "overlayId": {
                "type": [
                    "string",
                    "null"
                ]
            },
            "featureId": {
                "type": "string"
            },
            "parentId": {
                "type": [
                    "string",
                    "null"
                ]
            },
            "updates": {
                "type": [
                    "object",
                    "null"
                ],
                "properties": {
                    "indices": {
                        "type": [
                            "array",
                            "null"
                        ]
                    },
                    "type": {
                        "type": [
                            "string",
                            "null"
                        ],
                        "enum": [
                            "update",
                            "remove",
                            "add"
                        ]
                    },
                    "coordinates": {
                        "type": "object",
                        "properties": {
                            "properties": {
                                "lat": {
                                    "type": "number",
                                    "maximum": 90,
                                    "minimum": -90
                                },
                                "lon": {
                                    "type": "number",
                                    "maximum": 180,
                                    "minimum": -180
                                }
                            },
                            "required": [
                                "lat",
                                "lon"
                            ]
                        }
                    }
                },
                "required": [
                    "coordinates"
                ]
            },
            "properties": {
                "type": [
                    "object",
                    "null"
                ],
                "properties": {
                    "readOnly": {
                        "type": [
                            "boolean",
                            "null"
                        ]
                    },
                    "altitudeMode": {
                        "type": [
                            "string",
                            "null"
                        ],
                        "enum": [
                            "relativeToGround",
                            "clampToGround",
                            "absolute"
                        ]
                    },
                    "fillColor": {
                        "type": [
                            "string",
                            "null"
                        ]
                    },
                    "lineColor": {
                        "type": [
                            "string",
                            "null"
                        ]
                    },
                    "lineThickness": {
                        "type": [
                            "number",
                            "null"
                        ]
                    },
                    "lineStyle": {
                        "type": [
                            "string",
                            "null"
                        ],
                        "enum": [
                            "dot",
                            "dash",
                            "dashdot",
                            "longdash",
                            "longdashdot",
                            "solid"
                        ]
                    },
                    "iconUrl": {
                        "type": [
                            "string",
                            "null"
                        ]
                    },
                    "iconWidth": {
                        "type": [
                            "number",
                            "null"
                        ]
                    },
                    "iconHeight": {
                        "type": [
                            "number",
                            "null"
                        ]
                    },
                    "iconXOffset": {
                        "type": [
                            "number",
                            "null"
                        ]
                    },
                    "iconYOffset": {
                        "type": [
                            "number",
                            "null"
                        ]
                    },
                    "xUnits": {
                        "type": [
                            "string",
                            "null"
                        ],
                        "enum": [
                            "pixel",
                            "iconOffset",
                            "fraction"
                        ]
                    },
                    "yUnits": {
                        "type": [
                            "string",
                            "null"
                        ],
                        "enum": [
                            "pixel",
                            "iconOffset",
                            "fraction"
                        ]
                    }
                },
                "required": []
            },
            "complete": {
                "type": "boolean"
            },
            "transactionId": {
                "type": [
                    "string",
                    "null"
                ]
            }
        },
        "required": [
            "featureId",
            "complete"
        ]
    },
    "map.feature.edit.cancel": {
        "title": "map.feature.edit.cancel",
        "type": "object",
        "properties": {
            "overlayId": {
                "type": [
                    "string",
                    "null"
                ]
            },
            "featureId": {
                "type": "string"
            },
            "parentId": {
                "type": [
                    "string",
                    "null"
                ]
            },
            "coordinates": {
                "type": "object",
                "properties": {
                    "lat": {
                        "type": "number",
                        "maximum": 90,
                        "minimum": -90
                    },
                    "lon": {
                        "type": "number",
                        "maximum": 180,
                        "minimum": -180
                    }
                },
                "required": [
                    "lat",
                    "lon"
                ]
            },
            "properties": {
                "type": [
                    "object",
                    "null"
                ],
                "properties": {
                    "readOnly": {
                        "type": [
                            "boolean",
                            "null"
                        ]
                    },
                    "altitudeMode": {
                        "type": [
                            "string",
                            "null"
                        ],
                        "enum": [
                            "relativeToGround",
                            "clampToGround",
                            "absolute"
                        ]
                    },
                    "fillColor": {
                        "type": [
                            "string",
                            "null"
                        ]
                    },
                    "lineColor": {
                        "type": [
                            "string",
                            "null"
                        ]
                    },
                    "lineThickness": {
                        "type": [
                            "number",
                            "null"
                        ]
                    },
                    "lineStyle": {
                        "type": [
                            "string",
                            "null"
                        ],
                        "enum": [
                            "dot",
                            "dash",
                            "dashdot",
                            "longdash",
                            "longdashdot",
                            "solid"
                        ]
                    },
                    "iconUrl": {
                        "type": [
                            "string",
                            "null"
                        ]
                    },
                    "iconWidth": {
                        "type": [
                            "number",
                            "null"
                        ]
                    },
                    "iconHeight": {
                        "type": [
                            "number",
                            "null"
                        ]
                    },
                    "iconXOffset": {
                        "type": [
                            "number",
                            "null"
                        ]
                    },
                    "iconYOffset": {
                        "type": [
                            "number",
                            "null"
                        ]
                    },
                    "xUnits": {
                        "type": [
                            "string",
                            "null"
                        ],
                        "enum": [
                            "pixel",
                            "iconOffset",
                            "fraction"
                        ]
                    },
                    "yUnits": {
                        "type": [
                            "string",
                            "null"
                        ],
                        "enum": [
                            "pixel",
                            "iconOffset",
                            "fraction"
                        ]
                    }
                },
                "required": []
            },
            "transactionId": {
                "type": [
                    "string",
                    "null"
                ]
            }
        },
        "required": [
            "featureId",
            "coordinates"
        ]
    },
    "map.feature.draw": {
        "title": "map.feature.draw",
        "type": "object",
        "properties": {
            "overlayId": {
                "type": [
                    "string",
                    "null"
                ]
            },
            "featureId": {
                "type": "string"
            },
            "parentId": {
                "type": [
                    "string",
                    "null"
                ]
            },
            "name": {
                "type": [
                    "string",
                    "null"
                ]
            },
            "type": {
                "type": "string",
                "enum": [
                    "line",
                    "polygon",
                    "point"
                ]
            },
            "properties": {
                "type": [
                    "object",
                    "null"
                ],
                "properties": {
                    "readOnly": {
                        "type": [
                            "boolean",
                            "null"
                        ]
                    },
                    "altitudeMode": {
                        "type": [
                            "string",
                            "null"
                        ],
                        "enum": [
                            "relativeToGround",
                            "clampToGround",
                            "absolute"
                        ]
                    },
                    "fillColor": {
                        "type": [
                            "string",
                            "null"
                        ]
                    },
                    "lineColor": {
                        "type": [
                            "string",
                            "null"
                        ]
                    },
                    "lineThickness": {
                        "type": [
                            "number",
                            "null"
                        ]
                    },
                    "lineStyle": {
                        "type": [
                            "string",
                            "null"
                        ],
                        "enum": [
                            "dot",
                            "dash",
                            "dashdot",
                            "longdash",
                            "longdashdot",
                            "solid"
                        ]
                    },
                    "iconUrl": {
                        "type": [
                            "string",
                            "null"
                        ]
                    },
                    "iconWidth": {
                        "type": [
                            "number",
                            "null"
                        ]
                    },
                    "iconHeight": {
                        "type": [
                            "number",
                            "null"
                        ]
                    },
                    "iconXOffset": {
                        "type": [
                            "number",
                            "null"
                        ]
                    },
                    "iconYOffset": {
                        "type": [
                            "number",
                            "null"
                        ]
                    },
                    "xUnits": {
                        "type": [
                            "string",
                            "null"
                        ],
                        "enum": [
                            "pixel",
                            "iconOffset",
                            "fraction"
                        ]
                    },
                    "yUnits": {
                        "type": [
                            "string",
                            "null"
                        ],
                        "enum": [
                            "pixel",
                            "iconOffset",
                            "fraction"
                        ]
                    }
                },
                "required": []
            },
            "transactionId": {
                "type": [
                    "string",
                    "null"
                ]
            }
        },
        "required": [
            "featureId",
            "type"
        ]
    },
    "map.feature.draw.cancel": {
        "title": "map.feature.draw.cancel",
        "type": "object",
        "properties": {
            "overlayId": {
                "type": [
                    "string",
                    "null"
                ]
            },
            "featureId": {
                "type": "string"
            },
            "parentId": {
                "type": [
                    "string",
                    "null"
                ]
            },
            "coordinates": {
                "type": "object",
                "properties": {
                    "lat": {
                        "type": "number",
                        "maximum": 90,
                        "minimum": -90
                    },
                    "lon": {
                        "type": "number",
                        "maximum": 180,
                        "minimum": -180
                    }
                },
                "required": [
                    "lat",
                    "lon"
                ]
            },
            "properties": {
                "type": "object",
                "properties": {
                    "readOnly": {
                        "type": [
                            "boolean",
                            "null"
                        ]
                    },
                    "altitudeMode": {
                        "type": [
                            "string",
                            "null"
                        ],
                        "enum": [
                            "relativeToGround",
                            "clampToGround",
                            "absolute"
                        ]
                    },
                    "fillColor": {
                        "type": [
                            "string",
                            "null"
                        ]
                    },
                    "lineColor": {
                        "type": [
                            "string",
                            "null"
                        ]
                    },
                    "lineThickness": {
                        "type": [
                            "number",
                            "null"
                        ]
                    },
                    "lineStyle": {
                        "type": [
                            "string",
                            "null"
                        ],
                        "enum": [
                            "dot",
                            "dash",
                            "dashdot",
                            "longdash",
                            "longdashdot",
                            "solid"
                        ]
                    },
                    "iconUrl": {
                        "type": [
                            "string",
                            "null"
                        ]
                    },
                    "iconWidth": {
                        "type": [
                            "number",
                            "null"
                        ]
                    },
                    "iconHeight": {
                        "type": [
                            "number",
                            "null"
                        ]
                    },
                    "iconXOffset": {
                        "type": [
                            "number",
                            "null"
                        ]
                    },
                    "iconYOffset": {
                        "type": [
                            "number",
                            "null"
                        ]
                    },
                    "xUnits": {
                        "type": [
                            "string",
                            "null"
                        ],
                        "enum": [
                            "pixel",
                            "iconOffset",
                            "fraction"
                        ]
                    },
                    "yUnits": {
                        "type": [
                            "string",
                            "null"
                        ],
                        "enum": [
                            "pixel",
                            "iconOffset",
                            "fraction"
                        ]
                    }
                },
                "required": []
            },
            "transactionId": {
                "type": [
                    "string",
                    "null"
                ]
            }
        },
        "required": [
            "featureId",
            "coordinates",
            "properties"
        ]
    },
    "mil.symbology.feature.plot": {
        "title": "mil.symbology.feature.plot",
        "type": "object",
        "properties": {
            "overlayId": {
                "type": [
                    "string",
                    "null"
                ]
            },
            "featureId": {
                "type": "string"
            },
            "name": {
                "type": [
                    "string",
                    "null"
                ]
            },
            "format": {
                "type": [
                    "string",
                    "null"
                ],
                "enum": [
                    "milstd",
                    "airspace"
                ]
            },
            "feature": {
                "type": [
                    "object",
                    "null"
                ],
                "properties": {
                    "coordinates": {
                        "type": [
                            "string",
                            "null"
                        ]
                    },
                    "symbolCode": {
                        "type": [
                            "string",
                            "null"
                        ]
                    }
                },
                "required": []
            },
            "zoom": {
                "type": [
                    "boolean",
                    "null"
                ]
            },
            "properties": {
                "type": [
                    "object",
                    "null"
                ],
                "properties": {
                    "modifiers": {
                        "type": [
                            "object",
                            "null"
                        ],
                        "properties": {
                            "properties": {
                                "standard": {
                                    "type": [
                                        "string",
                                        "null"
                                    ],
                                    "enum": [
                                        "2525b",
                                        "2525c"
                                    ]
                                },
                                "size": {
                                    "type": [
                                        "number",
                                        "null"
                                    ]
                                },
                                "additionalInfo1": {
                                    "type": [
                                        "string",
                                        "null"
                                    ]
                                },
                                "additionalInfo2": {
                                    "type": [
                                        "string",
                                        "null"
                                    ]
                                },
                                "additionalInfo3": {
                                    "type": [
                                        "string",
                                        "null"
                                    ]
                                },
                                "altitudeDepth": {
                                    "type": [
                                        "number[]",
                                        "null"
                                    ]
                                },
                                "combatEffectiveness": {
                                    "type": [
                                        "string",
                                        "null"
                                    ]
                                },
                                "dateTimeGroup1": {
                                    "type": [
                                        "string",
                                        "null"
                                    ]
                                },
                                "dateTimeGroup2": {
                                    "type": [
                                        "string",
                                        "null"
                                    ]
                                },
                                "directionOfMovement": {
                                    "type": [
                                        "string",
                                        "null"
                                    ]
                                },
                                "distance": {
                                    "type": [
                                        "string",
                                        "null"
                                    ]
                                },
                                "equipmentType": {
                                    "type": [
                                        "string",
                                        "null"
                                    ]
                                },
                                "evaluationRating": {
                                    "type": [
                                        "string",
                                        "null"
                                    ]
                                },
                                "higherFormation": {
                                    "type": [
                                        "string",
                                        "null"
                                    ]
                                },
                                "hostile": {
                                    "type": [
                                        "string",
                                        "null"
                                    ],
                                    "enum": [
                                        "ENY"
                                    ]
                                },
                                "iffSiff": {
                                    "type": [
                                        "string",
                                        "null"
                                    ]
                                },
                                "location": {
                                    "type": [
                                        "string",
                                        "null"
                                    ]
                                },
                                "offsetIndicator": {
                                    "type": [
                                        "string",
                                        "null"
                                    ]
                                },
                                "quantity": {
                                    "type": [
                                        "string",
                                        "null"
                                    ]
                                },
                                "reinforcedOrReduced": {
                                    "type": [
                                        "string",
                                        "null"
                                    ],
                                    "enum": [
                                        "(-)",
                                        "(+)",
                                        "(+/-)"
                                    ]
                                },
                                "signatureEquipment": {
                                    "type": [
                                        "string",
                                        "null"
                                    ]
                                },
                                "specialC2Headquarters": {
                                    "type": [
                                        "string",
                                        "null"
                                    ]
                                },
                                "speed": {
                                    "type": [
                                        "string",
                                        "null"
                                    ]
                                },
                                "staffComments": {
                                    "type": [
                                        "string",
                                        "null"
                                    ]
                                },
                                "uniqueDesignation1": {
                                    "type": [
                                        "string",
                                        "null"
                                    ]
                                },
                                "uniqueDesignation2": {
                                    "type": [
                                        "string",
                                        "null"
                                    ]
                                }
                            },
                            "required": []
                        }
                    },
                    "airspace": {
                        "type": [
                            "object[]",
                            "null"
                        ],
                        "properties": {
                            "properties": {
                                "minAltitude": {
                                    "type": [
                                        "number",
                                        "null"
                                    ]
                                },
                                "maxAltitude": {
                                    "type": [
                                        "number",
                                        "null"
                                    ]
                                },
                                "leftWidth": {
                                    "type": [
                                        "number",
                                        "null"
                                    ]
                                },
                                "rightWidth": {
                                    "type": [
                                        "number",
                                        "null"
                                    ]
                                },
                                "innerRadius": {
                                    "type": [
                                        "number",
                                        "null"
                                    ]
                                },
                                "outerRadius": {
                                    "type": [
                                        "number",
                                        "null"
                                    ]
                                },
                                "leftAziumth": {
                                    "type": [
                                        "number",
                                        "null"
                                    ]
                                },
                                "rightAzimuth": {
                                    "type": [
                                        "number",
                                        "null"
                                    ]
                                },
                                "turn": {
                                    "type": [
                                        "string",
                                        "null"
                                    ],
                                    "enum": [
                                        "left",
                                        "right",
                                        "center"
                                    ]
                                },
                                "width": {
                                    "type": [
                                        "number",
                                        "null"
                                    ]
                                }
                            },
                            "required": []
                        }
                    },
                    "readOnly": {
                        "type": [
                            "boolean",
                            "null"
                        ]
                    },
                    "altitudeMode": {
                        "type": [
                            "string",
                            "null"
                        ],
                        "enum": [
                            "relativeToGround",
                            "clampToGround",
                            "absolute"
                        ]
                    },
                    "fillColor": {
                        "type": [
                            "string",
                            "null"
                        ]
                    },
                    "lineColor": {
                        "type": [
                            "string",
                            "null"
                        ]
                    },
                    "lineThickness": {
                        "type": [
                            "number",
                            "null"
                        ]
                    },
                    "lineStyle": {
                        "type": [
                            "string",
                            "null"
                        ],
                        "enum": [
                            "dot",
                            "dash",
                            "dashdot",
                            "longdash",
                            "longdashdot",
                            "solid"
                        ]
                    },
                    "iconUrl": {
                        "type": [
                            "string",
                            "null"
                        ]
                    },
                    "iconWidth": {
                        "type": [
                            "number",
                            "null"
                        ]
                    },
                    "iconHeight": {
                        "type": [
                            "number",
                            "null"
                        ]
                    },
                    "iconXOffset": {
                        "type": [
                            "number",
                            "null"
                        ]
                    },
                    "iconYOffset": {
                        "type": [
                            "number",
                            "null"
                        ]
                    },
                    "xUnits": {
                        "type": [
                            "string",
                            "null"
                        ],
                        "enum": [
                            "pixel",
                            "iconOffset",
                            "fraction"
                        ]
                    },
                    "yUnits": {
                        "type": [
                            "string",
                            "null"
                        ],
                        "enum": [
                            "pixel",
                            "iconOffset",
                            "fraction"
                        ]
                    }
                },
                "required": []
            },
            "menuId": {
                "type": [
                    "string",
                    "null"
                ]
            },
            "parentId": {
                "type": [
                    "string",
                    "null"
                ]
            },
            "transactionId": {
                "type": [
                    "string",
                    "null"
                ]
            }
        },
        "required": [
            "featureId"
        ]
    },
    "mil.symbology.feature.draw": {
        "title": "mil.symbology.feature.draw",
        "type": "object",
        "properties": {
            "overlayId": {
                "type": [
                    "string",
                    "null"
                ]
            },
            "featureId": {
                "type": "string"
            },
            "parentId": {
                "type": [
                    "string",
                    "null"
                ]
            },
            "name": {
                "type": [
                    "string",
                    "null"
                ]
            },
            "type": {
                "type": "string",
                "enum": [
                    "line",
                    "polygon",
                    "point"
                ]
            },
            "properties": {
                "type": "object",
                "properties": {
                    "modifiers": {
                        "type": [
                            "object",
                            "null"
                        ],
                        "properties": {
                            "properties": {
                                "standard": {
                                    "type": [
                                        "string",
                                        "null"
                                    ],
                                    "enum": [
                                        "2525b",
                                        "2525c"
                                    ]
                                },
                                "size": {
                                    "type": [
                                        "number",
                                        "null"
                                    ]
                                },
                                "additionalInfo1": {
                                    "type": [
                                        "string",
                                        "null"
                                    ]
                                },
                                "additionalInfo2": {
                                    "type": [
                                        "string",
                                        "null"
                                    ]
                                },
                                "additionalInfo3": {
                                    "type": [
                                        "string",
                                        "null"
                                    ]
                                },
                                "altitudeDepth": {
                                    "type": [
                                        "number[]",
                                        "null"
                                    ]
                                },
                                "combatEffectiveness": {
                                    "type": [
                                        "string",
                                        "null"
                                    ]
                                },
                                "dateTimeGroup1": {
                                    "type": [
                                        "string",
                                        "null"
                                    ]
                                },
                                "dateTimeGroup2": {
                                    "type": [
                                        "string",
                                        "null"
                                    ]
                                },
                                "directionOfMovement": {
                                    "type": [
                                        "string",
                                        "null"
                                    ]
                                },
                                "distance": {
                                    "type": [
                                        "string",
                                        "null"
                                    ]
                                },
                                "equipmentType": {
                                    "type": [
                                        "string",
                                        "null"
                                    ]
                                },
                                "evaluationRating": {
                                    "type": [
                                        "string",
                                        "null"
                                    ]
                                },
                                "higherFormation": {
                                    "type": [
                                        "string",
                                        "null"
                                    ]
                                },
                                "hostile": {
                                    "type": [
                                        "string",
                                        "null"
                                    ],
                                    "enum": [
                                        "ENY"
                                    ]
                                },
                                "iffSiff": {
                                    "type": [
                                        "string",
                                        "null"
                                    ]
                                },
                                "location": {
                                    "type": [
                                        "string",
                                        "null"
                                    ]
                                },
                                "offsetIndicator": {
                                    "type": [
                                        "string",
                                        "null"
                                    ]
                                },
                                "quantity": {
                                    "type": [
                                        "string",
                                        "null"
                                    ]
                                },
                                "reinforcedOrReduced": {
                                    "type": [
                                        "string",
                                        "null"
                                    ],
                                    "enum": [
                                        "(-)",
                                        "(+)",
                                        "(+/-)"
                                    ]
                                },
                                "signatureEquipment": {
                                    "type": [
                                        "string",
                                        "null"
                                    ]
                                },
                                "specialC2Headquarters": {
                                    "type": [
                                        "string",
                                        "null"
                                    ]
                                },
                                "speed": {
                                    "type": [
                                        "string",
                                        "null"
                                    ]
                                },
                                "staffComments": {
                                    "type": [
                                        "string",
                                        "null"
                                    ]
                                },
                                "uniqueDesignation1": {
                                    "type": [
                                        "string",
                                        "null"
                                    ]
                                },
                                "uniqueDesignation2": {
                                    "type": [
                                        "string",
                                        "null"
                                    ]
                                }
                            },
                            "required": []
                        }
                    },
                    "airspace": {
                        "type": [
                            "object[]",
                            "null"
                        ],
                        "properties": {
                            "properties": {
                                "minAltitude": {
                                    "type": [
                                        "number",
                                        "null"
                                    ]
                                },
                                "maxAltitude": {
                                    "type": [
                                        "number",
                                        "null"
                                    ]
                                },
                                "leftWidth": {
                                    "type": [
                                        "number",
                                        "null"
                                    ]
                                },
                                "rightWidth": {
                                    "type": [
                                        "number",
                                        "null"
                                    ]
                                },
                                "innerRadius": {
                                    "type": [
                                        "number",
                                        "null"
                                    ]
                                },
                                "outerRadius": {
                                    "type": [
                                        "number",
                                        "null"
                                    ]
                                },
                                "leftAziumth": {
                                    "type": [
                                        "number",
                                        "null"
                                    ]
                                },
                                "rightAzimuth": {
                                    "type": [
                                        "number",
                                        "null"
                                    ]
                                },
                                "turn": {
                                    "type": [
                                        "string",
                                        "null"
                                    ],
                                    "enum": [
                                        "left",
                                        "right",
                                        "center"
                                    ]
                                },
                                "width": {
                                    "type": [
                                        "number",
                                        "null"
                                    ]
                                }
                            },
                            "required": []
                        }
                    },
                    "readOnly": {
                        "type": [
                            "boolean",
                            "null"
                        ]
                    },
                    "altitudeMode": {
                        "type": [
                            "string",
                            "null"
                        ],
                        "enum": [
                            "relativeToGround",
                            "clampToGround",
                            "absolute"
                        ]
                    },
                    "fillColor": {
                        "type": [
                            "string",
                            "null"
                        ]
                    },
                    "lineColor": {
                        "type": [
                            "string",
                            "null"
                        ]
                    },
                    "lineThickness": {
                        "type": [
                            "number",
                            "null"
                        ]
                    },
                    "lineStyle": {
                        "type": [
                            "string",
                            "null"
                        ],
                        "enum": [
                            "dot",
                            "dash",
                            "dashdot",
                            "longdash",
                            "longdashdot",
                            "solid"
                        ]
                    },
                    "iconUrl": {
                        "type": [
                            "string",
                            "null"
                        ]
                    },
                    "iconWidth": {
                        "type": [
                            "number",
                            "null"
                        ]
                    },
                    "iconHeight": {
                        "type": [
                            "number",
                            "null"
                        ]
                    },
                    "iconXOffset": {
                        "type": [
                            "number",
                            "null"
                        ]
                    },
                    "iconYOffset": {
                        "type": [
                            "number",
                            "null"
                        ]
                    },
                    "xUnits": {
                        "type": [
                            "string",
                            "null"
                        ],
                        "enum": [
                            "pixel",
                            "iconOffset",
                            "fraction"
                        ]
                    },
                    "yUnits": {
                        "type": [
                            "string",
                            "null"
                        ],
                        "enum": [
                            "pixel",
                            "iconOffset",
                            "fraction"
                        ]
                    }
                },
                "required": []
            },
            "transactionId": {
                "type": [
                    "string",
                    "null"
                ]
            }
        },
        "required": [
            "featureId",
            "type",
            "properties"
        ]
    },
    "map.view.zoom": {
        "title": "map.view.zoom",
        "type": "object",
        "properties": {
            "range": {
                "type": [
                    "number",
                    "null"
                ],
                "minimum": 1
            },
            "transactionId": {
                "type": [
                    "string",
                    "null"
                ]
            }
        },
        "required": []
    },
    "map.view.center.overlay": {
        "title": "map.view.center.overlay",
        "type": "object",
        "properties": {
            "overlayId": {
                "type": [
                    "string",
                    "null"
                ]
            },
            "zoom": {
                "type": [
                    "string",
                    "number",
                    "null"
                ],
                "enum": [
                    "auto"
                ],
                "minimum": 1
            },
            "transactionId": {
                "type": [
                    "string",
                    "null"
                ]
            }
        },
        "required": []
    },
    "map.view.center.feature": {
        "title": "map.view.center.feature",
        "type": "object",
        "properties": {
            "overlayId": {
                "type": [
                    "string",
                    "null"
                ]
            },
            "parentId": {
                "type": [
                    "string",
                    "null"
                ]
            },
            "featureId": {
                "type": "string"
            },
            "zoom": {
                "type": [
                    "string",
                    "number",
                    "null"
                ],
                "enum": [
                    "auto"
                ],
                "minimum": 1
            },
            "transactionId": {
                "type": [
                    "string",
                    "null"
                ]
            }
        },
        "required": [
            "featureId"
        ]
    },
    "map.view.center.location": {
        "title": "map.view.center.location",
        "type": "object",
        "properties": {
            "zoom": {
                "type": [
                    "string",
                    "number",
                    "null"
                ],
                "enum": [
                    "auto"
                ],
                "minimum": 1
            },
            "location": {
                "type": "object",
                "properties": {
                    "lat": {
                        "type": "number",
                        "maximum": 90,
                        "minimum": -90
                    },
                    "lon": {
                        "type": "number",
                        "maximum": 180,
                        "minimum": -180
                    }
                },
                "required": [
                    "lat",
                    "lon"
                ]
            },
            "transactionId": {
                "type": [
                    "string",
                    "null"
                ]
            }
        },
        "required": [
            "location"
        ]
    },
    "map.view.center.bounds": {
        "title": "map.view.center.bounds",
        "type": "object",
        "properties": {
            "bounds": {
                "type": "object",
                "properties": {
                    "southWest": {
                        "type": "object",
                        "properties": {
                            "properties": {
                                "lat": {
                                    "type": "number",
                                    "maximum": 90,
                                    "minimum": -90
                                },
                                "lon": {
                                    "type": "number",
                                    "maximum": 180,
                                    "minimum": -180
                                }
                            },
                            "required": [
                                "lat",
                                "lon"
                            ]
                        }
                    },
                    "northEast": {
                        "type": "object",
                        "properties": {
                            "properties": {
                                "lat": {
                                    "type": "number",
                                    "maximum": 90,
                                    "minimum": -90
                                },
                                "lon": {
                                    "type": "number",
                                    "maximum": 180,
                                    "minimum": -180
                                }
                            },
                            "required": [
                                "lat",
                                "lon"
                            ]
                        }
                    }
                },
                "required": [
                    "southWest",
                    "northEast"
                ]
            },
            "zoom": {
                "type": [
                    "string",
                    "null"
                ]
            },
            "transactionId": {
                "type": [
                    "string",
                    "null"
                ]
            }
        },
        "required": [
            "bounds"
        ]
    },
    "map.view.clicked": {
        "title": "map.view.clicked",
        "type": "object",
        "properties": {
            "lat": {
                "type": "number",
                "maximum": 90,
                "minimum": -90
            },
            "lon": {
                "type": "number",
                "maximum": 180,
                "minimum": -180
            },
            "button": {
                "type": "string",
                "enum": [
                    "right",
                    "left",
                    "middle"
                ]
            },
            "type": {
                "type": "string",
                "enum": [
                    "single",
                    "double"
                ]
            },
            "keys": {
                "type": "string",
                "enum": [
                    "alt",
                    "ctrl",
                    "shift",
                    "none"
                ]
            }
        },
        "required": [
            "lat",
            "lon",
            "button",
            "type",
            "keys"
        ]
    },
    "map.view.coordinateSystem": {
        "title": "map.view.coordinateSystem",
        "type": "object",
        "properties": {
            "coodrinateSystem": {
                "type": [
                    "string",
                    "null"
                ],
                "enum": [
                    "dd",
                    "dms",
                    "mgrs",
                    "utm",
                    "rads"
                ]
            }
        },
        "required": []
    },
    "map.get": {
        "title": "map.get",
        "type": "object",
        "properties": {
            "types": {
                "type": [
                    "array",
                    "null"
                ],
                "enum": [
                    "overlay",
                    "feature",
                    "static"
                ]
            },
            "recursive": {
                "type": [
                    "boolean",
                    "null"
                ]
            },
            "select": {
                "type": [
                    "array",
                    "null"
                ],
                "enum": [
                    "name",
                    "overlayId",
                    "featureId",
                    "parentId",
                    "properties",
                    "format",
                    "menuId",
                    "feature",
                    "url"
                ]
            },
            "filter": {
                "type": [
                    "object[]",
                    "null"
                ],
                "properties": {
                    "property": {
                        "type": "string",
                        "enum": [
                            "name",
                            "overlayId",
                            "featureId",
                            "parentId",
                            "properties",
                            "format",
                            "menuId",
                            "feature",
                            "url"
                        ]
                    },
                    "term": {
                        "type": [
                            "string",
                            "object"
                        ]
                    }
                },
                "required": [
                    "property",
                    "term"
                ]
            }
        },
        "required": []
    },
    "map.menu.create": {
        "title": "map.menu.create",
        "type": "object",
        "properties": {
            "menuId": {
                "type": "string"
            },
            "mapMenu": {
                "type": [
                    "boolean",
                    "null"
                ]
            },
            "menuItems": {
                "type": "object[]",
                "properties": {
                    "menuItemId": {
                        "type": "string"
                    },
                    "label": {
                        "type": "string"
                    },
                    "iconUrl": {
                        "type": [
                            "string",
                            "null"
                        ]
                    },
                    "active": {
                        "type": [
                            "boolean",
                            "null"
                        ]
                    }
                },
                "required": [
                    "menuItemId",
                    "label"
                ]
            }
        },
        "required": [
            "menuId",
            "menuItems"
        ]
    },
    "map.menu.clicked": {
        "title": "map.menu.clicked",
        "type": "object",
        "properties": {
            "menuId": {
                "type": "string"
            },
            "menuItemId": {
                "type": "string"
            },
            "lat": {
                "type": [
                    "number",
                    "null"
                ],
                "maximum": 90,
                "minimum": -90
            },
            "lon": {
                "type": [
                    "number",
                    "null"
                ],
                "maximum": 180,
                "minimum": -180
            },
            "range": {
                "type": [
                    "string",
                    "null"
                ]
            },
            "x": {
                "type": [
                    "number",
                    "null"
                ]
            },
            "y": {
                "type": [
                    "number",
                    "null"
                ]
            },
            "featureId": {
                "type": [
                    "string",
                    "null"
                ]
            },
            "overlayId": {
                "type": [
                    "string",
                    "null"
                ]
            },
            "parentId": {
                "type": [
                    "string",
                    "null"
                ]
            }
        },
        "required": [
            "menuId",
            "menuItemId"
        ]
    },
    "map.menu.remove": {
        "title": "map.menu.remove",
        "type": "object",
        "properties": {
            "menuId": {
                "type": "string"
            }
        },
        "required": [
            "menuId"
        ]
    },
    "map.menu.active": {
        "title": "map.menu.active",
        "type": "object",
        "properties": {
            "menuId": {
                "type": "string"
            },
            "itemLabel": {
                "type": "string"
            },
            "active": {
                "type": "string"
            }
        },
        "required": [
            "menuId",
            "itemLabel",
            "active"
        ]
    },
    "map.status.request": {
        "title": "map.status.request",
        "type": "object",
        "properties": {
            "types": {
                "type": [
                    "array",
                    "null"
                ],
                "enum": [
                    "about",
                    "format",
                    "view",
                    "initialization",
                    "coordinatesystem",
                    "selected"
                ]
            },
            "transactionId": {
                "type": [
                    "string",
                    "null"
                ]
            }
        },
        "required": []
    },
    "map.status.initialization": {
        "title": "map.status.initialization",
        "type": "object",
        "properties": {
            "status": {
                "type": [
                    "string",
                    "null"
                ],
                "enum": [
                    "init",
                    "ready",
                    "teardown"
                ]
            },
            "transactionId": {
                "type": [
                    "string",
                    "null"
                ]
            }
        },
        "required": []
    },
    "map.status.view": {
        "title": "map.status.view",
        "type": "object",
        "properties": {
            "requester": {
                "type": [
                    "string",
                    "null"
                ]
            },
            "bounds": {
                "type": "object",
                "properties": {
                    "southWest": {
                        "type": "object",
                        "properties": {
                            "properties": {
                                "lat": {
                                    "type": "number",
                                    "maximum": 90,
                                    "minimum": -90
                                },
                                "lon": {
                                    "type": "number",
                                    "maximum": 180,
                                    "minimum": -180
                                }
                            },
                            "required": [
                                "lat",
                                "lon"
                            ]
                        }
                    },
                    "northEast": {
                        "type": "object",
                        "properties": {
                            "properties": {
                                "lat": {
                                    "type": "number",
                                    "maximum": 90,
                                    "minimum": -90
                                },
                                "lon": {
                                    "type": "number",
                                    "maximum": 180,
                                    "minimum": -180
                                }
                            },
                            "required": [
                                "lat",
                                "lon"
                            ]
                        }
                    }
                },
                "required": [
                    "southWest",
                    "northEast"
                ]
            },
            "center": {
                "type": "object",
                "properties": {
                    "lat": {
                        "type": "number",
                        "maximum": 90,
                        "minimum": -90
                    },
                    "lon": {
                        "type": "number",
                        "maximum": 180,
                        "minimum": -180
                    }
                },
                "required": [
                    "lat",
                    "lon"
                ]
            },
            "range": {
                "type": "number",
                "minimum": 1
            },
            "transactionId": {
                "type": [
                    "string",
                    "null"
                ]
            }
        },
        "required": [
            "bounds",
            "center",
            "range"
        ]
    },
    "map.status.format": {
        "title": "map.status.format",
        "type": "object",
        "properties": {
            "format": {
                "type": "array"
            },
            "transactionId": {
                "type": [
                    "string",
                    "null"
                ]
            }
        },
        "required": [
            "format"
        ]
    },
    "map.status.about": {
        "title": "map.status.about",
        "type": "object",
        "properties": {
            "version": {
                "type": "string"
            },
            "type": {
                "type": "string"
            },
            "widgetName": {
                "type": "string"
            },
            "transactionId": {
                "type": [
                    "string",
                    "null"
                ]
            }
        },
        "required": [
            "version",
            "type",
            "widgetName"
        ]
    },
    "map.status.coordinatesystem": {
        "title": "map.status.coordinatesystem",
        "type": "object",
        "properties": {
            "coodrinateSystem": {
                "type": [
                    "string",
                    "null"
                ],
                "enum": [
                    "dd",
                    "dms",
                    "mgrs",
                    "utm",
                    "rads"
                ]
            },
            "transactionId": {
                "type": [
                    "string",
                    "null"
                ]
            }
        },
        "required": []
    },
    "map.status.selected": {
        "title": "map.status.selected",
        "type": "object",
        "properties": {
            "features": {
                "type": [
                    "object[]",
                    "null"
                ],
                "properties": {
                    "featureId": {
                        "type": "string"
                    },
                    "overlayId": {
                        "type": "string"
                    },
                    "parentId": {
                        "type": [
                            "string",
                            "null"
                        ]
                    }
                },
                "required": [
                    "featureId",
                    "overlayId"
                ]
            },
            "transactionId": {
                "type": [
                    "string",
                    "null"
                ]
            }
        },
        "required": []
    },
    "map.error": {
        "title": "map.error",
        "type": "object",
        "properties": {
            "sender": {
                "type": "string"
            },
            "type": {
                "type": "string"
            },
            "msg": {
                "type": "string"
            },
            "error": {
                "type": "string"
            },
            "transactionId": {
                "type": [
                    "string",
                    "null"
                ]
            }
        },
        "required": [
            "sender",
            "type",
            "msg",
            "error"
        ]
    },
    "map.transaction.complete": {
        "title": "map.transaction.complete",
        "type": "object",
        "properties": {
            "transactionId": {
                "type": "string"
            },
            "successes": {
                "type": "object[]",
                "properties": {
                    "oneOf": {
                        "type": [
                            null,
                            "null"
                        ]
                    }
                },
                "required": []
            },
            "failures": {
                "type": "object[]",
                "properties": {
                    "overlayId": {
                        "type": "string"
                    },
                    "featureId": {
                        "type": "string"
                    },
                    "parentId": {
                        "type": [
                            "string",
                            "null"
                        ]
                    }
                },
                "required": [
                    "overlayId",
                    "featureId"
                ]
            },
            "sender": {
                "type": "string"
            },
            "originChannel": {
                "type": "string"
            }
        },
        "required": [
            "transactionId",
            "successes",
            "failures",
            "sender",
            "originChannel"
        ]
    },
    "map.status.request.overlays": {
        "title": "map.status.request.overlays",
        "type": "object",
        "properties": {},
        "required": []
    },
    "map.status.request.overlay": {
        "title": "map.status.request.overlay",
        "type": "object",
        "properties": {},
        "required": []
    },
    "map.status.request.feature": {
        "title": "map.status.request.feature",
        "type": "object",
        "properties": {},
        "required": []
    },
    "map.status.request.features": {
        "title": "map.status.request.features",
        "type": "object",
        "properties": {},
        "required": []
    },
    "map.status.overlays": {
        "title": "map.status.overlays",
        "type": "object",
        "properties": {
            "overlays": {
                "type": "object[]",
                "properties": {
                    "overlayId": {
                        "type": [
                            "string",
                            "null"
                        ]
                    },
                    "name": {
                        "type": [
                            "string",
                            "null"
                        ]
                    },
                    "parentId": {
                        "type": [
                            "string",
                            "null"
                        ]
                    },
                    "iconUrl": {
                        "type": [
                            "string",
                            "null"
                        ]
                    },
                    "description": {
                        "type": [
                            "string",
                            "null"
                        ]
                    },
                    "readonly": {
                        "type": [
                            "boolean",
                            "null"
                        ]
                    },
                    "isRemote": {
                        "type": [
                            "boolean",
                            "null"
                        ]
                    },
                    "isResultOverlay": {
                        "type": [
                            "boolean",
                            "null"
                        ]
                    },
                    "visible": {
                        "type": [
                            "boolean",
                            "null"
                        ]
                    },
                    "zIndex": {
                        "type": [
                            "number",
                            "null"
                        ]
                    },
                    "owner": {
                        "type": [
                            "string",
                            "null"
                        ]
                    },
                    "children": {
                        "type": [
                            "array",
                            "null"
                        ]
                    }
                },
                "required": []
            },
            "transactionId": {
                "type": [
                    "string",
                    "null"
                ]
            }
        },
        "required": [
            "overlays"
        ]
    },
    "map.status.overlay": {
        "title": "map.status.overlay",
        "type": "object",
        "properties": {
            "overlayId": {
                "type": [
                    "string",
                    "null"
                ]
            },
            "name": {
                "type": [
                    "string",
                    "null"
                ]
            },
            "parentId": {
                "type": [
                    "string",
                    "null"
                ]
            },
            "iconUrl": {
                "type": [
                    "string",
                    "null"
                ]
            },
            "description": {
                "type": [
                    "string",
                    "null"
                ]
            },
            "readonly": {
                "type": [
                    "boolean",
                    "null"
                ]
            },
            "isRemote": {
                "type": [
                    "boolean",
                    "null"
                ]
            },
            "isResultOverlay": {
                "type": [
                    "boolean",
                    "null"
                ]
            },
            "visible": {
                "type": [
                    "boolean",
                    "null"
                ]
            },
            "zIndex": {
                "type": [
                    "number",
                    "null"
                ]
            },
            "owner": {
                "type": [
                    "string",
                    "null"
                ]
            },
            "children": {
                "type": [
                    "array",
                    "null"
                ]
            },
            "transactionId": {
                "type": [
                    "string",
                    "null"
                ]
            }
        },
        "required": []
    },
    "map.status.feature": {
        "title": "map.status.feature",
        "type": "object",
        "properties": {
            "featureId": {
                "type": [
                    "string",
                    "null"
                ]
            },
            "overlayId": {
                "type": [
                    "string",
                    "null"
                ]
            },
            "name": {
                "type": [
                    "string",
                    "null"
                ]
            },
            "feature": {
                "type": [
                    "object",
                    "null"
                ]
            },
            "format": {
                "type": [
                    "string",
                    "null"
                ]
            },
            "properties": {
                "type": [
                    "string",
                    "null"
                ]
            },
            "transactionId": {
                "type": [
                    "string",
                    "null"
                ]
            }
        },
        "required": []
    },
    "map.status.features": {
        "title": "map.status.features",
        "type": "object",
        "properties": {
            "features": {
                "type": "object"
            },
            "transactionId": {
                "type": [
                    "string",
                    "null"
                ]
            }
        },
        "required": [
            "features"
        ]
    }
};