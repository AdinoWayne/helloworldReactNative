import React, { useState, useEffect } from "react";
import { ListItem, Overlay, SearchBar } from 'react-native-elements';
import { StyleSheet, View, Text, Button, Image, ScrollView } from "react-native";
import axios from 'axios';

const about = () => {

    const [list, setList ] = useState([]);
    const [ begin, setBegin ] = useState([]);
    const [choose, setChoose ] = useState({});
    const [search, setSearch ] = useState(null);
    const [isVisible, setIsvisible ] = useState(false);

    useEffect(() => {
        axios.get('http://10.0.2.2:1996/employee')
             .then(res => {
                 setBegin(res.data)
                 setList(res.data);
             })
    }, []);

    useEffect(() => {
        if(search)
            setList(begin.filter(el => el.name.trim().includes(search)));
        else 
            setList(begin);
    }, [search]);

    const renderOverLay = () => {
        return (
            <Overlay
            isVisible={isVisible}
            windowBackgroundColor="rgba(255, 255, 255, .5)"
            width="auto"
            height="auto"
            onBackdropPress={() => setIsvisible(false)}
        >
            <View>
                <Text>thank you you was chose</Text> 
                
                <View style={styles.wrapperoverlay}>
                    <View style={styles.images}>
                        <Image
                            source={{ uri: choose.avatar_url }}
                            style={styles.image}
                        />
                    </View>
                    <Text>{choose.name}</Text>
                </View>
            </View>
            <Button
                onPress={() => setIsvisible(false)}
                title="Okay"
            />
        </Overlay>
        )
    }

    const listItem = () => {
        return list.map((l, i) => (
            <ListItem
                key={i}
                leftAvatar={{ source: { uri: l.avatar_url } }}
                title={l.name}
                onPress={() => {
                    setIsvisible(true);
                    setChoose(l);
                }}
                subtitle={l.subtitle}
                bottomDivider
            />
        ))
    }
    return (
        <ScrollView>
            <SearchBar
                placeholder="Type Here..."
                onChangeText={(text) => setSearch(text)}
                value={search}
            />
            { isVisible && renderOverLay() }
            { (list) ? listItem() : null }
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    wrapperoverlay: {
        display: "flex",
        flexDirection: 'row',
        alignItems: "center",
        justifyContent: "space-around"
    },
    image: {
        width: "100%",
        height: "100%"
    },
    images: {
        height: 50,
        width: 50,
        overflow: "hidden",
        borderRadius: 50,
    },
});

export default about;