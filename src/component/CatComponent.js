var React = require( 'react' );

class CatComponent extends React.Component {
  handleLikeBtnClick() {
    console.log( 'cat like' );
  }
  handleDislikeBtnClick() {
    console.log( 'cat dis' );
  }
  render() {
    return (
      <div style={ compStyle }>
        <h3>
          Cat component
        </h3>
        <img
          style={{ height: 400, width: 400 }}
          alt="cute kitten"
          src="http://www.cutestpaw.com/wp-content/uploads/2011/11/Henke.jpg"
        />
        <br/>
        <button style={ btnStyle } onClick={ this.handleLikeBtnClick }>Like</button>
        <button style={ btnStyle } onClick={ this.handleDislikeBtnClick }>DisLike</button>
      </div>
    );
  }
}
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
module.exports = CatComponent;
