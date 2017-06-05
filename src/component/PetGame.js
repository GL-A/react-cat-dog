var React = require( 'react' );
var axios = require('axios')
var Pet = require( './PetComponent' );
var constants = require( '../constants' );



var btnStyle = {
  marginTop: '30px',
  height: '20px',
  widht: '70px'
}
var CAT = constants.CAT;
var DOG = constants.DOG;
var WINNER = constants.WINNER;
var LOSER = constants.LOSER;
var TIE = constants.TIE;
var API_KEY = constants.API_KEY;
var CAT_URL = 'http://localhost:63000/cat?api_key=' + API_KEY;
var DOG_URL = 'http://localhost:63000/dog?api_key=' + API_KEY;

class PetGame extends React.Component {
  constructor( props ) {
    super( props );
    this.state = {
      cat: { result: '', imgUrl: '' },
      dog: { result: '', imgUrl: '' }
    }
    this.catLikesCount = 0;
    this.dogLikesCount = 0;
    this.handleShowWinnerBtnClick = this.handleShowWinnerBtnClick.bind( this );
    this.handleStartOverBtnClick = this.handleStartOverBtnClick.bind( this );
    this.handleLikeBtnClick = this.handleLikeBtnClick.bind( this );
    this.handleDislikeBtnClick = this.handleDislikeBtnClick.bind( this );
  }

  fetchPetImage( PET_URL, petName ) {
    petName = petName.toLowerCase();
    axios.get( PET_URL ).then( function( res ) {
      var imgUrl = res.data.imageUrl;

      this.setState( function( prevState ) {
        var state = {};
        state[ petName ] = {
          result: prevState[ petName ].result, imgUrl: imgUrl
        };
        return state;
      });
    }.bind( this ));
  }
  fetchImages() {
    this.fetchPetImage( CAT_URL, 'Cat' );
    this.fetchPetImage( DOG_URL, 'Dog' );
  }

  componentDidMount() {
    this.fetchImages();
  }


  handleShowWinnerBtnClick() {
    var catLikesCount = this.catLikesCount;
    var dogLikesCount = this.dogLikesCount;
    var catResult = TIE;
    var dogResult = TIE;

    if( catLikesCount > dogLikesCount ) {
      catResult = WINNER;
      dogResult = LOSER;
    } else if ( catLikesCount < dogLikesCount ) {
      catResult = WINNER;
      dogResult = LOSER;
    }
    this.setState( function( prevState ) {
      return {
        cat: { result: catResult, imgUrl: prevState.cat.imgUrl },
        dog: { result: dogResult, imgUrl: prevState.dog.imgUrl }
      }
    })
  }
  handleStartOverBtnClick() {
    this.catLikesCount = 0;
    this.dogLikesCount = 0;
    this.setState( function( prevState ){
      return {
        cat: { result: '', imgUrl: '' },
        dog: { result: '', imgUrl: '' }
      }
    })
    this.fetchImages();
  }

  handleLikeDislikeBtn( petName, operation ) {
    this.fetchImages();
    if ( petName === 'Cat' ) {
      this.catLikesCount += operation;
    } else if ( petName === 'Dog' ) {
      this.dogLikesCount += operation;
    }
  }
  handleLikeBtnClick( event ) {
    this.handleLikeDislikeBtn( event.target.value, 1 );
  }
  handleDislikeBtnClick( event ) {
    this.handleLikeDislikeBtn( event.target.value, -1 );
  }

  render() {
    return (
      <div>
        <div style={{ marginTop: 60, textAlign: 'center' }}>
          <Pet
            result={ this.state.dog.result }
            onLikeBtnClick={ this.handleLikeBtnClick }
            onDislikeBtnClick={ this.handleDislikeBtnClick }
            likesCount={ this.dogLikesCount }
            petName={ DOG }
            petImgUrl={ this.state.dog.imgUrl }/>
          <Pet
            result={ this.state.cat.result }
            onLikeBtnClick={ this.handleLikeBtnClick }
            onDislikeBtnClick={ this.handleDislikeBtnClick }
            likesCount={ this.catLikesCount }
            petName={ CAT }
            petImgUrl={ this.state.cat.imgUrl }/>
        </div>
        <div style={{ textAlign: 'center' }}>
          { !this.state.dog.result &&
            <button
            onClick={ this.handleShowWinnerBtnClick }
            style={ btnStyle }
            >
              Show Winner
            </button>
          }
          <button
            onClick={ this.handleStartOverBtnClick }
            style={ btnStyle }
            >
              Start over
            </button>
        </div>
      </div>
    )
  }
}

module.exports = PetGame;
