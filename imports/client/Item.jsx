import React, { Component } from 'react';
import PropTypes from 'prop-types';

import {Meteor} from 'meteor/meteor';
import {createContainer} from 'meteor/react-meteor-data';

import Items from '../api/items';


export class Item extends Component {

    constructor(props, context){
        super(props, context);
        // this.state = {
        //     whatever:{}
        // }
       this.handleVoteOne = this.handleVoteOne.bind(this)
       this.handleVoteTwo = this.handleVoteTwo.bind(this)
    }

    handleVoteOne(){
        Meteor.call('voteOnItem', this.props.item, 'itemOne');
    }

    handleVoteTwo(){
        Meteor.call('voteOnItem', this.props.item, 'itemTwo');
    }

    render() {
        return (
            <div className="item">
                <div    className="vote-one"
                        onClick={this.handleVoteOne}>
                    <span>{this.props.item.itemOne.value}</span>
                    <h3>{this.props.item.itemOne.text}</h3>
                </div>
                <span>vs</span>
                <div    className="vote-two"
                        onClick={this.handleVoteTwo}>
                    <span>{this.props.item.itemTwo.value}</span>
                    <h3>{this.props.item.itemTwo.text}</h3>
                </div>
            </div>
        );
    }
}

// Item.defaultProps = {};
// Item.propTypes = {
//     name:        PropTypes.string.isRequired,
//     id:          PropTypes.oneOfType([ PropTypes.number, PropTypes.string ]).isRequired,
//     message:     PropTypes.shape({ title: PropTypes.string, text: PropTypes.string }).isRequired,
//     comments:    PropTypes.arrayOf(React.PropTypes.object),
//     date:        PropTypes.instanceOf(Date)
// };
//
// PropTypes -> array, bool, func, number, object, string, symbol


// -> this.props.loadCourses, this.props.createCourse

//
// -> this.props.actions.loadCourses();

///////////////////////////// context //////////////////////////////

// ManageCoursePage.contextTypes = {
//     router: React.PropTypes.object.isRequired
// }
// (lets you do 'this.context.router.push('/wherever');

const mapToProps = (props) => {
    // Meteor.subscribe('bins');
    // const {binId} = props.params;
    return {
        // links: Links.find({}).fetch(),
        // meteorCall: Meteor.call
    }
}

// export default createContainer( mapToProps, Item );
export default Item;

// remember to use 'this' binding now (choose one, #1 is best)
// 1. In constructor (see constructor above)
// 2. .bind(this) in your render ( onClick={this.onClick.bind(this)} )
// 3. Arrow functions in your render ( onClick={() => {}} )
// 4. _.bindAll(this,'methodName','...')

// meteor npm i --save react-addons-pure-render-mixin
// meteor add react-meteor-data