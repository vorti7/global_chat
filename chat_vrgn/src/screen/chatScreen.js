import React, { useState, useCallback, useEffect, useRef } from 'react';
import {
    View,
    Button,
    FlatList,
    Text,
    TextInput
} from 'react-native';

import gql from 'graphql-tag'
import { graphql } from 'react-apollo'
import { useQuery, useMutation, useSubscription } from 'react-apollo-hooks'

import * as mutations from '../graphql/mutations';
import * as queries from '../graphql/queries';
import * as subscriptions from '../graphql/subscriptions'

const aQuery = gql`
    query ListChats(
            $filter: ModelChatFilterInput
            $limit: Int
            $nextToken: String
        ) {
        listChats(filter: $filter, limit: $limit, nextToken: $nextToken) {
            items {
                id
                name
                content
            }
            nextToken
        }
    }
`;

export default (props) => {
    console.log(props)
    const flatListRef = useRef(null);
    const [ chatList, setChatList ] = useState([])

    // useEffect(() => {
    //     props.subscribeToNewChats()
    // },[])
    
    const { data, error, loading } = useQuery(aQuery, {
        fetchPolicy: 'cache-and-network',
    });

    const chatInput = (chatData) => {
        setChatList(chatList.concat([{writer: '', chat:chatData}]))
    }

    return(
        <View style={{flex:1}}>
            <FlatList
                ref = {flatListRef}
                data={chatList}
                renderItem = {({item, index}) =>
                                <AChat
                                    chatIndex = {index}
                                    data = {item}
                                />
                            }
                onContentSizeChange={() => flatListRef.current.scrollToEnd()}
                keyExtractor = {(item, index) => index.toString()}
            />
            <InputContainer
                chatInput={(chatData) => chatInput(chatData)}
            />
        </View>
    )
}

function AChat(props){
    chatColor = 'white'
    chatPosition = ''
    chatTouchable = true
    if (props.data.writer==''){ // recognize chat writer.
        chatColor = 'blue'
        chatPosition = 'flex-end'
        // chatTouchable = false
    }else{
        chatColor = 'red'
        chatPosition = 'flex-start'
    }

    return(
        <View
            style={{width:'100%', padding:5, alignItems:chatPosition}}
        >
            <View style={{minHeight:40, minWidth:60, maxWidth:'70%', padding:10, backgroundColor:chatColor, borderRadius:5, justifyContent:'center'}}>
                    <Text style={{color:'white'}}>{props.data.chat}</Text>
            </View>
        </View>
    )
}

function InputContainer(props){
    const [ inputText, setInputText ] = useState('')

    return(
        <View style={{width:'100%', borderColor:'black', bodrderWidth:1}}>
            <View
                style={{width:'100%', paddingLeft:'1%', paddingRight:'1%'}}
            >
                <View style={{flexDirection:'row'}}>
                    <View style={{width:'12%', justifyContent:'center', padding:4}}>
                        <View style={{flex:1, borderRadius:5, borderWidth:3, alignItems:'center', justifyContent:'center'}}>
                            <Text style={{fontSize:25}}>+</Text>
                        </View>
                    </View>
                    <TextInput
                        style = {{width:'65%', height:40, paddingLeft:'1%', fontSize:20}}
                        onChangeText = {inputText => setInputText(inputText)}
                        value = {inputText}
                    />
                    <View style={{width:'23%', justifyContent:'center', paddingLeft:'1%'}}>
                        <Button
                            title="INPUT"
                            onPress={() => {
                                props.chatInput(inputText)
                                setInputText('')
                            }}
                        />
                    </View>
                </View>
            </View>
            <View
                style={{height:Platform.OS === 'ios' ? '2%' : 0}}
            />
        </View>
    )
}


// export default graphql(gql(queries.listChats), {
//     options: {
//       fetchPolicy: 'cache-and-network'
//     },
//     props: props => ({
//       chats: props.data.listChats ? props.data.listChats.items : [],
//       subscribeToNewChats: params => {
//         props.data.subscribeToMore({
//         //   document: gql(subscriptions.onCreateChat),
//         //   updateQuery: (prev, { subscriptionData: { data : { onCreateChat } } }) => ({
//         //     ...prev,
//         //     listChats: { __typename: 'ChatConnection', items: [onCreateChat, ...prev.listChats.items.filter(todchato => chat.id !== onCreateChat.id)] }
//         //   })
//           document: gql(subscriptions.onGlobalChat),
//           updateQuery: (prev, { subscriptionData: { data : { onGlobalChat } } }) => ({
//             ...prev,
//             listChats: { __typename: 'ChatConnection', items: [onGlobalChat, ...prev.listChats.items.filter(chat => chat.id !== onGlobalChat.id)] }
//           })
//         })
//       }
//     })
// })(ChatScreen)