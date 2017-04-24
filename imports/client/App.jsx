import React, { Component } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import {Meteor} from 'meteor/meteor';
import {createContainer} from 'meteor/react-meteor-data';
import {Session} from 'meteor/session';
import {check} from 'meteor/check';

import {autobind} from 'core-decorators';

import IsRole from './utilities/IsRole';
import Items from '../api/items';
import Item from './Item.jsx';

@autobind
export class App extends Component {

    addItems(e) {
        e.preventDefault();
        const itemOne = this.refs.itemOne.value.trim();
        const itemTwo = this.refs.itemTwo.value.trim();
        if (itemOne !== '' && itemTwo !== '') {
            Meteor.call('insertNewItem', itemOne, itemTwo, callback.bind(this));
        }

        function callback(err, res){
            if (!err) {
                this.refs.itemOne.value = '';
                this.refs.itemTwo.value = '';
            }
        }

    }

    render() {

        if (!this.props.ready) {
            return <div>Loading</div>;
        }

        const transOptions = {
            transitionName: 'item',
            transitionEnterTimeout: 600,
            transitionLeaveTimeout: 600,
            transitionAppear:true,
            transitionAppearTimeout:600
        }

        return (
            <main>
                <IsRole role={['admin', 'voter']}>
                    <button onClick={this.showAll}>
                        Show {this.props.showAll? 'One':'All'}
                    </button>
                </IsRole>
                <form className="new-items"
                      onSubmit={this.addItems}>
                    <input type="text" ref="itemOne"/>
                    <input type="text" ref="itemTwo"/>
                    <button type="submit">Add Items</button>
                </form>
                <ReactCSSTransitionGroup {...transOptions}>
                    {this.props.items.map((item) => {
                        return (
                            <Item item={item} key={item._id}/>
                        )
                    })}
                </ReactCSSTransitionGroup>

            </main>
        );


    }

    showAll(){
        Session.set('showAll', !this.props.showAll)
    }
}


const mapToProps = ({params}) => {
    let itemsSub = Meteor.subscribe('allItems');
    let userSub = Meteor.subscribe('currentUser');
    let showAll = Session.get('showAll');

    let queryOpts = {
        limit: showAll ? 50 : 1,
        sort: {lastUpdated:1}
    }

    let itemsArray;
    if (params.id) {
        itemsArray = Items.find({_id: params.id}).fetch();
    } else {
        itemsArray = Items.find({}, queryOpts).fetch()
    }


    return {
        items: itemsArray,
        ready: itemsSub.ready() && userSub.ready(),
        showAll,
        userId: Meteor.userId()
    }
}

export default createContainer( mapToProps, App );