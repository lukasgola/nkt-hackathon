import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, View, FlatList, Image, TouchableOpacity, Linking } from 'react-native';
import { useTheme } from '../theme/ThemeProvider';

import { EmptyComponent } from '../components/EmptyComponent';

export default function CableResult({route}) {


    const cablesImgs = [
        {
            id: 1,
            name:  'YDY',
            image: require('../assets/YDY.png'),
            link: 'https://www.nkt.com.pl/produkty-rozwiazania/niskie-napiecie/przewody-instalacyjne/ydy-450-750-v'
        },
        {
            id: 2,
            name: 'YDYp',
            image: require('../assets/YDYp.png'),
            link: 'https://www.nkt.com.pl/produkty-rozwiazania/niskie-napiecie/przewody-instalacyjne/nkt-instal-ydyp-450-750-v'
        },
        {
            id: 3,
            name: 'YKY',
            image: require('../assets/YKY.png'),
            link: 'https://www.nkt.com.pl/produkty-rozwiazania/niskie-napiecie/kable-1-kv/yky-0-6-1-kv'
        },
        {
            id: 4,
            name: 'YKXS',
            image: require('../assets/YKXS.png'),
            link: 'https://www.nkt.com.pl/produkty-rozwiazania/niskie-napiecie/kable-1-kv/ykxs-0-6-1-kv'
        },
        {
            id: 5,
            name: 'YAKXS',
            image: require('../assets/YAKXS.png'),
            link: 'https://www.nkt.com.pl/produkty-rozwiazania/niskie-napiecie/kable-1-kv/yakxs-0-6-1-kv'
        },
        {
            id: 6,
            name: 'N2XH',
            image: require('../assets/N2XH.png'),
            link: 'https://www.nkt.com.pl/produkty-rozwiazania/niskie-napiecie/kable-1-kv/nopovic-n2xh-0-6-1-kv'
        },

    ]


    const {colors} = useTheme();

    const [items, setItems] = useState(route.params.cables);
    const [input, setInput] = useState(route.params.input);


    const fazCalc = (faz) => {
        if(faz == 'Układ jednofazowy (dwie zyły obiązone), liczba zył 3') return "3"
        else if (faz == "układ trójfazowy wielożyłowy (trzy żyły obciążone), liczba zył 4/5") return "4/5"
        else return "1"
    }

    const Item = ({item}) => {

        const filtered = cablesImgs.filter((i) => i.name == item.cableType)

        return(
            <View style={{
                width: '100%',
                //height: 50,
                backgroundColor: colors.background,
                marginTop: 20,
                alignItems: 'center',
                padding: 20,
                borderRadius: 10,
                
            }}>
                <Image 
                    source={filtered[0].image}
                    style={{
                        width: 300,
                        height: 200
                    }}
                    resizeMode='contain'
                />
                <Text style={{
                    fontSize: 24,
                    fontWeight: 'bold'
                }}>{item.cableType} {fazCalc(item.fazNumber)}x{item.intersection}</Text>

                <TouchableOpacity
                    style={{
                        marginTop: 20
                    }}
                    onPress={() => Linking.canOpenURL(filtered[0].link).then(() => {Linking.openURL(filtered[0].link)})}
                >
                    <Text style={{
                        color: '#1c81e6',
                        textAlign: 'center'
                    }}>Dokumentacja</Text>
                </TouchableOpacity>
            </View>
        )
    }

    const InputRow = ({text, value}) => {
        if(value != null){
            return(
                <View style={{flexDirection: 'row'}}>
                    <Text style={{fontWeight: 'bold'}}>{text} </Text>
                    <Text> {value}</Text>
                </View>
                )
        }
    }

  
  return (
    <View style={{
        width: '100%',
        paddingHorizontal: '5%'
    }}>
        <FlatList
            data={items}
            renderItem={({item}) => <Item item={item} />}
            keyExtractor={item => item.id}
            showsVerticalScrollIndicator={false}
            ListHeaderComponent={
                <View style={{
                    marginTop: 10
                }}>
                    <InputRow value={input.instalation} text={'Typ instalacji:'} />
                    <InputRow value={input.airTemperature} text={'Temperatura powietrza:'} />
                    <InputRow value={input.groundTemperature} text={'Temperatura gruntu:'} />
                    <InputRow value={input.groundResistance} text={'Rezystywność gruntu:'} />
                    <InputRow value={input.wireCount} text={'Liczba zył obciązonych:'} />
                    <InputRow value={input.metalType} text={'Metal zyły:'} />
                    <InputRow value={input.isolationType} text={'Izolacja:'} />
                    <InputRow value={input.power} text={'Moc:'} />
                    <InputRow value={input.current} text={'Prąd:'} />
                </View>
            }
            ListEmptyComponent={<EmptyComponent/>}
            ListFooterComponent={
                <View style={{
                    width: '100%',
                    height: 20
                }}>
                
                </View>
            }
        />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
