import {useState} from 'react'
import { TabView, SceneMap, TabBar } from 'react-native-tab-view'
import { useWindowDimensions } from 'react-native'

import TabDniSearch from '../../components/ReadScreens/TabDniSearch'
import TabRangeSearch from '../../components/ReadScreens/TabRangeSearch'
import { colors, fonts } from '../../styles/globalStyle'

export default function CreateTab() {
    const layout = useWindowDimensions()
    const [index, setIndex] = useState(0)

    const [routes] = useState([
        {key: 'dniSearch', title: 'DNI'},
        {key: 'rangeSearch', title: 'FECHA DE REGISTRO'},
    ])

    const renderScene = SceneMap({
        dniSearch: TabDniSearch,
        rangeSearch: TabRangeSearch
    })


    const styleTabBar = (props) => {
        return (
            <TabBar {...props} 
                    indicatorStyle={{backgroundColor: colors.thirdColor}}
                    style={{backgroundColor: colors.primaryColor}}
                    labelStyle={{fontFamily: fonts.mont300 ,color: colors.colorText}}>
            </TabBar>
        )
    }


    return (
        <TabView navigationState={{ index, routes }}
                 renderScene={renderScene}
                 onIndexChange={setIndex}
                 initialLayout={{width: layout.width}}
                 renderTabBar={styleTabBar}>

        </TabView>
    )
}
