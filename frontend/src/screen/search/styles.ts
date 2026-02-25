import { StyleSheet } from 'react-native';
import Colors from '../../utility/color';
import { Color } from '../../../globalStyle';

const styles = StyleSheet.create({

 
  //global
  safeAreaView: {
    flex: 1,

    backgroundColor: Colors.background,
  },

  base_container: {
    flex: 1,

    paddingHorizontal: 14,

    backgroundColor: Colors.background,
  },

  //상단
  SearchBar: {
      borderColor:  Colors.gray,
      borderWidth: 1,
      
  },

  header_container: {
    paddingHorizontal: 8,
    paddingVertical: 10,
    backgroundColor: Color.background
  },

  header_title: {
    fontSize: 18,
    fontWeight: '600' ,

    marginTop : 12,
    color: 'rgb(50, 50, 50)',
    
  },

  
   


  // category
  category_container: {
    flexDirection: 'row',
    gap: 12,
    alignItems: 'center',
  },

  category_button: {
    flexDirection: 'row',

    justifyContent: 'center',
    alignItems: 'center',

    width: 80,
    height: 40,

    paddingHorizontal: 12,
    paddingVertical: 8,
    gap: 8,

    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 999,
  },

  category_button_Text: {
    fontSize: 14,
    fontWeight: '500',
  },


  // search Result
  searchResult_container: {
    width: '100%',
    height: 105,
    backgroundColor: Colors.background,
    marginTop: 8,
    borderRadius: 28,
     paddingHorizontal: 12,

  },
  searchResult_title: {
   fontSize: 16,
   fontWeight: '600',
    color: 'rgb(50, 50, 50)',
  
  },
  
  SearchResult_content: {
    fontSize: 14,
    color: 'rgb(102,102,102)',
  },

  footer_container: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginLeft: 2,
    gap: 16,
  },

  footer_metaItem: {
    flexDirection: 'row',

    alignItems: 'center',

    gap: 8,
  },

  footer_metaItem_text: {
    fontSize: 12,
  },

  footer_rightItem: {
    flexDirection: 'row',
    gap: 12, 
  },

  footer_day_text: {
    fontSize: 12,
    color: Colors.guide,
  },

  empty_container: {
    alignItems: 'center', 
    justifyContent: 'center',
    flex: 1,


    backgroundColor: Colors.background
  },

  empty_message: {
    fontSize: 20,

    color: 'rgb(102,102,102)',
    
  }

});

export default styles;
