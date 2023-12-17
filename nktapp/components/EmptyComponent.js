import { Text, View } from 'react-native'
import React from 'react'

import { useTheme } from '../theme/ThemeProvider'

export const EmptyComponent = () => {

    const { colors } = useTheme();

    return(
        <View style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 50,
          }}>
            <Text style={{
              color: colors.grey_d
            }}>Nie ma jeszcze żadnych wyników</Text>
          </View>
    )
}