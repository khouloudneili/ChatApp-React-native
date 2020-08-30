import { StatusBar } from 'expo-status-bar';
import React,{Component} from 'react';
import { StyleSheet, Text, View, Image,ScrollView,PermissionsAndroid, Platform, TouchableOpacity,YellowBox, ImageBackground } from 'react-native';
import { GiftedChat,Composer } from 'react-native-gifted-chat';
import Header from './Header';
import Icon from 'react-native-vector-icons/FontAwesome';
import * as ImagePicker from 'expo-image-picker';
import Carousel from 'react-native-snap-carousel';
class App extends Component {
  state = {
    image: null,
    //Initialisation du message
    messages: [
      {
        _id: 1,
        text:`Bonjour !\n\nVoulez vous discuter en français ou en arabe ??`,
        createdAt: new Date(),
        user: {
          _id: 2,
          name: 'CHATBOT',
          avatar: 'https://www.kindpng.com/picc/b/179/1798038.png'
        },
        //Les boutons
        quickReplies: {
          type: 'radio',
          keepIt: true,
          values: [
            {
          title: 'Français',
          value: 'Français',
        },
        {
          title: 'Arabe',
          value: 'Arabe',
        },
      ],
    }
      }
    ], 
  };
  //Envoie d'une image
chooseImage= async () =>  {
  try {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    console.log(result);
    if (!result.cancelled) {
      const source={uri:result.uri};
          let msg = {
            _id:10,
            createdAt: new Date(),
            user: {
              _id: 1,
              name :'User', 
              avatar :'https://w7.pngwing.com/pngs/81/570/png-transparent-profile-logo-computer-icons-user-user-blue-heroes-logo.png'
              },
              image: source.uri,
          }
          this.onSend(msg)
        }      
  } catch (E) {
    console.log(E);
  }

};
  onSend(messages = []) {
    this.setState((previousState) => {
      return {
        messages: GiftedChat.append(previousState.messages, messages),
      };
    });

    // for demo purpose
    this.answerDemo(messages);
  }
  answerDemo(messages) {
    if (messages.length > 0) {
        this.setState((previousState) => {
          return {
            typingText: '... is typing'
          };
        });
      }
    }
    //Icone d'envoie d'image
    renderLeftIcon = () =>{
      return(
          <View  style={{ height:'100%',alignItems:'center'  , justifyContent:'flex-start' , flexDirection:'row' , paddingLeft:5,paddingRight: 5}}>
  
              <TouchableOpacity onPress={this.chooseImage}>
              <Icon
              name='paperclip'
              size={25}
              color='#3b5998'
              style={{height:25,width:25}}/>
              </TouchableOpacity>
          </View>
      );
  }
  render() {
    return (
      <View style={styles.container}>
        <View>
        <Header title={'Bienvenue!'} />
        </View>
        <GiftedChat
          messages={this.state.messages}
          onSend={messages => this.onSend(messages)}
          quickReply={this.state.messages.quickReplies}
          user={{
            _id: 1,
            name :'User', 
            avatar :'https://w7.pngwing.com/pngs/81/570/png-transparent-profile-logo-computer-icons-user-user-blue-heroes-logo.png'
          }}
          placeholder='Taper votre message ici...'
          onPressAvatar={this.viewLastReadMessage}
          showUserAvatar
          alwaysShowSend
          ScrollView
          renderActions={this.renderLeftIcon}
        />   
    </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  footerContainer: {
    marginTop: 5,
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 10,
  },
  footerText: {
    fontSize: 14,
    color: '#aaa',
  },
  ScrollView: {
    marginHorizontal: 20,
  },
});
export default App;
