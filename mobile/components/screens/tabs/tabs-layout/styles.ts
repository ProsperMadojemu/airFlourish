import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  drawerContainer: {
    flex: 1,
    paddingTop: 60,
  },
  drawerHeading: {
    fontSize: 20,
    fontWeight: '700',
    marginLeft: 20,
  },
  drawerLink: {
    marginTop: 20,
    marginLeft: 20,
  },
  logoutText: {
    color: 'red',
  },
  tabBarOuter: {
    alignItems: 'center',
  },
  tabBarShell: {
    width: '100%',
    maxWidth: 640,
    borderTopStartRadius: 26,
    borderTopEndRadius: 26,
    borderTopWidth: 1,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    paddingHorizontal: 10,
    paddingTop: 6,
    paddingBottom: 4,
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 8 },
    shadowRadius: 18,
    elevation: 8,
  },
  tabBarInner: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    gap: 4,
  },
  tabSlot: {
    flex: 1,
  },
  tabPressable: {
    width: '100%',
  },
  tabButton: {
    // minHeight: 76,
    borderRadius: 22,
    // borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    overflow: 'visible',
    paddingTop: 6,
    // paddingBottom: 4,
  },
  badgeGlow: {
    // position: 'absolute',
    // top: 4,
    // width: 48,
    // height: 48,
    // borderRadius: 24,
  },
  iconBadge: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    shadowOffset: { width: 0, height: 10 },
    shadowRadius: 18,
  },
  tabLabel: {
    marginTop: 8,
    fontSize: 10,
    fontWeight: '700',
    lineHeight: 12,
    textAlign: 'center',
    paddingHorizontal: 4,
  },
  tabIndicator: {
    marginTop: 4,
    height: 1,
    borderRadius: 999,
  },
});
