import { StyleSheet } from 'react-native';
import Colors from '../utils/color';

export const styles = StyleSheet.create({
  // Base
  scrollView: {
    flex: 1,

    backgroundColor: 'rgb(250, 250, 250)', // Neutral-50
  },

  scrollView_containerStyle: {
    paddingHorizontal: 12,
    paddingBottom: 12,
    gap: 12,
  },

  card_view: {
    padding: 16,

    backgroundColor: 'white',

    borderWidth: 1,
    borderColor: 'rgb(229, 229, 229)', // Neutral-300
    borderRadius: 12,
  },

  title: {
    fontSize: 18,
    fontWeight: '800',
  },

  header_view: {
    flexDirection: 'row',

    marginBottom: 16,

    justifyContent: 'space-between',
    alignItems: 'center',
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

  search_TextInput: {
    flex: 1,
  },

  // Categories
  category_view: {
    flexDirection: 'row',

    gap: 8,
  },

  category_card: {
    flex: 1,

    padding: 12,
    gap: 4,

    backgroundColor: 'white',

    borderWidth: 1,
    borderRadius: 12,
    borderColor: 'rgb(229, 229, 229)', // Neutral-300
  },

  // Meeting Preview
  meetingPreview_view: {
    padding: 16,

    backgroundColor: 'white',

    borderWidth: 1,
    borderColor: 'rgb(229, 229, 229)', // Neutral-300
    borderRadius: 12,
  },

  meetingPreview_header: {},

  meetingPreview_guide: {
    fontSize: 14,
    color: 'rgb(161, 161, 161)', // Neutral-400
  },

  meetingPreview_main: {},

  meetingPreview_card: {
    width: 200,

    padding: 12,

    backgroundColor: 'white',

    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 16,
  },

  meetingPreview_card_header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },

  meetingPreview_card_title: {
    fontSize: 16,
    fontWeight: '600',
  },

  meetingPreview_card_footer: {
    flexDirection: 'row',

    justifyContent: 'space-between',
    alignItems: 'center',
  },

  meetingPreview_card_memberView: {
    flexDirection: 'row',

    alignItems: 'center',

    gap: 8,
  },

  meetingPreview_card_joinButton: {
    justifyContent: 'center',
    alignItems: 'center',

    paddingHorizontal: 12,
    paddingVertical: 4,

    backgroundColor: 'white',

    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 999,
  },

  meetingPreview_card_joinButton_text: {
    fontWeight: '600',
  },

  calendar_view: {
    backgroundColor: 'white',

    padding: 12,

    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 12,
  },

  calendar_header_view: {},

  calendar_header_guide: {},
});
