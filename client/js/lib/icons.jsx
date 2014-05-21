/** @jsx React.DOM */
var React = require('react');

exports.menu = function(props) {
  return svg(props,
    <path d="M462,163.5H50v-65h412V163.5z M462,223.5H50v65h412V223.5z M462,348.5H50v65h412V348.5z"/>
  );
};

exports.save = function(props) {
  return svg(props,
    <path id="save-icon" d="M285.666,102.333h43V180h-43V102.333z M456,123v339H56V50h327L456,123z M150.5,202H354V80H150.5V202z
       M398.333,269.666H113.667v159.666h284.666V269.666z"/>
  );
};

function svg(props, children) {
  props = props || {};
  return <svg
    width={props.width || '24px'}
    height={props.height || '24px'}
    viewBox="0 0 512 512"
  >{children}</svg>
}

