// headerStyle.ts

import { StyleSheet } from 'react-native';

// Util
import Colors from '../utility/color';

const styles = StyleSheet.create({
  base_title: {
    color: 'black',
    fontSize: 24,
    fontWeight: '600',
  },

  home_title: {
    color: Colors.red,
    fontSize: 28,
    fontWeight: '600',
  },


  // Search Header
  search_header_wrapper: {
  
  paddingTop: 2,
  paddingBottom: 4,
  
},


  search_header_container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    width: '100%',
    fontSize: 12,

    // backgroundColor: Colors.background,
  },
  search_header_input: {
    flex: 1,
    height: 44,
    marginTop:12,
    marginBottom: 8,
    paddingHorizontal: 12,
    borderRadius: 12,
    backgroundColor: Colors.gray,
    borderWidth: 1,

    borderColor: Colors.border,
    fontSize: 16,
    textAlignVertical: 'center'
  },
  search_header_button: {
    height: 36,
    width: 20,
    marginLeft: 4,
    borderWidth: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },

  chattingList_container: {
    marginLeft: 12,
  },
});

export default styles;
