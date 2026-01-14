import { StyleSheet } from 'react-native';
import Colors from '../utils/color';

export const styles = StyleSheet.create({
  // Base
  header_container: {
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

  // Categories
  category_container: {
    flexDirection: 'row',

    gap: 8,
  },

  category_button: {
    flex: 1,

    padding: 12,
    gap: 4,

    backgroundColor: 'white',

    borderWidth: 1,
    borderRadius: 12,
    borderColor: Colors.border,
  },

  // Meeting Preview
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
});
