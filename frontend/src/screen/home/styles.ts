import { StyleSheet } from 'react-native';
import Colors from '../../utility/color'
import { Color } from '../../../globalStyle';

const styles = StyleSheet.create({
  // Base
  header_container: {
    flexDirection: 'row',


    justifyContent: 'space-between',
    alignItems: 'center',
  },

  footer_container: {
    flexDirection: 'row',

    gap: 16,
  },

  footer_metaItem: {
    marginTop: 4,
    flexDirection: 'row',

    alignItems: 'center',

    gap: 8,
  },

  footer_metaItem_text: {
    fontSize: 12,
  },

  // Search Bar
  search_bar: {
    flexDirection: 'row',

    alignItems: 'center',

    paddingHorizontal: 12,
    gap: 6,

    borderWidth: 1,
    borderColor: 'rgb(38, 38, 38)',
    borderRadius: 999,
  },

  // Categories
  category_container: {
    flexDirection: 'row',

    gap: 8,
  },

  category_button: {
    flex: 1,

    padding: 12,
    gap: 4,


    borderWidth: 1,
    borderRadius: 12,
    borderColor: Colors.border,
  },

  // Meeting Preview
  meetingPreview_card: {
    width: 200,
    height: 120,
    padding: 12,

    backgroundColor: 'white',

    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 16,
  },

  meetingPreview_header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },

  meetingPreview_title: {
    fontSize: 14,
    fontWeight: '600',
  },

  meetingPreview_host: {
    fontSize: 12,
    marginBottom: 30,
  },

  // Board Preview
  boardPreview_board: {
    paddingHorizontal: 8,
    // paddingBottom: 8,
    height: 85,

    borderRadius: 20,

    backgroundColor: 'white',
  },

  boardPreview_board_title: {
    marginTop: 12,
    marginBottom: 2,

    fontSize: 14,
    fontWeight: '500',
  },

  boardPreview_board_content: {
    fontSize: 12,
    color: 'rgb(102,102,102)',
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
    padding: 8,

    backgroundColor: 'white',

    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 12,
  },
  
  meeting_card: {
    flex: 1,
    width: '100%',
   
    marginHorizontal: 0,
    paddingVertical: 12,
    backgroundColor: Colors.background,
    borderWidth: 0,
  },

  card_title: {
    // marginBottom: 8,
    fontSize: 17,
    fontWeight: '800',
  },

  guide_text: {
    fontSize: 12,
    color: Colors.guide,
  },
});

export default styles;
