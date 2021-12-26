import React, { useRef, useState } from "react";
import {
  Image,
  View,
  Text,
  StyleSheet,
  ScrollView,
  ImageBackground,
  Animated,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { Color } from "../variable/Color";
import { Font } from "../variable/Font";
import MangaTag from "../components/MangaList/MangaTag";
import GenreTag from "../components/HomeScreen/GenreTag";
import ResumeReading from "../components/HomeScreen/ResumeReading";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import ExploreCataLog from "../components/HomeScreen/ExploreCataLog";

//màn hình HomeScreen
export default function HomeScreen({ navigation }) {
  const opacity_head = useRef(new Animated.Value(0)).current;
  const translation = opacity_head.interpolate({
    inputRange: [50, 300],
    outputRange: [0, 1],
    extrapolate: "clamp",
  });

  return (
    <View style={styles.container}>
      <Animated.View
        style={[styles.header, { opacity: translation }]}
      ></Animated.View>

      <Text
        style={[
          Font.homeTitle,
          { position: "absolute", top: 25, left: 20, zIndex: 10 },
        ]}
      >
        IKNR
      </Text>
      <MaterialCommunityIcons
        name='treasure-chest'
        size={24}
        color='white'
        style={{ position: "absolute", top: 35, right: 20, zIndex: 10 }}
      />

      <Animated.ScrollView
        style={styles.container}
        scrollEventThrottle={16}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: opacity_head } } }],
          { useNativeDriver: true }
        )}
      >
        {/*banner to trên cùng*/}
        <View style={styles.banner}>
          <ImageBackground
            style={styles.bannerImg}
            source={require("../assets/home/home-manga-1.jpg")}
          ></ImageBackground>
        </View>

        {/*resume reading*/}
        <View style={styles.list}>
          <Text style={Font.homeTitle}>Resume Reading</Text>
          <ScrollView horizontal={true}>
            <ResumeReading />
            <ResumeReading />
            <ResumeReading />
          </ScrollView>
        </View>

        {/*action title*/}
        <View style={styles.list}>
          <Text style={Font.homeTitle}>Action Title</Text>
          <ScrollView horizontal={true}>
            <MangaTag
              count_chapter='44'
              time_update='On going'
              status='New'
              navigation={navigation}
            />
            <MangaTag
              count_chapter='33'
              time_update='Update Weekly'
              navigation={navigation}
            />
            <MangaTag
              count_chapter='22'
              time_update='On going'
              status='New'
              navigation={navigation}
            />
            <MangaTag
              count_chapter='11'
              time_update='On going'
              status='New'
              navigation={navigation}
            />
          </ScrollView>
        </View>

        {/*explore inkr catalog*/}
        <View style={{ marginTop: 40 }}>
          <Text style={[Font.homeTitle, { padding: 20 }]}>
            Explore INKR Catalog
          </Text>
          <ExploreCataLog />
        </View>
      </Animated.ScrollView>
    </View>
  );
}

//style sheet
const styles = StyleSheet.create({
  container: {
    backgroundColor: Color.defaultColor,
    marginTop: 0,
    flex: 1,
  },
  header: {
    backgroundColor: Color.baseColor,
    height: 80,
    width: "100%",

    position: "absolute",
    top: 0,
    zIndex: 1,
  },
  //banner màn hình chính
  banner: {
    width: "100%",
    height: 400,
    backgroundColor: "white",
  },
  //imgbackground của banner
  bannerImg: {
    flex: 1,
    width: null,
    height: null,
    resizeMode: "cover",
  },
  //list của một mục truyện tranh
  list: {
    height: 350,
    width: "100%",
    marginTop: 40,
    backgroundColor: "black",
  },
});
