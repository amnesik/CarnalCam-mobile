import Color from 'color';

import {Platform} from 'react-native';

export default {
    // Icon
    iconFamily: 'Ionicons',
    iconFontSize: 30,
    iconMargin: 7,
    get iconSizeLarge () {
        return this.iconFontSize* 1.5;
    },
    get iconSizeSmall () {
        return this.iconFontSize* .6;
    },
    // Font
    fontFamily: (Platform.OS === 'ios' ) ? 'HelveticaNeue' : 'Roboto',
    fontSizeBase: 15,
  
    // Footer
    footerHeight: 55,
    footerDefaultBg: '#1abc9c',

    // FooterTab
    tabBarTextColor: 'rgba(255, 255, 255, 0.7)',
    tabBarActiveTextColor: 'white',
    tabActiveBgColor: '#1abc9c'
}