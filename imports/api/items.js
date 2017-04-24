import {Mongo} from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

export const Items = new Mongo.Collection('items');

// const ItemsSchema = new SimpleSchema({
//     itemOne: {type:Object},
//     'itemOne.text': {type:String},
//     'itemOne.value': {type:SimpleSchema.Integer},
//     itemTwo: {type:Object},
//     'itemTwo.text': {type:String},
//     'itemTwo.value': {type:SimpleSchema.Integer},
//     lastUpdated: {type:Date, optional:true}
// })

// const ItemsSchema = new SimpleSchema({
//     itemOne: Object,
//     'itemOne.text': String,
//     'itemOne.value': SimpleSchema.Integer,
//     itemTwo: Object,
//     'itemTwo.text': String,
//     'itemTwo.value': SimpleSchema.Integer,
//     lastUpdated: {type:Date, optional:true}
// })

const ItemSchema = new SimpleSchema({
    text: String,
    value: SimpleSchema.Integer
})

const ItemsSchema = new SimpleSchema({
    itemOne: ItemSchema,
    itemTwo: ItemSchema,
    lastUpdated: {type:Date, optional:true}
})

Items.attachSchema(ItemsSchema);

if (Meteor.isServer) {

    Meteor.publish('allItems', function(){
        return Items.find({});
    })

    Meteor.methods({
        insertNewItem(itemOne, itemTwo){
            Items.insert({
                itemOne: {
                    text: itemOne,
                    value: 0
                },
                itemTwo: {
                    text: itemTwo,
                    value: 0
                }
            });
            Roles.addUsersToRoles(Meteor.userId(), 'submitter')
        },
        voteOnItem(item, position){
            check(item, Object);
            let lastUpdated = new Date();
            if (Meteor.userId()) {
                if (position ==='itemOne') {
                    Items.update(
                        item._id,
                        { $inc:{'itemOne.value':1}, $set: {lastUpdated} }
                    )
                } else {
                    Items.update(
                        item._id,
                        { $inc:{'itemTwo.value':1}, $set: {lastUpdated} }
                    )
                }
                Roles.addUsersToRoles(Meteor.userId(), 'voter');
            }
        }
    })

}


export default Items;