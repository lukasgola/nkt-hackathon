import React from 'react'
import {View, Image} from 'react-native';

import {useTheme} from '../theme/ThemeProvider';

const IssueMarker = ({marker}) => {

    const {colors} = useTheme();

  return (
    
        <View
            style={{
                width: 50,
                height: 50,
                backgroundColor: colors.grey,
                borderRadius: 10,
                justifyContent: 'center',
                alignItems: 'center'
            }}
        >
            <Image 
                style={{
                    width: 45,
                    height: 45,
                    borderRadius: 8
                }}
                source={{uri: marker.image.downloadURL}}
            />
        </View>
  )
}


export default IssueMarker;