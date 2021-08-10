Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function() {
    function defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];
            descriptor.enumerable = descriptor.enumerable || false;
            descriptor.configurable = true;
            if ("value"in descriptor)
                descriptor.writable = true;
            Object.defineProperty(target, descriptor.key, descriptor);
        }
    }
    return function(Constructor, protoProps, staticProps) {
        if (protoProps)
            defineProperties(Constructor.prototype, protoProps);
        if (staticProps)
            defineProperties(Constructor, staticProps);
        return Constructor;
    }
    ;
}();

var _react = __webpack_require__(/*! react */
"react");

var _react2 = _interopRequireDefault(_react);

var _reactDom = __webpack_require__(/*! react-dom */
"react-dom");

var _reactDom2 = _interopRequireDefault(_reactDom);

var _propTypes = __webpack_require__(/*! prop-types */
"./node_modules/prop-types/index.js");

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}

function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
    }
}

function _possibleConstructorReturn(self, call) {
    if (!self) {
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }
    return call && (typeof call === "object" || typeof call === "function") ? call : self;
}

function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
        throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
    }
    subClass.prototype = Object.create(superClass && superClass.prototype, {
        constructor: {
            value: subClass,
            enumerable: false,
            writable: true,
            configurable: true
        }
    });
    if (superClass)
        Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}

/**
 * A class for displaying an item in a grid
 * Designed to be wrapped in a function, similar to a higher-order component. Otherwise
 * the layout will render incorrectly
 */
var GridItem = function(_Component) {
    _inherits(GridItem, _Component);

    function GridItem(props) {
        _classCallCheck(this, GridItem);

        var _this = _possibleConstructorReturn(this, (GridItem.__proto__ || Object.getPrototypeOf(GridItem)).call(this, props));

        _this.relayout = _this.relayout.bind(_this);
        _this.relayoutChildren = _this.relayoutChildren.bind(_this);
        return _this;
    }

    _createClass(GridItem, [{
        key: 'componentDidUpdate',
        value: function componentDidUpdate(prevProps) {
            var updated = false;
            // Ensure that the layout has in fact changed before calling relayout
            var keys = ['w', 'h', 'x', 'y'];

            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = keys[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var key = _step.value;

                    if (this.props.layout[key] !== prevProps.layout[key]) {
                        updated = true;
                    }
                }
            } catch (err) {
                _didIteratorError = true;
                _iteratorError = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion && _iterator.return) {
                        _iterator.return();
                    }
                } finally {
                    if (_didIteratorError) {
                        throw _iteratorError;
                    }
                }
            }

            if (updated) {
                this.relayoutChildren();
            }
        }
    }, {
        key: 'componentDidMount',
        value: function componentDidMount() {
            this.relayoutChildren();
            window.addEventListener("resize", this.relayoutChildren);
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            window.removeEventListener("resize", this.relayoutChildren);
        }
        /**
     * Iterate over children and trigger a relayout event
     */

    }, {
        key: 'relayoutChildren',
        value: function relayoutChildren() {
            var _this2 = this;

            function flattenReactChildrenToArray(nodeChildren) {
                var accumulated = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];

                _react2.default.Children.forEach(nodeChildren, function(childNode) {
                    accumulated.push(childNode);
                    if (childNode && childNode.props && childNode.props.children) {
                        flattenReactChildrenToArray(childNode.props.children, accumulated);
                    }
                });
                return accumulated;
            }

            // Relayout after a time period so that the rest of the layout can render properly
            window.setTimeout(function() {
                var flat = flattenReactChildrenToArray(_this2.props.children);
                flat.forEach(_this2.relayout);
            }, 50);
        }
        /**
     * Relayout the Plotly objects; this is not required when graph objects are responsive
     */

    }, {
        key: 'relayout',
        value: function relayout(child) {}
    }, {
        key: 'render',
        value: function render() {
            return this.props.children;
        }
    }]);

    return GridItem;
}(_react.Component);

GridItem.propTypes = {
    /**
   * An identifier for the component.
   * Synonymous with `key`, but `key` cannot be specified as
   * a PropType without causing errors. A caveat to this is that when using
   * the component in pure React (as opposed to via Dash), both `i` and `key`
   * must be specified
   */
    i: _propTypes2.default.string.isRequired,

    /**
   * A list of child elements to place inside the grid ite,
   */
    children: _propTypes2.default.node,

    /**
   * An object describing the layout of the element
   */
    layout: _propTypes2.default.shape({
        /**
     * The x-value of the element location, in grid units
     */
        x: _propTypes2.default.number.isRequired,

        /**
     * The y-value of the element location, in grid units
     */
        y: _propTypes2.default.number.isRequired,

        /**
     * The width of the element, in grid units
     */
        w: _propTypes2.default.number.isRequired,

        /**
     * The height of the element, in grid units
     */
        h: _propTypes2.default.number.isRequired,

        /**
     * The minimum width of the element, in grid units
     */
        minW: _propTypes2.default.number,

        /**
     * The maximum width of the element, in grid units
     */
        maxW: _propTypes2.default.number,

        /**
     * The minimum height of the element, in grid units
     */
        minH: _propTypes2.default.number,

        /**
     * The maximum height of the element, in grid units
     */
        maxH: _propTypes2.default.number,

        /**
     * Is static: if true, the element is not resizable or draggable
     */
        static: _propTypes2.default.bool,

        /**
     * If false, element can not be dragged
     */
        isDraggable: _propTypes2.default.bool,

        /**
     * If false, the element can not be resized
     */
        isResizable: _propTypes2.default.bool
    }),

    /**
   * Dash-assigned callback that should be called whenever any of the properties change
   */
    setProps: _propTypes2.default.func
};

exports.default = GridItem;

