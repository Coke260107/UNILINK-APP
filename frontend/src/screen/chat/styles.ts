import { StyleSheet } from 'react-native';
import Colors from '../../utility/color';

const styles = StyleSheet.create({
  category_container: {
    flexDirection: 'row',
    gap: 12,
  },

  category_button: {
    flexDirection: 'row',

    justifyContent: 'center',
    alignItems: 'center',

    minWidth: 75,

    paddingHorizontal: 12,
    paddingVertical: 8,
    gap: 8,

    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 999,
  },

  category_button_Text: {
    fontSize: 16,
    fontWeight: '600',
  },



  //chatting List
  chattingList_container: {
    width: '100%',
    height: 90,
    borderRadius: 20,
    padding: 10,
    
  },

  chattingList_card: {
    flexDirection: 'row', 
    alignItems: 'center',
    

    gap:20,
  },
  chatList_title: {
   fontSize: 16,
   fontWeight: '600',

   marginTop: 4,
  },

  chatList_lastMessage:{
    fontSize: 13,
    color: 'rgb(115, 115, 115)',
  },

  chatList_lastMessageAt:{
    fontSize: 11,
    marginLeft: 14,
    alignSelf: 'flex-start',
    marginTop: 8,
    color: Colors.guide,

  },


  //global
  safeAreaView: {
    flex: 1,

    backgroundColor: Colors.background,
  },

  base_container: {
    flex: 1,

    paddingHorizontal: 24,

    backgroundColor: Colors.background,
  },

  scroll_container: {
    flex: 1,

    backgroundColor: Colors.background,
  },

  scroll_content_container: {
    paddingHorizontal: 12,
    paddingBottom: 12,

    gap: 12,
  },

  card: {
    padding: 16,

    backgroundColor: 'white',

    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 12,
  },

  card_title: {
    fontSize: 20,
    fontWeight: '800',
  },

  guide_text: {
    fontSize: 14,
    color: Colors.guide,
  },
});

export default styles;
