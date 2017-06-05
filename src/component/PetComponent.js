var React = require( 'react' );
var constants = require( '../constants');

var LOSER = constants.LOSER;
var CUTE = constants.CUTE;

var compStyle = {
  display: 'inline-block',
  marginLeft: 'auto',
  marginRigth: 'auto'
}
var btnStyle = {
  height: '25px',
  width: '70px',
  marginTop: '10px',
  marginLeft: '5px',
  marginRight: '5px'
}

var PetComponent = function( props ) {
  var result = null;
  var disabled = false;
  if ( props.result !== '' ) {
    var resultStyle = {};
    if( props.result === 'Winner' ) {
      resultStyle = { color: 'green' };
    } else {
      resultStyle = { color: 'red' };;
    }
    disabled = true;
    result = <h2 style={ resultStyle }>{ props.result } </h2>
  }
  return (
    <div style={ compStyle }>
      { result }

      { ( props.result ) ? (
        <h3>{ props.petName } Likes: { props.likesCount }</h3>
      ) : (
        <h3>{ props.petName }</h3>
      )}
      <img
        style={{ height: 400, width: 400 }}
        alt={ CUTE + ' ' + props.petName }
        src={ props.petImgUrl }
      />
      <br/>
      <button style={ btnStyle } disabled={ disabled } value={ props.petName } onClick={ props.onLikeBtnClick }>Like</button>
      <button style={ btnStyle } disabled={ disabled } value={ props.petName } onClick={ props.onDislikeBtnClick }>DisLike</button>
    </div>
  )
}

module.exports = PetComponent;
