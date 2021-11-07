import React from "react";
import { View } from "react-native";
import { SearchBar } from "react-native-elements";
function SearchBarCard() {
  return (
    <>
      <View>
        <SearchBar placeholder="Tìm kiếm..." lightTheme={true} />
      </View>
    </>
  );
}

export default SearchBarCard;
